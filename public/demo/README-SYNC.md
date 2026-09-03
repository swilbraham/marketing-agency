# public/demo is a copy

These files are copied from `../measure-demo` so the demo runs on the SkyQuote
domain rather than a separate vercel.app URL.

They differ from the source in exactly one way: a `<base href="/demo/">` tag in
index.html, measure.html and embed.html. Without it, relative script and
stylesheet paths resolve against the site root, because the rewrite in
`next.config.ts` serves the demo at `/demo` with no trailing slash.

To update after changing the framework:

```bash
cd marketing-agency
for f in index.html measure.html embed.html measure.js site.js styles.css site-config.js; do
  cp "../measure-demo/$f" "public/demo/$f"
done
# then re-add the base tag to the three HTML files
```

## Second difference: links back to the site

`index.html` and `measure.html` here link to `/` and `/#pricing` so a visitor
can get back to SkyQuote. The standalone copies in `../measure-demo` can't use
site-relative links, so don't copy those two files back over the source.
