#!/bin/sh

if [ $# -eq 0 ]; then
  echo "ファイル名が指定されていません" 1>&2
  exit 1
else
  echo "指定された引数は$#個です。"
fi
date=`date '+%Y-%m-%d'`
filename=$1
basefir="$PWD/../../base"

# cp ./package.json "$1".test
# echo $filename
# echo $date

cp "$basefir/src/pug/template.pug" "./src/pug/$filename-$date.pug"
