#!/usr/bin/env python3

import sys
import os
import fnmatch


def get_matching_filenames(directory, pattern):
    matching_filenames = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if fnmatch.fnmatch(file, pattern):  # Use fnmatch for wildcard support
                matching_filenames.append(os.path.join(root, file))
    return matching_filenames


def main(search_dir, file_pattern='*.json'):
    script_dir = os.path.dirname(os.path.realpath(__file__))  # Get the directory name where the file is located
    directory = os.path.join(script_dir, search_dir)
    print(f"Searching for files matching pattern '{file_pattern}' in directory '{directory}'")
    matching_files = get_matching_filenames(directory, file_pattern)
    print(matching_files)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide the search directory as a command-line argument.")
        sys.exit(1)
    search_dir = sys.argv[1]
    file_pattern = sys.argv[2] if len(sys.argv) > 2 else '*.json' # Add file_pattern as an optional argument
    main(search_dir, file_pattern) # Pass file_pattern to main
