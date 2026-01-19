// navigation.js - Handles responsive navigation menu

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('open');
        // Toggle hamburger icon
        if (nav.classList.contains('open')) {
            hamburger.innerHTML = '&#10005;'; // X
        } else {
            hamburger.innerHTML = '&#9776;'; // Hamburger
        }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('open');
            hamburger.innerHTML = '&#9776;'; // Reset to hamburger
        }
    });

    nav.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            nav.classList.remove('open');
            hamburger.innerHTML = '&#9776;'; // Reset to hamburger
        }
    });
});