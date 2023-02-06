import { error } from '@sveltejs/kit';
import axios from 'axios';

export interface EarthquakeItem {
	rms: string;
	eventID: string;
	location: string;
	latitude: string;
	longitude: string;
	depth: string;
	type: string;
	magnitude: string;
	country: string;
	province: string;
	district: string;
	neighborhood: string;
	date: string;
	isEventUpdate: boolean;
	lastUpdateDate?: string;
}

export interface ResponseEarthquakeItem {
	id: string;
	location: string;
	magnitude: string;
	neighborhood: string;
	date: string;
}

export async function GET() {
	const start = new Date();
	start.setDate(start.getDate() - 1);

	const end = new Date();
	end.setDate(end.getDate() + 1);

	try {
		const { data } = await axios.get<EarthquakeItem[]>(
			'https://deprem.afad.gov.tr/apiv2/event/filter',
			{
				params: {
					start: start.toISOString(),
					end: end.toISOString(),
					format: 'json'
				}
			}
		);

		const response = new Response(
			JSON.stringify(
				data
					.reverse()
					.slice(0, 10)
					.map((eq) => ({
						id: eq.eventID,
						date: parseDate(eq.date),
						location: eq.location,
						neighborhood: eq.neighborhood,
						magnitude: eq.magnitude
					}))
			)
		);
		response.headers.append('Access-Control-Allow-Origin', '*');

		return response;
	} catch (e) {
		return error(400, 'Sistem yanıt vermiyor');
	}
}

function parseDate(dateStr: string) {
	const date = new Date(dateStr);
	// add UTC+3
	date.setHours(date.getHours() + 3);
	return date.toLocaleString('tr');
}
