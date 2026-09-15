<script lang="ts">
	import { setMobileSidebarContext } from '#lib/features/book/components/mobile-sidebar-context.svelte';
	import XIcon from '#lib/components/ui/icons/XIcon.svelte';
	import type { Snippet } from 'svelte';

	let { children, sidebar }: { children: Snippet; sidebar: Snippet } = $props();

	let isOpen = $state(false);

	setMobileSidebarContext({
		close: () => {
			isOpen = false;
		},
		open: () => {
			isOpen = true;
		}
	});
</script>

{@render children()}

{#if isOpen}
	<div
		aria-hidden="true"
		class="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] md:hidden"
		onclick={() => {
			isOpen = false;
		}}
		role="presentation"
	></div>
	<aside
		class="border-divider bg-surface dark:border-divider-dark dark:bg-surface-dark fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-3rem))] max-w-full touch-pan-y flex-col overflow-x-hidden border-r pt-[max(1rem,env(safe-area-inset-top))] pr-4 pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] shadow-2xl md:hidden"
		onclick={(event) => {
			if ((event.target as HTMLElement).closest('a[href]')) isOpen = false;
		}}
		role="presentation"
	>
		<button
			aria-label="Close filters"
			class="text-muted hover:bg-card focus-visible:ring-accent dark:hover:bg-card-dark absolute top-[max(0.75rem,env(safe-area-inset-top))] right-3 grid size-9 place-items-center rounded-md hover:text-black focus-visible:ring-2 focus-visible:outline-none dark:hover:text-white"
			onclick={() => {
				isOpen = false;
			}}
			type="button"
		>
			<XIcon class="size-5" />
		</button>
		{@render sidebar()}
	</aside>
{/if}
