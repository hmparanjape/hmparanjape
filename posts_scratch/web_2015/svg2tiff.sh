#!/bin/bash
#
# Exports SVG figures in the folder to high-res TIFFs
# TIFFs are moved to the parent folder
#
for file in *.svg
do
    filename=$(basename "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"
    inkscape -b#ffffff -d 100 --export-png $filename.png $file
done
#
