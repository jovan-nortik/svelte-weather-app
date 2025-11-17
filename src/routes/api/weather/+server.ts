import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { WEATHER_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
	const city = url.searchParams.get('city');

	if (!city) {
		throw error(400, 'City parameter is required');
	}

	try {
		// Fetch weather data from WeatherAPI
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}`
		);

		if (!response.ok) {
			if (response.status === 400) {
				throw error(404, 'City not found');
			}
			throw error(response.status, 'Failed to fetch weather data');
		}

		const data = await response.json();

		// Return the response in the required format
		return json({
			city: data.location.name,
			temperature: Math.round(data.current.temp_c),
			condition: data.current.condition.text
		});
	} catch (err) {
		if (err instanceof Error && 'status' in err) {
			throw err;
		}
		throw error(500, 'An error occurred while fetching weather data');
	}
};
