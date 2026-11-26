# Feature tests (SvelteKit)

Validates each Framework Compare label for SvelteKit against a **production build**.

```sh
npm run test:features   # = node feature-tests/run.mjs
```

The runner builds (`vite build`, Vercel adapter), serves the build with `vite preview` on port 4105,
runs the `browser` Playwright project (system Chrome at `/home/maxc/.local/bin/google-chrome`), stops
the server, runs the `build` project (extra builds), and writes `feature-tests/results.json`.

Pages live under `/feature-tests/<featureId>`; feature-test routes skip the catalog layout chrome.

| Feature               | Label     | What the spec checks                                                                                                                                                                 |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| css-inlining          | 1st-party | `inlineStyleThreshold`: route CSS in an inline `<style>`; only disabled `media="(max-width: 0)"` stylesheet placeholders, none render-blocking                                       |
| font-optimization     | 3rd-party | Fontsource Geist is same-origin, `@font-face` has `font-display: swap`, `<link rel=preload as=font>` from the `handle` hook's `preload` filter, no Google Fonts requests             |
| image-pipeline        | 1st-party | `@sveltejs/enhanced-img`: `<picture>` sources with ≥2 `w` widths, `<img>` width/height, offscreen `loading=lazy`, srcset URL served as `image/avif`                                  |
| caching               | 1st-party | `setHeaders` Cache-Control on an endpoint; browser reuses the response within `max-age` and gets a fresh counter after; adapter-vercel emits the route's ISR `prerender-config.json` |
| route-prefetching     | 1st-party | hovering a `data-sveltekit-preload-data="hover"` link requests the target's `__data.json` + node chunk before the click                                                              |
| islands               | manual    | `csr = false` route + hand-bundled island entry (`?worker&url`, Svelte `mount`): island works, no JS contains the static component's marker, no SvelteKit runtime                    |
| render-modes          | 1st-party | `prerender = true` (HTML in build output, stable timestamp), dynamic SSR (timestamp changes), `ssr = false` (empty HTML, rendered in browser)                                        |
| reactivity            | 1st-party | runes: 3 clicks update `#ft-count`, component script ran once, all DOM mutations hit only the bound text                                                                             |
| bundle-analysis       | 3rd-party | `ANALYZE=1 vite build` with `rollup-plugin-visualizer` writes `.svelte-kit/stats/client.html`                                                                                        |
| third-party-scripts   | 3rd-party | Partytown (`@qwik.dev/partytown`): `type="text/partytown"` script, fetched by the worker (never as a main-thread script), DOM side effect lands on the page                          |
| multi-host-deployment | 1st-party | builds with adapter-netlify, adapter-cloudflare and adapter-vercel; asserts each output dir                                                                                          |

Notes: local builds run on Node 26, so `vite.config.ts` pins adapter-vercel to `nodejs24.x` when not on Vercel.
