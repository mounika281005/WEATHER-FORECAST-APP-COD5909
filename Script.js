// API key for accessing OpenWeatherMap API
const apiKey = '969b0f47193b8a4f28ff2c4dcf2cdfa4';

// Function to fetch weather data for a given city
function getWeather() {
    // Get the input field for city name
    const cityInput = document.getElementById('city-input');
    // Extract the value of the city name input field
    const cityName = cityInput.value;

    // Check if the city name is empty or contains only whitespace
    if (cityName.trim() === '') {
        // Alert the user to enter a city name if it is empty
        alert('Please enter a city name');
        return; // Exit the function
    }

    // Construct the API URL for fetching weather data using the city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json()) // Convert response to JSON format
        .then(data => {
            // Call the displayWeather function with the retrieved data
            displayWeather(data);
        })
        .catch(error => {
            // Log error to console and alert user about the error
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

// Function to display weather information on the webpage
function displayWeather(data) {
    // Get the element where weather information will be displayed
    const weatherInfo = document.getElementById('weather-info');
    // Extract relevant weather data from the response
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
    const description = data.weather[0].description;

    // Get current date information
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();

    // Construct HTML content to display weather information
    const weatherHtml = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
        <p>${day}, ${date} ${month} ${year}</p>
    `;

    // Update the weather information on the webpage
    weatherInfo.innerHTML = weatherHtml;
}
