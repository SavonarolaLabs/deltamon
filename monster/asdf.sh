#!/bin/bash

# Define the output JS file
output_file="files.js"

# Write the beginning of the JS array to the file
echo "const files = [" > $output_file

# Find all jpg files, sort them, and append them to the JS array
find . -type f -name "*.jpg" | sort | while read file; do
  # Append the filename (without the path) to the JS array
  echo "  '$(basename "$file")'," >> $output_file
done

# Write the closing of the JS array
echo "];" >> $output_file

# Optional: Log the output file created
echo "Generated $output_file with sorted list of jpg files."
