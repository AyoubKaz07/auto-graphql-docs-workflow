#!/bin/bash

# Run the script to merge schema files
node mergeSchemaForDocs.js

# Check if the merge was successful
if [ $? -eq 0 ]; then
  echo "Schema files merged successfully."

  # Run SpectaQL command
  spectaql --schema-file mergedSchema.gql -c ./config.yml -t ./docs

  # Check if SpectaQL command executed successfully
  if [ $? -eq 0 ]; then
    echo "SpectaQL command executed successfully."
  else
    echo "Error: SpectaQL command failed."
  fi

  # Delete the merged schema file
  rm mergedSchema.gql
  echo "Merged schema file deleted."
else
  echo "Error: Failed to merge schema files."
  exit 1
fi