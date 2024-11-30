#!/bin/zsh

# Output file
OUTPUT_FILE="recent_ergo_tokens.txt"

# Clear previous file if it exists
> "$OUTPUT_FILE"

# Number of pages to retrieve
NUM_PAGES=10

# Tokens per page
TOKENS_PER_PAGE=100

# Iterate through pages
for page in {0..9}; do
    echo "Fetching page $((page + 1)) of $NUM_PAGES..."
    
    # Calculate offset
    offset=$((page * TOKENS_PER_PAGE))
    
    # Fetch tokens for current page
    response=$(curl -s "https://api.ergoplatform.com/api/v1/tokens?limit=${TOKENS_PER_PAGE}&offset=${offset}&sortBy=creationHeight&sortDirection=desc")
    
    # Check if curl was successful
    if [ -z "$response" ]; then
        echo "Failed to fetch tokens. Check your internet connection."
        exit 1
    fi
    
    # Check for HTTP errors
    http_status=$(curl -s -o /dev/null -w "%{http_code}" "https://api.ergoplatform.com/api/v1/tokens?limit=${TOKENS_PER_PAGE}&offset=${offset}&sortBy=creationHeight&sortDirection=desc")
    if [ "$http_status" -ne 200 ]; then
        echo "Failed to fetch tokens. HTTP status code: $http_status"
        exit 1
    fi

    # Extract token IDs using grep and cut
    echo "$response" | grep -o '"id":"[^"]*' | cut -d'"' -f4 >> "$OUTPUT_FILE"
    
    # Optional: Add a small delay to avoid overwhelming the API
    sleep 1
done

# Remove duplicate token IDs, if any
sort "$OUTPUT_FILE" | uniq > temp_file && mv temp_file "$OUTPUT_FILE"

# Count total tokens retrieved
total_tokens=$(wc -l < "$OUTPUT_FILE")
echo "Retrieved $total_tokens unique token IDs"
