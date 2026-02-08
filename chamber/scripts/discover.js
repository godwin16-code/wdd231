// scripts/discover.js - Display attractions and handle visitor tracking

import { attractions } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('attractionsContainer');
    const messageDiv = document.getElementById('visitorMessage');

    // Display attractions
    displayAttractions(container);

    // Handle visitor message
    displayVisitorMessage(messageDiv);
});

/**
 * Display all attractions as cards in the grid
 */
function displayAttractions(container) {
    container.innerHTML = '';

    attractions.forEach((attraction, index) => {
        const gridArea = `area${index + 1}`;
        const card = createElement(attraction, gridArea);
        container.appendChild(card);
    });
}

/**
 * Create an attraction card element
 */
function createElement(attraction, gridArea) {
    const article = document.createElement('article');
    article.className = 'attraction-card';
    article.style.gridArea = gridArea;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = attraction.image;
    img.alt = attraction.name;
    img.loading = 'lazy';
    figure.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = attraction.name;

    const address = document.createElement('address');
    address.textContent = attraction.address;

    const description = document.createElement('p');
    description.textContent = attraction.description;

    const button = document.createElement('button');
    button.className = 'learn-more-btn';
    button.textContent = 'Learn More';
    button.setAttribute('aria-label', `Learn more about ${attraction.name}`);

    article.appendChild(figure);
    article.appendChild(h2);
    article.appendChild(address);
    article.appendChild(description);
    article.appendChild(button);

    return article;
}

/**
 * Display visitor message based on localStorage
 */
function displayVisitorMessage(messageDiv) {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    let message = '';

    if (!lastVisit) {
        // First visit
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = parseInt(lastVisit, 10);
        const timeDifference = now - lastVisitTime;
        const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysAgo === 0) {
            // Less than a day
            message = 'Back so soon! Awesome!';
        } else {
            // More than a day
            const dayText = daysAgo === 1 ? 'day' : 'days';
            message = `You last visited ${daysAgo} ${dayText} ago.`;
        }
    }

    // Display the message
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', 'status');
    messageDiv.setAttribute('aria-live', 'polite');

    // Store current visit time
    localStorage.setItem('lastVisit', now.toString());
}
