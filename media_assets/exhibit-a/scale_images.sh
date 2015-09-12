#!/bin/bash

for image in source/*
do
    filename=$(basename "$image")
    imagename="${filename%.*}"

    if [ ! -e "$imagename"_3600.jpg ]; then
      convert -strip -interlace Plane -quality 90 -resize 3600x source/"$imagename".jpg "$imagename"_3600.jpg
    fi

    if [ ! -e "$imagename"_600.jpg ]; then
      image_info=$( identify source/"$imagename".jpg )
      image_info=($image_info)
      image_dimensions=${image_info[2]}
      image_dimensions=(${image_dimensions//x/ })
      image_width=${image_dimensions[0]}
      image_height=${image_dimensions[1]}

      scaled_width=600
      scale_ratio=$( echo "$scaled_width / $image_width" | bc -l )
      scaled_height=$( echo "$scale_ratio * $image_height" | bc )
      printf -v scaled_height_int %.0f "$scaled_height"

      if [ $scaled_height_int -lt 400 ]
      then
      scaled_height=400
      scale_ratio=$( echo "$scaled_height / $image_height" | bc -l )
      scaled_width=$( echo "$scale_ratio * $image_width" | bc )
      fi

      convert -strip -interlace Plane -quality 90 -resize "$scaled_width"x source/"$imagename".jpg "$imagename"_600.jpg
    fi

done
