<script lang="ts">
	import StarIcon from '#lib/components/ui/icons/StarIcon.svelte';
	import { cn } from '#lib/utils';

	let { class: className, rating }: { class?: string; rating: number } = $props();

	const rounded = $derived(Math.round(rating * 2) / 2);
</script>

<span
	aria-label={`Rated ${rating.toFixed(1)} out of 5`}
	class={cn('inline-flex items-center gap-0.5', className)}
	role="img"
>
	{#each [0, 1, 2, 3, 4] as index (index)}
		{@const active = index + 1 <= rounded || index + 0.5 === rounded}
		<StarIcon
			class={active
				? 'text-warning fill-current'
				: 'text-divider dark:text-divider-dark fill-current'}
		/>
	{/each}
</span>
