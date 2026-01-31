// index.js - Home page functionality

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const weatherContainer = document.querySelector('#weather-info');
const spotlightsContainer = document.querySelector('#spotlights');
const eventsContainer = document.querySelector('#events');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
});

// Close menu when a link is clicked
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// Weather API - OpenWeatherMap
const WEATHER_API_KEY = '2e71fec0fdd4eb31c5ef1ecd7c54ddf5'; // Sample key - replace with your own
const WEATHER_CITY = 'Idaho Falls';
const WEATHER_COORDS = { lat: 43.4927, lon: -111.8946 }; // Idaho Falls coordinates

async function getWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${WEATHER_COORDS.lat}&lon=${WEATHER_COORDS.lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherContainer.innerHTML = '<p>Unable to load weather data at this time.</p>';
    }
}

function displayWeather(data) {
    const current = data.list[0];
    const currentTemp = Math.round(current.main.temp);
    const description = current.weather[0].main;
    
    // Get 3-day forecast (every 24 hours)
    const forecastDays = [];
    for (let i = 0; i < data.list.length; i += 8) { // 8 * 3-hour intervals = 24 hours
        if (forecastDays.length < 3) {
            forecastDays.push(data.list[i]);
        }
    }

    let weatherHTML = `
        <div class="weather-current">
            <div class="temperature">${currentTemp}°C</div>
            <div class="description">${description}</div>
            <div class="location">${WEATHER_CITY}, ID</div>
        </div>
        <div class="weather-forecast">
    `;

    forecastDays.forEach((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        
        weatherHTML += `
            <div class="forecast-day">
                <div class="day-name">${dayName}</div>
                <div class="day-temp">${temp}°C</div>
            </div>
        `;
    });

    weatherHTML += '</div>';
    weatherContainer.innerHTML = weatherHTML;
}

// Get members and display spotlights
async function getSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        
        // Filter for Gold (3) and Silver (2) members
        const premiumMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
        
        // Shuffle and select 2-3 random members
        const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, Math.random() > 0.5 ? 3 : 2);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error fetching members data:', error);
        spotlightsContainer.innerHTML = '<p>Unable to load member spotlights at this time.</p>';
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = '';
    
    members.forEach(member => {
        const membershipLevel = getMembershipLevel(member.membershipLevel);
        const membershipClass = membershipLevel.toLowerCase();
        
        const spotlightHTML = `
            <div class="spotlight-card">
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <span class="membership-badge ${membershipClass}">${membershipLevel} Member</span>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website ↗</a>
            </div>
        `;
        
        spotlightsContainer.innerHTML += spotlightHTML;
    });
}

function getMembershipLevel(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Display current events
function displayEvents() {
    const events = [
        {
            title: 'Monthly Business Mixer',
            date: 'February 15, 2026',
            description: 'Connect with local business owners and professionals. Light refreshments provided.'
        },
        {
            title: 'Community Cleanup Day',
            date: 'February 22, 2026',
            description: 'Join us in beautifying our city. All supplies provided. Sign up at the front desk.'
        }
    ];

    eventsContainer.innerHTML = '';
    events.forEach(event => {
        const eventHTML = `
            <div class="event-card">
                <h3>${event.title}</h3>
                <div class="event-date">${event.date}</div>
                <p>${event.description}</p>
            </div>
        `;
        eventsContainer.innerHTML += eventHTML;
    });
}

// Set current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize page
displayEvents();
getWeather();
getSpotlights();
