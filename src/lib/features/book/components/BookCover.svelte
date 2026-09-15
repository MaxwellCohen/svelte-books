<script lang="ts">
	import { EMPTY_IMAGE_URL, getLargeBookImageUrl } from '#lib/features/book/book-constants';
	import { cn } from '#lib/utils';
	import { thumbHashToDataURL } from 'thumbhash';

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

	const readySrc = $derived(getLargeBookImageUrl(src ?? EMPTY_IMAGE_URL));
	let failedSrc = $state<string | null>(null);
	const placeholder = $derived(thumbhashUrl(thumbhash));
	const showImage = $derived(readySrc !== failedSrc);
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
		<img
			alt={title}
			class="absolute inset-0 h-full w-full object-cover"
			decoding="async"
			fetchpriority={priority ? 'high' : undefined}
			loading={priority ? 'eager' : 'lazy'}
			onerror={(event) => {
				failedSrc = (event.currentTarget as HTMLImageElement).getAttribute('src');
			}}
			{sizes}
			src={readySrc}
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
