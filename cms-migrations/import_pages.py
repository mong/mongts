#!/usr/bin/python3

import os
import sys
import re
import requests


def read_file_content(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    return content


def read_md_files(input_dir):
    md_files = []
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                content = read_file_content(file_path)
                md_files.append((file_path, content))
    return md_files


def parse_markdown_file(content):
    pattern = r'---\nfilename: (?P<name>.+)\ntitle: (?P<title>.+)\nlang: (?P<lang>en|nb|nn)(\n[a-zA-Z0-9-_]+: .+)*\n---\n(?P<body>.*)'
    match = re.match(pattern, content, re.DOTALL)
    if match:
        parsed_content = {
            'data': {
                'name': match.group('name'),
                'title': match.group('title'),
                'lang': match.group('lang'),
                'locale': 'en' if match.group('lang') == 'en' else 'nb'
            }
        }
        if match.group('body'):
            parsed_content['data']['body'] = match.group('body').strip()
        return parsed_content
    else:
        return None



def post_page(parsed_content, strapi_url, token):
    endpoint = f'{strapi_url}/api/static-pages'
    headers = { 'Authorization': f'Bearer {token}' }
    response = requests.post(endpoint, json=parsed_content, headers=headers)
    if response.status_code == 200:
        print(f'Page {parsed_content["data"]["name"]} was successfully imported.')
    else:
        print(f'Failed to import page {parsed_content["data"]["name"]}.')


def main(input_dir, strapi_url, token):
    md_files = read_md_files(input_dir)
    for file_path, content in md_files:
        parsed_content = parse_markdown_file(content)
        post_page(parsed_content, strapi_url, token)


if __name__ == '__main__':
    if len(sys.argv) != 4 or sys.argv[1] in ['-h', '--help']:
        print('Usage: python import_pages.py <input_dir> <strapi_url> <token>')
        print('input_dir: directory containing markdown files to import')
        print('strapi_url: base URL to the Strapi API')
        print('token: API token')
    else:
        input_dir = sys.argv[1].rstrip('/')
        strapi_url = sys.argv[2].rstrip('/')
        token = sys.argv[3]
        main(input_dir, strapi_url, token)

