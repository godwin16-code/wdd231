// directory.js
const membersContainer = document.querySelector('#members');
const gridViewBtn = document.querySelector('#grid-view');
const listViewBtn = document.querySelector('#list-view');

// Use scoped names to avoid redeclaration errors when multiple scripts run
const dirHamburger = document.querySelector('.hamburger');
const dirNav = document.querySelector('nav');

let members = [];
let isGridView = true;

// Hamburger menu toggle (robust: check elements and manage aria-expanded)
if (dirHamburger && dirNav) {
    // set initial aria state
    if (!dirHamburger.hasAttribute('aria-expanded')) {
        dirHamburger.setAttribute('aria-expanded', 'false');
    }

    dirHamburger.addEventListener('click', () => {
        dirNav.classList.toggle('open');
        const expanded = dirHamburger.getAttribute('aria-expanded') === 'true';
        dirHamburger.setAttribute('aria-expanded', String(!expanded));
    });

    // Close menu when a link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            dirNav.classList.remove('open');
            dirHamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

async function getMembers() {
    const response = await fetch('data/members.json');
    members = await response.json();
    displayMembers();
}

function displayMembers() {
    membersContainer.innerHTML = '';
    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add(isGridView ? 'member-card' : 'member-list');

        memberElement.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
            <p>${member.description}</p>
        `;

        membersContainer.appendChild(memberElement);
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

gridViewBtn.addEventListener('click', () => {
    isGridView = true;
    displayMembers();
});

listViewBtn.addEventListener('click', () => {
    isGridView = false;
    displayMembers();
});

// Set current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

getMembers();