#!/bin/sh
for i in *; do
  if [ -d $i ]; then
  	for j in $i/*; do
  	  echo "$j converted"
	  convert $j -resize 300x $j;
  	done
  fi
done