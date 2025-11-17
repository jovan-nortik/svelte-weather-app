<script lang="ts">
	let cityInput = $state('');
	let weatherData = $state<{ city: string; temperature: number; condition: string } | null>(null);
	let loading = $state(false);
	let error = $state('');
	let debounceTimer: number | null = null;
	let lastSearchTime = $state(0);
	const DEBOUNCE_DELAY = 500; // 500ms debounce delay

	async function searchWeather() {
		if (!cityInput.trim()) {
			error = 'Please enter a city name';
			return;
		}

		// Check if enough time has passed since last search
		const now = Date.now();
		const timeSinceLastSearch = now - lastSearchTime;

		if (loading || timeSinceLastSearch < DEBOUNCE_DELAY) {
			return; // Ignore if already loading or debounce period hasn't passed
		}

		lastSearchTime = now;
		loading = true;
		error = '';

		try {
			const response = await fetch(`/api/weather?city=${encodeURIComponent(cityInput)}`);

			if (!response.ok) {
				if (response.status === 404) {
					error = 'City not found. Try: Berlin, London, Paris, New York, Tokyo, Sydney, Moscow, Dubai, Amsterdam, or Rome';
				} else {
					error = 'Failed to fetch weather data';
				}
				weatherData = null;
				return;
			}

			weatherData = await response.json();
		} catch (err) {
			error = 'An error occurred. Please try again.';
			weatherData = null;
		} finally {
			loading = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			// Clear any existing debounce timer
			if (debounceTimer !== null) {
				clearTimeout(debounceTimer);
			}

			// Debounce the Enter key press
			debounceTimer = window.setTimeout(() => {
				searchWeather();
				debounceTimer = null;
			}, DEBOUNCE_DELAY);
		}
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
  <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
    <h1 class="text-2xl font-semibold text-gray-800 text-center mb-4">
      Weather Dashboard
    </h1>

    <!-- Search Bar -->
    <div class="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Enter city name..."
        bind:value={cityInput}
        onkeypress={handleKeyPress}
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onclick={searchWeather}
        disabled={loading}
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
        {loading ? 'Loading...' : 'Search'}
      </button>
    </div>

    <!-- Error Message -->
    {#if error}
      <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    {/if}

    <!-- Weather Display -->
    {#if weatherData}
      <div class="mt-6 text-center bg-gray-50 p-4 rounded-lg shadow">
        <p class="text-lg font-medium text-gray-700">🌍 City: <span class="font-semibold">{weatherData.city}</span></p>
        <p class="text-4xl font-bold text-blue-600 mt-2">{weatherData.temperature}°C</p>
        <p class="text-md text-gray-600 mt-1">{weatherData.condition}</p>
      </div>
    {:else if !loading && !error}
      <div class="mt-6 text-center bg-gray-50 p-4 rounded-lg shadow">
        <p class="text-gray-500">Enter a city name to see the weather</p>
      </div>
    {/if}
  </div>
</div>