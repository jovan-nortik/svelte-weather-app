import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Mock weather data for different cities
const mockWeatherData: Record<string, { temperature: number; condition: string }> = {
	berlin: { temperature: 15, condition: 'Cloudy' },
	london: { temperature: 12, condition: 'Rainy' },
	paris: { temperature: 18, condition: 'Sunny' },
	'new york': { temperature: 22, condition: 'Clear' },
	tokyo: { temperature: 25, condition: 'Partly Cloudy' },
	sydney: { temperature: 28, condition: 'Sunny' },
	moscow: { temperature: 8, condition: 'Snowy' },
	dubai: { temperature: 35, condition: 'Hot' },
	amsterdam: { temperature: 14, condition: 'Windy' },
	rome: { temperature: 20, condition: 'Sunny' }
};

export const GET: RequestHandler = async ({ url }) => {
	const city = url.searchParams.get('city');

	if (!city) {
		throw error(400, 'City parameter is required');
	}

	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	// Normalize city name for lookup
	const normalizedCity = city.toLowerCase().trim();

	// Check if we have mock data for this city
	const weatherData = mockWeatherData[normalizedCity];

	if (!weatherData) {
		throw error(404, 'City not found');
	}

	// Return the response in the required format
	return json({
		city: city.charAt(0).toUpperCase() + city.slice(1), // Capitalize first letter
		temperature: weatherData.temperature,
		condition: weatherData.condition
	});
};
