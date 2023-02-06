<script lang="ts">
	import './reset.css';
	import './main.css';
	import { fade } from 'svelte/transition';
	import Error from './Error.svelte';
	import Indicator from './Indicator.svelte';
	import { onInterval } from './utils';
	import axios from 'axios';
	import type { ResponseEarthquakeItem } from './api/last-earthquakes/+server';

	let datas: ResponseEarthquakeItem[] = [];
	let error = false;

	onInterval(() => {
		axios
			.get<ResponseEarthquakeItem[]>('/api/last-earthquakes')
			.then(({ data }) => {
				datas = data;
				error = false;
			})
			.catch(() => (error = true));
	}, 10 * 1000);
</script>

<div class="container">
	<h1>
		<Indicator />
		Canlı Son Depremler
	</h1>
	<table>
		<thead>
			<tr>
				<th>Tarih</th>
				<th>Mahalle</th>
				<th>Konum</th>
				<th>Büyüklük</th>
			</tr>
		</thead>
		<tbody>
			{#each datas as data (data.id)}
				<tr in:fade>
					<td>{data.date}</td>
					<td>{data.neighborhood}</td>
					<td>{data.location}</td>
					<td>{data.magnitude}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if error}
	<Error />
{/if}

<style>
	.container {
		background: #ffebee;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-size: 56px;
		font-weight: 700;
		color: #b71c1c;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	table {
		margin-top: 48px;
	}

	th {
		width: 15vw;
		font-weight: 700;
		color: #b71c1c;
	}

	td,
	th {
		padding: 1rem;
		text-align: center;
	}
</style>
