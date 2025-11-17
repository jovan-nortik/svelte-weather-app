import { describe, it, expect, vi, beforeEach } from 'vitest';


// Mock the environment variable
vi.mock('$env/static/private', () => ({
	WEATHER_API_KEY: 'test_api_key_12345'
}));


describe('Weather API Endpoint', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('initial test case', async () => {
		expect(2+2).toBe(4)
	});

});
