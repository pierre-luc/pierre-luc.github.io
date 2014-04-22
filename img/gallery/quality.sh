#!/bin/sh
for i in *; do
  if [ -d $i ]; then
  	for j in $i/*; do
  	  echo "$j converted"
	  convert $j -quality 80 $j;
  	done
  fi
done