#!/usr/bin/env python3

import sys
import os
import fnmatch
import re
import requests
import csv


def get_matching_filenames(directory, pattern):
    matching_filenames = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if fnmatch.fnmatch(file, pattern):
                matching_filenames.append(os.path.join(root, file))
    return matching_filenames


def extract_urls(text, base_url, current_url):
    # Extract URLs from href attributes
    url_pattern = r'href\s*=\s*"([^"]+)'
    urls = re.findall(url_pattern, text, flags=re.MULTILINE)
    urls = [url for url in urls if not url.startswith('#')]

    # Remove duplicates
    urls = list(set(urls))

    # Remove irrelevant link types
    urls = [url for url in urls if not (url.startswith('mailto:') or url.startswith('javascript:') or url.startswith('tel:'))]

    # Remove trailing slash from base URL, if present
    if base_url.endswith('/'):
        base_url = base_url[:-1]

    # Ensure trailing slash to current URL
    if not current_url.endswith('/'):
        current_url = current_url + '/'

    # If the URL is not absolute, prefix with base URL or current URL
    urls = [url if url.startswith('http') else base_url + url if url.startswith('/') else current_url + url for url in urls]

    return urls


def check_link(url):
    status_code = -1
    with requests.Session() as s:
        try:
            headers = {'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.skde.no'}
            response = s.head(url, headers=headers, timeout=5, allow_redirects=True)
            status_code = response.status_code
        except requests.exceptions.RequestException as e:
            print(f'Error for URL {url}: {e}')
    return status_code


def process_file(filename, base_path, base_url, visited_links, verbose):
    link_results = {}
    with open(filename, 'r') as file:
        file_content = file.read()
        print(f'Processing file: {filename}')

        current_url = base_url
        if not current_url.endswith('/'):
            current_url = current_url + '/'
        rel_path = filename[filename.rindex(base_path) + len(base_path):]
        current_url = current_url + rel_path
        current_url = current_url.replace('index.html', '')
        if verbose:
            print(f'Current URL: {current_url}')

        urls = extract_urls(file_content, base_url, current_url)
        for url in urls:
            if verbose:
                print(f'URL: {url}')
            if url not in visited_links:
                response = check_link(url)
                if verbose:
                    print(f'Status code: {response}')
                visited_links[url] = response
            link_results[url] = visited_links[url]
    return link_results


def export_to_csv(file_results):
    with open('results.csv', 'w', newline='') as csvfile:
        fieldnames = ['filename', 'url', 'status code']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for filename, link_results in file_results.items():
            for url, status_code in link_results.items():
                writer.writerow({'filename': filename, 'url': url, 'status code': status_code})

def failed_links(file_results):
    errors_found = 0
    for filename, link_results in file_results.items():
        for url, status_code in link_results.items():
            if status_code == 403:
                print(f'Forbidden link in {filename}: {url} (status code: {status_code})', file=sys.stdout)
            elif status_code >= 400 or status_code == -1:
                print(f'Invalid link in {filename}: {url} (status code: {status_code})', file=sys.stderr)
                errors_found += 1
    return errors_found


def main(search_dir, base_path, base_url, file_pattern='*.html', verbose=False):
    matching_files = get_matching_filenames(search_dir, file_pattern)
    file_results = {}
    visited_links = {}
    for filename in matching_files:
        file_results[filename] = process_file(filename, base_path, base_url, visited_links, verbose)
#    export_to_csv(file_results)
    num_failed = failed_links(file_results)
    print('Done.')
    return num_failed


if __name__ == '__main__':
    if len(sys.argv) < 4:
        print('Please provide the search directory, base path, and base url as command-line arguments.')
        sys.exit(1)
    search_dir = sys.argv[1]
    base_path = sys.argv[2]
    base_url = sys.argv[3]
    code_status = main(search_dir, base_path, base_url)
    if code_status != 0:
        sys.exit("Found invalid link(s)")
    
