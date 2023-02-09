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
	<div class="tableWrapper">
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
</div>

{#if error}
	<Error />
{/if}

<style>
	.container {
		background: #ffebee;
		width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-size: 32px;
		font-weight: 700;
		color: #b71c1c;
		display: flex;
		align-items: center;
		text-align: center;
		gap: 1rem;
	}

	.tableWrapper {
		margin-top: 2rem;
		overflow-x: auto;
		font-size: 12px;
	}

	table {
		table-layout: fixed;
		width: 100vw;
	}

	th {
		font-weight: 700;
		color: #b71c1c;
	}

	td,
	th {
		width: 25vw;
		padding: 0.75rem;
		overflow: hidden;
		text-align: center;
	}

	@media (min-width: 1024px) {
		h1 {
			font-size: 5rem;
		}

		.tableWrapper {
			margin-top: 4rem;
			font-size: 1rem;
		}

		table {
			width: auto;
		}

		td,
		th {
			width: 15vw;
			padding: 1rem;
		}
	}
</style>
