#!/usr/bin/env python3

import sys
import os
import fnmatch
import re
import requests


def get_matching_filenames(directory, pattern):
    matching_filenames = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if fnmatch.fnmatch(file, pattern):  # Use fnmatch for wildcard support
                matching_filenames.append(os.path.join(root, file))
    return matching_filenames


def extract_urls(text):
    url_pattern = r'\((http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+?)\)+'
    urls = re.findall(url_pattern, text)
    return urls


def check_link(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0',
            'Referer': 'https://www.skde.no/'
        }
        response = requests.get(url, headers=headers)
        status_code = response.status_code
        if status_code != 200:
            print(f"Non-200 status code for {url}: {status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error accessing {url}: {e}")


def process_file(filename):
    # Your code to process each file goes here
    with open(filename, 'r') as file:
        file_content = file.read()
        print(f"Processing file: {filename}")
        urls = extract_urls(file_content)
        for url in urls:
            check_link(url)

def main(search_dir, file_pattern='*.json'):
    script_dir = os.path.dirname(os.path.realpath(__file__))  # Get the directory name where the file is located
    directory = os.path.join(script_dir, search_dir)
    matching_files = get_matching_filenames(directory, file_pattern)
    for filename in matching_files:
        process_file(filename)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide the search directory as a command-line argument.")
        sys.exit(1)
    search_dir = sys.argv[1]
    file_pattern = sys.argv[2] if len(sys.argv) > 2 else '*.json' # Add file_pattern as an optional argument
    main(search_dir, file_pattern)
