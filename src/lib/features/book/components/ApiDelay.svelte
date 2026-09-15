<script lang="ts">
	import Range from '#lib/components/ui/Range.svelte';
	import {
		currentSearchParams,
		updateSearchParams
	} from '#lib/features/book/url-helpers.svelte';
	import {
		API_DELAY_VALUES,
		formatApiDelay,
		getApiDelayMs
	} from '#lib/url-state';

	let { idPrefix }: { idPrefix: string } = $props();

	let draft = $state<number | undefined>(undefined);
	const committed = $derived(getApiDelayMs(currentSearchParams()));
	const value = $derived(draft ?? committed);
</script>

<Range
	id={`${idPrefix}-api-delay`}
	label="API delay"
	onCommit={(next) => {
		draft = undefined;
		void updateSearchParams({ delay: next === 0 ? undefined : String(next) });
	}}
	onValueChange={(next) => {
		draft = next;
	}}
	readout={formatApiDelay(value)}
	{value}
	values={API_DELAY_VALUES}
>
	{#snippet hint()}
		<span>Off</span>
		<span>3s</span>
	{/snippet}
</Range>
