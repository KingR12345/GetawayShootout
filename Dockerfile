# Static hosting for the Unity WebGL build.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY index.html style.css favicon.ico ./
COPY js ./js
COPY Build ./Build

# The .unityweb payloads ship uncompressed (~24 MB). Pre-compress them so
# nginx can serve the .gz copies via gzip_static instead of the raw files.
RUN gzip -9 -k Build/*.unityweb js/v2/unity/*.js

EXPOSE 80
