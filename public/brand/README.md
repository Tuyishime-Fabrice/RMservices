# Brand assets

`rm-logo.svg` in this folder is a **temporary stand-in** built from the supplied
R&M logo (blue tile, white serif "R&M" monogram, "SERVICES GROUP LTD" beneath)
so that the site renders correctly before launch.

## Before launch — replace it with the official file

Drop the official logo file supplied by R&M Services Group Ltd here, named
exactly `rm-logo.svg` (SVG preferred; if only a PNG exists, save it as
`rm-logo.png` and update `components/ui/logo.tsx`, which is the only file that
references the path).

Nothing else needs to change: the logo is never redrawn in code, only
referenced. See `CONTENT-CHECKLIST.md` at the repo root.

Also add, when available:

- `og-image.png` (1200×630) for social sharing
- `favicon` source artwork
- Authentic R&M office / team photography (see `components/ui/media-placeholder.tsx`)
