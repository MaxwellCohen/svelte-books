<script lang="ts">
	import ArrowLeftIcon from '#lib/components/ui/icons/ArrowLeftIcon.svelte';
	import { cn } from '#lib/utils';

	const linkClass =
		'text-muted hover:bg-card dark:hover:bg-card-dark -ml-1.5 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-black dark:hover:text-white';

	let { class: className }: { class?: string } = $props();

	function goBack() {
		const canGoBack = (window as Window & { navigation?: { canGoBack?: boolean } }).navigation
			?.canGoBack;
		if (canGoBack || (typeof history !== 'undefined' && history.length > 1)) {
			history.back();
		} else {
			window.location.href = '/';
		}
	}
</script>

<button class={cn(linkClass, className)} onclick={goBack} type="button">
	<ArrowLeftIcon class="size-4" />
	Back to books
</button>
