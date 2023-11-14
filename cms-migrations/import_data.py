#!/usr/bin/env python3

import json
import os
import requests
import sys


def post_data(name, content, strapi_url, token):
    endpoint = f'{strapi_url}/api/atlas-data-jsons'
    headers = { 'Authorization': f'Bearer {token}' }
    payload = { 'data': { 'name': name, 'json': content } }
    response = requests.post(endpoint, json=payload, headers=headers)
    if response.status_code == 200:
        print(f'Data for {name} was successfully imported.')
    else:
        print(f'Failed to import data for {name}.')


def main(data_dir, strapi_url, token):
    failed_imports = []

    for root, dirs, files in os.walk(data_dir):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                print(file_path)
                name = os.path.splitext(os.path.basename(file_path))[0]

                try:
                    with open(file_path, 'r') as f:
                        content = json.load(f)
                    post_data(name, content, strapi_url, token)
                except Exception as e:
                    failed_imports.append(f'{file_path}: {e}')

    if failed_imports:
        print('\nThe following imports failed:')
        for failed_import in failed_imports:
            print(failed_import)


if __name__ == '__main__':
    if len(sys.argv) != 4 or sys.argv[1] in ['-h', '--help']:
        print('Usage: python import_data.py <data_dir> <strapi_url> <token>')
        print('data_dir: parent directory for directories containing data JSON files to import')
        print('strapi_url: base URL to the Strapi API')
        print('token: API token')
    else:
        data_dir = sys.argv[1].rstrip('/')
        strapi_url = sys.argv[2].rstrip('/')
        token = sys.argv[3]
        main(data_dir, strapi_url, token)
