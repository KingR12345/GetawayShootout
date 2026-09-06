# Getaway Shootout (local)

Run `./start.command` or `python3 -m http.server 7890 --bind 127.0.0.1` from this folder, then open http://localhost:7890. Keep the terminal open; press Ctrl+C to stop. Requires Python 3 and a browser with WebGL.

Removed the forced external redirect, Google Analytics, remotely loaded promotional scripts, advertising SDK, unused loaders, screenshots, fonts, and site verification file. The local compatibility layer completes commercial breaks without ads and reports rewarded ads as unavailable. The page restricts scripts and network requests to local resources via Content Security Policy.

Original game assets and the Unity runtime remain unchanged. This is a source review and cleanup, not an antivirus certification of the compiled game. Original source attribution is in @source.txt.

## Deploying on Coolify

The repo ships a `Dockerfile`, so set **Build Pack: Dockerfile** and **Ports Exposes: 80**.
No build command or publish directory is needed. `GET /healthz` returns `ok` for health checks.

The image is nginx serving the static files. The `.unityweb` payloads ship uncompressed
(~24 MB total), so they are gzipped at build time and served through `gzip_static`, which
brings the download to about 8 MB.

Set the domain in Coolify with its scheme (`https://your.domain`), or Traefik will not
request a Let's Encrypt certificate and will serve its self-signed default instead.
