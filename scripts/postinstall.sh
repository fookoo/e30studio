#!/usr/bin/env bash
set -e;

# skip postinstall if npm install for development
# rollup.config.js is not included in dist
if [ -f "rollup.config.js" ]; then
  echo "skipping your package's postinstall routine.";
  exit 0;
fi

echo 'Copying files from dist folder into root project folder...'
cp -r dist/* ./ && rm -rf dist
echo 'Postinstall done!'