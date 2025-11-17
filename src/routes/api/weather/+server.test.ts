import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './+server';

// Mock the environment variable
vi.mock('$env/static/private', () => ({
	WEATHER_API_KEY: 'test_api_key_12345'
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('Weather API Endpoint', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should return 400 error when city parameter is missing', async () => {
		// Arrange: Create a URL without the city query parameter
		const url = new URL('http://localhost/api/weather');
		const request = { url } as any;

		// Act & Assert: Call the endpoint and expect an error
		try {
			await GET(request);
			expect.fail('Expected an error to be thrown');
		} catch (error: any) {
			// Verify the error status code is 400
			expect(error.status).toBe(400);
			// Verify the error message
			expect(error.body.message).toBe('City parameter is required');
		}
	});

	it('should fetch weather data successfully for a valid city', async () => {
		// Arrange: Mock the WeatherAPI response
		const mockApiResponse = {
			location: {
				name: 'Berlin'
			},
			current: {
				temp_c: 15.7,
				condition: {
					text: 'Partly cloudy'
				}
			}
		};

		// Mock fetch to return a successful response
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockApiResponse
		});

		// Create a request with city parameter
		const url = new URL('http://localhost/api/weather?city=Berlin');
		const request = { url } as any;

		// Act: Call the endpoint
		const response = await GET(request);
		const data = await response.json();

		// Assert: Verify fetch was called correctly
		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining('https://api.weatherapi.com/v1/current.json')
		);
		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining('key=test_api_key_12345')
		);
		expect(mockFetch).toHaveBeenCalledWith(
			expect.stringContaining('q=Berlin')
		);

		// Assert: Verify the response data structure and values
		expect(data).toEqual({
			city: 'Berlin',
			temperature: 16, // Should be rounded from 15.7
			condition: 'Partly cloudy'
		});
	});

	it('should handle API errors gracefully', async () => {
		// Arrange: Mock fetch to throw a network error
		mockFetch.mockRejectedValueOnce(new Error('Network error'));

		const url = new URL('http://localhost/api/weather?city=London');
		const request = { url } as any;

		// Act & Assert: Call the endpoint and expect an error
		try {
			await GET(request);
			expect.fail('Expected an error to be thrown');
		} catch (error: any) {
			// Verify a 500 status error is thrown for API errors
			expect(error.status).toBe(500);
			// Verify the error message is user-friendly
			expect(error.body.message).toBe('An error occurred while fetching weather data');
		}
	});
});
