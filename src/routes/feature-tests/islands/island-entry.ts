// ...and hand-roll one island: this entry is bundled separately and mounts only the counter.
import { mount } from 'svelte';
import IslandCounter from './IslandCounter.svelte';

for (const el of document.querySelectorAll<HTMLElement>('[data-island="counter"]')) {
	const props = JSON.parse(el.dataset.props ?? '{}');
	el.replaceChildren();
	mount(IslandCounter, { target: el, props });
	el.dataset.hydrated = 'true';
}
