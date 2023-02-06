import { onDestroy, onMount } from 'svelte';

export function onInterval(callback: () => void, milliseconds: number) {
	onMount(() => {
		callback();
	});

	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}
