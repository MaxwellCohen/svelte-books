<!--
	Third-party: Fontsource (`@fontsource-variable/geist`, imported in routes/layout.css) self-hosts
	the font with `font-display: swap`. SvelteKit's `resolve(event, { preload })` hook (hooks.server.ts)
	adds a <link rel="preload" as="font"> for the Latin subset on every page.
-->
<div class="p-6 font-sans">
	<h1>font-optimization</h1>
	<p class="ft-font-sample" style="font-family: 'Geist Variable'">
		Self-hosted Geist Variable via Fontsource.
	</p>
</div>
