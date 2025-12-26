// config.js must define: const API_KEY = "your_key_here";

// DOM Elements
const elements = {
    cityInput: document.getElementById("cityInput"),
    searchBtn: document.getElementById("searchBtn"),
    loading: document.getElementById("loading"),
    error: document.getElementById("error"),
    currentWeather: document.getElementById("currentWeather"),
    forecast: document.getElementById("forecast"),
    themeToggle: document.getElementById("themeToggle"),
    autoLocation: document.getElementById("autoLocation"),
    detectedCity: document.getElementById("detectedCity"),
    temperature: document.getElementById("temperature"),
    cityName: document.getElementById("cityName"),
    description: document.getElementById("description"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("windSpeed"),
    visibility: document.getElementById("visibility"),
    feelsLike: document.getElementById("feelsLike"),
    weatherSvg: document.getElementById("weatherSvg")
};

// API Configuration
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const BASE_SVG_URL = "https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/";

// Weather icon mapping
const svgMap = {
    "01d": "clear-day.svg",
    "01n": "clear-night.svg",
    "02d": "partly-cloudy-day.svg",
    "02n": "partly-cloudy-night.svg",
    "03d": "cloudy.svg",
    "03n": "cloudy.svg",
    "04d": "overcast.svg",
    "04n": "overcast.svg",
    "09d": "partly-cloudy-day-drizzle.svg",
    "09n": "partly-cloudy-night-drizzle.svg",
    "10d": "rain.svg",
    "10n": "rain.svg",
    "11d": "thunderstorms-day.svg",
    "11n": "thunderstorms-night.svg",
    "13d": "snow.svg",
    "13n": "snow.svg",
    "50d": "fog.svg",
    "50n": "fog.svg"
};

// Utility: Reset UI state
function resetDisplay() {
    elements.loading.style.display = "none";
    elements.error.style.display = "none";
    elements.currentWeather.style.display = "none";
    elements.forecast.style.display = "none";
    elements.autoLocation.style.display = "none";
    elements.error.textContent = "";
    elements.forecast.innerHTML = "";
}

// Utility: Set theme (dark/light)
function setTheme(isNight) {
    if (isNight) {
        document.body.classList.add("night");
        elements.themeToggle.innerHTML = "<i class='fas fa-sun'></i>";
    } else {
        document.body.classList.remove("night");
        elements.themeToggle.innerHTML = "<i class='fas fa-moon'></i>";
    }
}

// Auto theme based on time
function updateThemeFromTime() {
    const hour = new Date().getHours();
    setTheme(hour >= 18 || hour < 6);
}

// Main function: Fetch and display weather
async function fetchWeather(city) {
    const trimmedCity = city.trim();
    if (!trimmedCity) {
        elements.error.textContent = "Please enter a city name.";
        elements.error.style.display = "block";
        return;
    }

    resetDisplay();
    elements.loading.style.display = "block";
    elements.searchBtn.disabled = true;

    try {
        // Fetch current weather
        const currentRes = await fetch(`${CURRENT_URL}?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`);
        if (!currentRes.ok) {
            const errData = await currentRes.json();
            throw new Error(errData.message || "City not found");
        }
        const currentData = await currentRes.json();

        // Update current weather UI
        elements.cityName.textContent = `${currentData.name}, ${currentData.sys.country}`;
        elements.temperature.innerHTML = `${Math.round(currentData.main.temp)}°<sup>C</sup>`;
        elements.description.textContent = currentData.weather[0].description;
        elements.humidity.textContent = `${currentData.main.humidity}%`;
        elements.windSpeed.textContent = `${currentData.wind.speed.toFixed(1)} m/s`;
        elements.feelsLike.textContent = `${Math.round(currentData.main.feels_like)}°C`;
        elements.visibility.textContent = `${(currentData.visibility / 1000).toFixed(1)} km`;

        const iconCode = currentData.weather[0].icon;
        const svgFile = svgMap[iconCode] || (iconCode.endsWith('n') ? "clear-night.svg" : "clear-day.svg");
        elements.weatherSvg.src = BASE_SVG_URL + svgFile;

        elements.currentWeather.style.display = "block";

        // Fetch forecast
        const forecastRes = await fetch(`${FORECAST_URL}?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`);
        if (!forecastRes.ok) throw new Error("Forecast unavailable");
        const forecastData = await forecastRes.json();

        // Group forecast by day
        const daily = {};
        forecastData.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];
            if (!daily[date]) daily[date] = { temps: [], icons: [] };
            daily[date].temps.push(item.main.temp);
            daily[date].icons.push(item.weather[0].icon);
        });

        let html = "";
        let count = 0;
        for (const [date, data] of Object.entries(daily)) {
            if (count >= 5) break;
            if (count === 0) { count++; continue; } // Skip today

            const maxTemp = Math.round(Math.max(...data.temps));
            const minTemp = Math.round(Math.min(...data.temps));
            const commonIcon = data.icons.sort((a,b) => 
                data.icons.filter(v => v===a).length - data.icons.filter(v => v===b).length
            ).reverse()[0];

            const svgFileForecast = svgMap[commonIcon] || (commonIcon.endsWith('n') ? "clear-night.svg" : "clear-day.svg");
            const dayName = new Date(date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });

            html += `
                <div class="forecast-day">
                    <div class="day-name">${dayName}</div>
                    <img src="${BASE_SVG_URL}${svgFileForecast}" class="forecast-svg" alt="Weather icon">
                    <div class="forecast-temps">
                        <div class="forecast-temp-max">${maxTemp}°</div>
                        <div class="forecast-temp-min">${minTemp}°</div>
                    </div>
                </div>
            `;
            count++;
        }

        elements.forecast.innerHTML = html;
        elements.forecast.style.display = "grid";

    } catch (err) {
        elements.error.textContent = err.message.includes("not found")
            ? "City not found. Try: London, Tokyo, New York"
            : `Error: ${err.message}`;
        elements.error.style.display = "block";
    } finally {
        elements.loading.style.display = "none";
        elements.searchBtn.disabled = false;
    }
}

// Event Listeners
elements.searchBtn.addEventListener("click", () => {
    fetchWeather(elements.cityInput.value);
});

elements.cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchWeather(elements.cityInput.value);
    }
});

elements.themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("night");
    const isNight = document.body.classList.contains("night");
    setTheme(isNight);
});

// Geolocation on load
window.addEventListener("load", () => {
    updateThemeFromTime();

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const res = await fetch(`${CURRENT_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
                const data = await res.json();
                elements.detectedCity.textContent = `${data.name}, ${data.sys.country}`;
                elements.autoLocation.style.display = "block";
                fetchWeather(data.name);
            } catch {
                fetchWeather("London");
            }
        }, () => {
            fetchWeather("London");
        });
    } else {
        fetchWeather("London");
    }
});