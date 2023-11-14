#!/usr/bin/env python

import json
import os
import requests
import sys
import glob


def read_atlas_files(atlas_dir):
    atlas_files = glob.glob(f'{atlas_dir}/*.json')
    atlas_data = []
    for file in atlas_files:
        with open(file, 'r') as f:
            atlas_data.append(json.load(f))
    return atlas_data


def post_text(chapter_input):
    pass


def post_factbox(chapter_input):
    pass


def post_resultbox(chapter_input):
    pass


def post_chapter(chapter_input, lang):

    match chapter_input['type']:
        case 'text':
            return post_text(chapter_input)
        case 'faktaboks':
            return post_factbox(chapter_input)
        case 'resultatboks':
            return post_resultbox(chapter_input)
        case _:
            raise Exception(f'Unknown chapter type: {chapter_input["type"]}')


def post_atlas():
    pass


def import_atlas(atlas_input, strapi_host, token):
    locale = atlas_input['lang']
    chapter_ids = [post_chapter(entry, locale) for entry in atlas_input['kapittel']]
    
    # Post each chapter, keep ID + names of data files (a set)
    # Look-up IDs for data files
    # Post atlas main entry with chapter IDs and data file IDs
    pass


def main(atlas_dir, strapi_host, token):
    atlas_data = read_atlas_files(atlas_dir)
    for atlas in atlas_data:
        import_atlas(atlas, strapi_host, token)
    

if __name__ == '__main__':
    if len(sys.argv) != 4 or sys.argv[1] in ['-h', '--help']:
        print('Usage: python import_atlases.py <atlas_dir> <strapi_url> <token>')
        print('data_dir: parent directory for atlas JSON files to import')
        print('strapi_url: base URL to the Strapi API')
        print('token: API token')
    else:
        atlas_dir = sys.argv[1].rstrip('/')
        strapi_url = sys.argv[2].rstrip('/')
        token = sys.argv[3]
        main(atlas_dir, strapi_url, token)

