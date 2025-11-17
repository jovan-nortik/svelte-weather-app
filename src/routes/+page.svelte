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
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Search
      </button>
    </div>

    <!-- Weather Display -->
    <div class="mt-6 text-center bg-gray-50 p-4 rounded-lg shadow">
      <p class="text-lg font-medium text-gray-700">🌍 City: <span class="font-semibold">Berlin</span></p>
      <p class="text-4xl font-bold text-blue-600 mt-2">15°C</p>
      <p class="text-md text-gray-600 mt-1">Cloudy</p>
    </div>
  </div>
</div>