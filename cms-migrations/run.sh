#!/bin/bash

export ATLAS_DIR=../apps/skde/_posts/helseatlas
export RES_DIR=../apps/skde/public/helseatlas
export STRAPI_HOST=http://localhost:1337
export API_TOKEN=658b19e426a24018d843c370174e2cebee524fb3f329045181e39f57dc1c0f0aabb4bb48cb517571a7b866ddbc28ad30bb5816fdf9858b09e75e6221395337a9e1ac9ebff7af0d33573ac297048e18bd1da655f0a2142bfd32eed0d8b83ade85bdf7b2222cf2c3216926ce908016085b8399208637844ecec1dd6f42b86707d7

# python3 ./import_pages.py $ATLAS_DIR/statisk $STRAPI_HOST $API_TOKEN
# python3 ./import_pages.py $ATLAS_DIR/en/static $STRAPI_HOST $API_TOKEN
# python3 ./import_data.py $RES_DIR/data $STRAPI_HOST $API_TOKEN

python3 ./import_atlases.py $ATLAS_DIR/atlas $STRAPI_HOST $API_TOKEN
# python3 ./import_atlases.py $ATLAS_DIR/en/atlas $STRAPI_HOST $API_TOKEN
