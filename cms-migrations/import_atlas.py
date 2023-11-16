#!/usr/bin/env python

import json
import os
import requests
import sys
import glob
import os


def read_atlas_files(atlas_dir):
    atlas_files = glob.glob(f'{atlas_dir}/*.json')
    atlas_data = []
    for file in atlas_files:
        with open(file, 'r') as f:
            atlas_data.append(json.load(f))
    return atlas_data


def convert_text(content, atlas_name=None):
    return { '__component': 'tekst.tekst', 'beskrivelse': content.get('beskrivelse'), 'tekst': content.get('tekst')  }, []


def convert_factbox(content, atlas_name=None):
    return { '__component': 'faktaboks.faktaboks', 'overskrift': content.get('overskrift'), 'tekst': content.get('tekst')  }, []


def convert_resultbox(content, atlas_name):
    data_name = content.get('data')

    if data_name:
        data_name = f'{atlas_name}_{data_name[:-5]}' # Remove '.json' extension

    return { 
        '__component': 'resultatboks.resultatboks', 
        'overskrift': content.get('overskrift'), 
        'ingress': content.get('ingress'),
        'publisert': content.get('publisert'),
        'oppdatert': content.get('oppdatert'),
        'utvalg': content.get('utvalg'),
        'data': data_name,
        'kart': content.get('kart'),
        'resultat': content.get('resultat') 
    }, [data_name] if data_name else []


def transform_content(content, atlas_name):
    match content['type']:
        case 'tekst':
            return convert_text(content)
        case 'faktaboks':
            return convert_factbox(content)
        case 'resultatboks':
            return convert_resultbox(content, atlas_name)
        case _:
            raise Exception(f'Unknown chapter type: {content["type"]}')


def post_strapi(name, payload, endpoint, token):
    response = requests.post(endpoint, 
        json=payload, 
        headers={ 'Authorization': f'Bearer {token}' })

    if response.status_code == 200:
        print(f'Content for {name} was successfully imported.')
    else:
        print(f'Failed to import data for {name}.')
    
    return response.json()['data']['id']


def post_chapter(atlas_name, chapter_input, lang, strapi_host, token):
    data_names = []

    chapter = { 'data': { 'innhold': [] } }
    chapter_data = chapter['data']
    chapter_data['overskrift'] = chapter_input.get('overskrift')
    chapter_data['locale'] = lang

    for content in chapter_input.get('innhold', []):
        transformed_content, content_data_names = transform_content(content, atlas_name)
        chapter_data['innhold'].append(transformed_content)
        data_names.extend(content_data_names)

    chapter_id = post_strapi(chapter_data['overskrift'], chapter, f'{strapi_host}/api/kapitler', token)

    return chapter_id, data_names


def post_image(path, default_path, strapi_host, token):
    if not os.path.exists(path):
        print(f'Image {path} does not exist. Opening default image instead.')
        path = default_path

    url = f'{strapi_host}/api/upload'
    files = {'files': open(path, 'rb')}
    headers = { 'Authorization': f'Bearer {token}' }

    response = requests.post(url, files=files, headers=headers)
    
    media_id = None
    if response.status_code == 200:
        media_id = response.json()[0]['id']
        print(f'Image {path} was successfully imported.')
    else:
        print(f'Failed to import image {path}.')

    return media_id


def get_data_ids(atlas_name, data_names, strapi_host, token):
    data_names = list(set(data_names)) # Remove duplicates
    data_ids = []

    api_url = f'{strapi_host}/api/atlas-data-jsons?'
    for index, data_name in enumerate(data_names):
        api_url += f'filters[name][$in][{index}]={data_name}&'
    api_url += 'fields=id'

    response = requests.get(api_url, headers={ 'Authorization': f'Bearer {token}' })

    if response.status_code == 200:
        print(f'API-call for finding data IDs for {atlas_name} was successful.')
    else:
        print(f'API-call for finding finding data IDs for {atlas_name} failed.')
        raise Exception('Failed to find data IDs for atlas.')

    results = response.json()['data']
    num_results = len(results)
    if num_results != len(data_names):
        print(f'Wrong number of IDs for data was returned from API for {atlas_name}. Expected {len(data_names)} but got {num_results}.')
        print(f'Data names: {data_names}')
        print(f'Data IDs: {results}')
        return []

    return response.json()['data']


def import_atlas(atlas_input, public_dir, strapi_host, token):
    locale = atlas_input['lang']
    
    atlas = { 'data': {} }
    atlas_data = atlas['data']
    atlas_data['name'] = atlas_input.get('filename')
    atlas_data['locale'] = atlas_input.get('lang')
    atlas_data['lang'] = atlas_input.get('lang')
    atlas_data['publisert'] = atlas_input.get('publisert')
    atlas_data['date'] = atlas_input.get('date')
    atlas_data['mainTitle'] = atlas_input.get('mainTitle')
    atlas_data['shortTitle'] = atlas_input.get('shortTitle')
    atlas_data['frontpagetext'] = atlas_input.get('frontpagetext')
    atlas_data['ingress'] = atlas_input.get('ingress')

    atlas_name = atlas_data['name']

    # Chapters
    chapter_ids = []
    data_names = []

    for entry in atlas_input['kapittel']:
        chapter_id, chapter_data_names = post_chapter(atlas_name, entry, locale, strapi_host, token)
        chapter_ids.append(chapter_id)
        if chapter_data_names:
            data_names.extend(chapter_data_names)

    atlas_data['kapittel'] = { 'connect': chapter_ids }
    
    # Look-up ids for data files
    if data_names:
        data_ids = get_data_ids(atlas_name, data_names, strapi_host, token)
        if data_ids:
            atlas_data['jsondata'] = { 'connect': data_ids }

    # Upload image and reference in atlas
    image_path = f'{public_dir}{atlas_input.get("image")}'
    default_image_path = f'{public_dir}/helseatlas/img/frontpage.jpg'
    media_id = post_image(image_path, default_image_path, strapi_host, token)
    if media_id is not None:
        atlas_data['image'] = media_id

    post_strapi(atlas_name, atlas, f'{strapi_host}/api/atlases', token)


def main(atlas_dir, public_dir, strapi_host, token):
    atlas_data = read_atlas_files(atlas_dir)
    for atlas in atlas_data:
        import_atlas(atlas, public_dir, strapi_host, token)
    

if __name__ == '__main__':
    if len(sys.argv) != 5 or sys.argv[1] in ['-h', '--help']:
        print('Usage: python import_atlases.py <atlas_dir> <public_dir> <strapi_url> <token>')
        print('data_dir: parent directory for atlas JSON files to import')
        print('public_dir: parent directory for images referenced in atlas JSON files')
        print('strapi_url: base URL to the Strapi API')
        print('token: API token')
    else:
        atlas_dir = sys.argv[1].rstrip('/')
        public_dir = sys.argv[2].rstrip('/')
        strapi_url = sys.argv[3].rstrip('/')
        token = sys.argv[4]
        main(atlas_dir, public_dir, strapi_url, token)
