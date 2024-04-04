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


def extract_urls(text):
    url_pattern = r"href=\"((?:http[s]?://|www\.)[^\"]*)"
    urls = re.findall(url_pattern, text)
    urls = [url for url in urls if not url.startswith("#")]
    return urls


def check_link(url):
    status_code = -1
    with requests.Session() as s:
        try:
            headers = {"User-Agent": "Mozilla/5.0", "Referer": "https://www.skde.no"}
            response = s.head(url, headers=headers, timeout=5)
            status_code = response.status_code
            print(status_code)
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
    return status_code


def process_file(filename, visited_links):
    link_results = {}
    with open(filename, "r") as file:
        file_content = file.read()
        print(f"Processing file: {filename}")
        urls = extract_urls(file_content)
        for url in urls:
            print(f"URL: {url}")
            if url not in visited_links:
                response = check_link(url)
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

def main(search_dir, file_pattern="*.html"):
    script_dir = os.path.dirname(os.path.realpath(__file__))
    directory = os.path.join(script_dir, search_dir)
    matching_files = get_matching_filenames(directory, file_pattern)
    file_results = {}
    visited_links = {}
    for filename in matching_files:
        file_results[filename] = process_file(filename, visited_links)


    export_to_csv(file_results)

    print("Done.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide the search directory as a command-line argument.")
        sys.exit(1)
    search_dir = sys.argv[1]
    file_pattern = sys.argv[2] if len(sys.argv) >= 3 else "*.html"
    main(search_dir, file_pattern)
