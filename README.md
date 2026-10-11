# stemcreative.com

Static portfolio for April Zammas / Stem Creative. Plain HTML, CSS and JS; no build step.

## Edit
- **Copy / timeline / skills:** `index.html`
- **Portfolio items, titles, categories, order:** the `WORK` and `CATS` arrays at the top of `assets/js/main.js`
- **Add an image:** drop `name.webp` (max ~1600px) in `assets/img/work/` and a ~240px `name.webp` in `assets/img/thumbs/`, then add a line to `WORK`
- **Colors:** CSS variables at the top of `assets/css/style.css`

## Deploy (GitHub Pages)
1. Repo Settings > Pages > Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
2. The `CNAME` file in this repo already contains `stemcreative.com`.
3. After DNS (below) resolves, tick **Enforce HTTPS** in the Pages settings.

## DNS (GoDaddy)
Remove any existing A / AAAA records for `@` and any parked-domain forwarding, then add:

| Type  | Name | Value |
|-------|------|-------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | aprilzammas.github.io |

DNS can take minutes to hours. GitHub will redirect www and the apex to whichever you set as the Pages custom domain.
