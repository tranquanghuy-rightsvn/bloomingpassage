#!/bin/bash
# Renders every banner size from banner.html with headless Chrome.
# Usage: bash banners/src/render.sh   (from the repo root; serves the repo on :8011 so the CSS masks load)
set -e
cd "$(dirname "$0")/../.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
python3 -m http.server 8011 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV' EXIT
sleep 1
for v in og-1200x630 facebook-cover-1640x624 x-header-1500x500 linkedin-1584x396 youtube-2560x1440 \
         instagram-1080x1080 instagram-portrait-1080x1350 story-1080x1920 pinterest-1000x1500 widescreen-1920x1080; do
  size=${v##*-}; w=${size%x*}; h=${size#*x}
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=$w,$h --virtual-time-budget=4000 --screenshot="banners/blooming-passage-$v.png" \
    "http://localhost:8011/banners/src/banner.html?v=$v" >/dev/null 2>&1
  echo "banners/blooming-passage-$v.png"
done
