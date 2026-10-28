#!/bin/sh
# Chuyển các ảnh Gemini vừa tải (≤ 5 phút) trong ~/Downloads thành sheets/NN.jpg theo thứ tự tải, rồi cắt.
#   sh grab.sh 7 8     → ảnh tải trước thành tấm 7, ảnh tải sau thành tấm 8
set -e
cd "$(dirname "$0")"
files=$(find ~/Downloads -maxdepth 1 -name 'Gemini_Generated_Image_*' -mmin -5 -printf '%T@\t%p\n' | sort -n | cut -f2)
count=$(printf '%s\n' "$files" | grep -c . || true)
[ "$count" -eq "$#" ] || { echo "cần $# ảnh mới, thấy $count"; printf '%s\n' "$files"; exit 1; }
i=1
for n in "$@"; do
  f=$(printf '%s\n' "$files" | sed -n "${i}p")
  mv "$f" "sheets/$(printf '%02d' "$n").${f##*.}"
  i=$((i + 1))
done
node cut-sheets.mjs "$@"
