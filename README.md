```markdown
# Weather Forecast App 🌤️

A modern, responsive, and visually stunning weather forecast web application built with pure **HTML, CSS, and JavaScript**. Features current weather conditions, a 5-day forecast, automatic geolocation detection, dark/light theme toggle, and beautiful animated SVG weather icons.

**Live Demo**: (Add your deployed link here, e.g., GitHub Pages)

## Features

- **Real-time Weather Data** via OpenWeatherMap API
- **Current Weather** display: temperature, feels like, humidity, wind speed, visibility
- **5-Day Forecast** with daily high/low temperatures and weather icons
- **Geolocation Support** – automatically detects and shows weather for your location
- **Dark / Light Mode** with auto-detection based on time of day
- **Responsive Design** – works perfectly on desktop, tablet, and mobile
- **Glassmorphism UI** with smooth animations and hover effects
- **Animated SVG Weather Icons** from [basmilius/weather-icons](https://github.com/basmilius/weather-icons)
- **Clean, modern typography** using Poppins font

## Screenshots

*(Add screenshots here after deployment)*
<!-- Example:
![Day Mode](./screenshots/day-mode.png)
![Night Mode](./screenshots/night-mode.png)
![Mobile View](./screenshots/mobile-view.png)
-->

## Important Security Note ⚠️

**This repository includes an OpenWeatherMap API key in `config.js` for demonstration purposes only.**

**Never deploy this app publicly with an exposed API key.**  
Anyone can view and abuse it, leading to rate limits or charges.

### Recommended Solutions:
1. **Best**: Create a simple backend proxy (Node.js, Python, etc.) to hide the API key.
2. **Quick Fix**: Restrict the key in your OpenWeatherMap dashboard using HTTP referrer (your domain only).
3. **Personal Use**: Replace the key with your own and keep the project private.

**Regenerate or delete the exposed key immediately if planning public deployment.**

## How to Use

### 1. Get an API Key
- Sign up at [OpenWeatherMap](https://openweathermap.org/api)
- Get your free API key (Current Weather + 5 Day Forecast included)

### 2. Set Up the Project
```bash
git clone https://github.com/yourusername/weather-forecast-app.git
cd weather-forecast-app
```

### 3. Add Your API Key
Open `config.js` and replace the placeholder:
```js
const API_KEY = "your_actual_api_key_here";
```

### 4. Open the App
Simply open `index.html` in your browser, or deploy it:

#### Deploy Options (Free):
- [GitHub Pages](https://pages.github.com)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

## Project Structure
```
weather-forecast-app/
├── index.html
├── style.css
├── script.js
├── config.js              # ← Add your API key here
├── daytime.jpg            # Background for light mode (optional)
├── nighttime.jpg          # Background for dark mode (optional)
└── README.md
```

## Customization Ideas
- Replace background images with your favorites
- Add hourly forecast
- Include air quality or UV index
- Add favorite cities/save to localStorage

## Credits
- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- SVG Icons: [basmilius/weather-icons](https://github.com/basmilius/weather-icons)
- Fonts: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)
- Icons: [Font Awesome](https://fontawesome.com/)

## License
MIT License – feel free to use, modify, and distribute.

---

Made with ❤️ using vanilla HTML, CSS & JavaScript.
```