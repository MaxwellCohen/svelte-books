<script lang="ts">
	import { EMPTY_IMAGE_URL, getLargeBookImageUrl } from '#lib/features/book/book-constants';
	import { imageOptimizationEnabled } from '#lib/image-config';
	import { cn } from '#lib/utils';
	import { Image } from '@unpic/svelte/base';
	import { thumbHashToDataURL } from 'thumbhash';
	import { transform as ipxTransform } from 'unpic/providers/ipx';
	import type { URLTransformer } from 'unpic';

	type Props = {
		title: string;
		src: string | null;
		thumbhash: string | null;
		sizes: string;
		class?: string;
		priority?: boolean;
	};

	let {
		title,
		src,
		thumbhash,
		sizes,
		class: className,
		priority = false
	}: Props = $props();

	function thumbhashUrl(hash: string | null) {
		if (!hash) return undefined;
		try {
			const binary = atob(hash);
			const bytes = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
			return thumbHashToDataURL(bytes);
		} catch {
			return undefined;
		}
	}

	/** Pass-through when IPX is disabled (Cloudflare) — original remote URL. */
	const passthroughTransform: URLTransformer = (source) => String(source);

	const transformer = $derived(
		imageOptimizationEnabled ? ipxTransform : passthroughTransform
	);

	const readySrc = $derived(getLargeBookImageUrl(src ?? EMPTY_IMAGE_URL));
	let failedSrc = $state<string | null>(null);
	const placeholder = $derived(thumbhashUrl(thumbhash));
	const showImage = $derived(readySrc !== failedSrc);

	/** Lean srcset for small cover thumbnails (mirrors nuxt-books cover screens). */
	const coverBreakpoints = [160, 320, 480, 640, 768];
</script>

<div
	class={cn(
		'bg-card dark:bg-card-dark relative aspect-[2/3] w-full overflow-hidden rounded-md',
		className
	)}
	style={placeholder
		? `background-image: url(${placeholder}); background-size: cover; background-position: center;`
		: undefined}
>
	{#if showImage}
		<Image
			alt={title}
			aspectRatio={2 / 3}
			breakpoints={coverBreakpoints}
			class="absolute inset-0 h-full w-full object-cover"
			decoding="async"
			layout="fullWidth"
			objectFit="cover"
			operations={imageOptimizationEnabled ? { f: 'webp' } : undefined}
			{priority}
			{sizes}
			src={readySrc}
			{transformer}
			unstyled
			onerror={() => {
				failedSrc = readySrc;
			}}
		/>
	{:else}
		<div
			role="img"
			aria-label={`Cover unavailable for ${title}`}
			class="text-muted absolute inset-0 flex items-center justify-center p-3 text-center text-sm"
		>
			Cover unavailable
		</div>
	{/if}
</div>
