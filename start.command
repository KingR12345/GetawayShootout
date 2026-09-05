#!/bin/zsh
cd -- "$(dirname -- "$0")" || exit 1
exec python3 -m http.server 3798 --bind 127.0.0.1
