<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		hint: Snippet;
		id: string;
		label: string;
		onCommit?: (value: number) => void;
		onValueChange: (value: number) => void;
		readout?: Snippet | string | number;
		value: number;
		values: readonly number[];
	};

	let {
		hint,
		id,
		label,
		onCommit,
		onValueChange,
		readout,
		value,
		values
	}: Props = $props();

	const index = $derived.by(() => {
		const exact = values.indexOf(value);
		if (exact >= 0) return exact;
		let closest = 0;
		let distance = Number.POSITIVE_INFINITY;
		values.forEach((candidate, i) => {
			const next = Math.abs(candidate - value);
			if (next < distance) {
				closest = i;
				distance = next;
			}
		});
		return closest;
	});

	function pick(event: Event & { currentTarget: HTMLInputElement }) {
		return values[Number(event.currentTarget.value)] ?? value;
	}
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-baseline justify-between gap-2">
		<label class="text-muted text-xs font-semibold tracking-wide uppercase" for={id}>
			{label}
		</label>
		<span class="text-sm font-medium text-black tabular-nums dark:text-white">
			{#if typeof readout === 'function'}
				{@render readout()}
			{:else}
				{readout ?? value}
			{/if}
		</span>
	</div>
	<input
		class="focus-visible:ring-accent/30 cursor-pointer rounded-full focus-visible:ring-2 focus-visible:outline-none"
		{id}
		max={values.length - 1}
		min={0}
		onchange={(event) => onCommit?.(pick(event))}
		oninput={(event) => onValueChange(pick(event))}
		step={1}
		type="range"
		value={index}
	/>
	<div class="text-muted flex justify-between text-[11px] tabular-nums">
		{@render hint()}
	</div>
</div>
