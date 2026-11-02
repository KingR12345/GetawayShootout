# Getaway Shootout (local)

Run `./start.command` or `python3 -m http.server 7890 --bind 127.0.0.1` from this folder, then open http://localhost:7890. Keep the terminal open; press Ctrl+C to stop. Requires Python 3 and a browser with WebGL.


## Deploying on Coolify

The repo ships a `Dockerfile`, so set **Build Pack: Dockerfile** and **Ports Exposes: 80**.
No build command or publish directory is needed. `GET /healthz` returns `ok` for health checks.

The image is nginx serving the static files. The `.unityweb` payloads ship uncompressed
(~24 MB total), so they are gzipped at build time and served through `gzip_static`, which
brings the download to about 8 MB.

Set the domain in Coolify with its scheme (`https://your.domain`), or Traefik will not
request a Let's Encrypt certificate and will serve its self-signed default instead.
