<script lang="ts">
	import Button from '#lib/components/ui/Button.svelte';
	import SlidersHorizontalIcon from '#lib/components/ui/icons/SlidersHorizontalIcon.svelte';
	import { useMobileSidebar } from '#lib/features/book/components/mobile-sidebar-context.svelte';

	const sidebar = useMobileSidebar();
</script>

<Button
	aria-label="Open filters"
	class="md:hidden"
	onclick={() => sidebar.open()}
	size="icon"
	variant="ghost"
>
	<SlidersHorizontalIcon class="size-4" />
</Button>
