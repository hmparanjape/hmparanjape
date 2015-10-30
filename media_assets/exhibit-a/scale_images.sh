#!/bin/bash

for image in source/*
do
    filename=$(basename "$image")
    imagename="${filename%.*}"

    if [ ! -e "$imagename".jpg ]; then
      convert -strip -interlace Plane -quality 90 -resize 3600x source/"$imagename".jpg "$imagename".jpg
    fi

    if [ ! -e "$imagename"_thumb.jpg ]; then
      image_info=$( identify source/"$imagename".jpg )
      image_info=($image_info)
      image_dimensions=${image_info[2]}
      image_dimensions=(${image_dimensions//x/ })
      image_width=${image_dimensions[0]}
      image_height=${image_dimensions[1]}

      scaled_width=1200
      scale_ratio=$( echo "$scaled_width / $image_width" | bc -l )
      scaled_height=$( echo "$scale_ratio * $image_height" | bc )
      printf -v scaled_height_int %.0f "$scaled_height"

      if [ $scaled_height_int -lt 800 ]
      then
      scaled_height=800
      scale_ratio=$( echo "$scaled_height / $image_height" | bc -l )
      scaled_width=$( echo "$scale_ratio * $image_width" | bc )
      fi

      convert -strip -interlace Plane -quality 90 -resize "$scaled_width"x source/"$imagename".jpg "$imagename"_thumb.jpg
    fi

done
