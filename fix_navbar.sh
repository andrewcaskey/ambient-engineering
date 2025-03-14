#!/bin/bash

# Fix both import and usage for these files
files=("client/src/pages/Contact.tsx" "client/src/pages/Gallery.tsx" "client/src/pages/Stories.tsx")

for file in "${files[@]}"; do
  # Remove Navbar import
  sed -i 's/import Navbar from "@\/components\/Navbar";//g' "$file"
  
  # Remove Navbar usage in header
  sed -i 's/<Navbar \/>//g' "$file"
  sed -i 's/<Navbar>//g' "$file"
  sed -i 's/<\/Navbar>//g' "$file"
done
