#!/usr/bin/env bash

gatsby clean

gatsby build

touch public/.nojekyll

echo 'flapper.ldlework.com' > public/CNAME
