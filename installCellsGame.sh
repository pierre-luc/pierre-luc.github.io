#!/bin/sh
rm -fR cellsGame/
cp -R ~/Documents/l3info/projetAnnuel/cellsGame/ .
git add --all
git commit -m "Mise à jour cellsGame"
git push -u origin master
