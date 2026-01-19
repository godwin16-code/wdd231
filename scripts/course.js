// course.js - Handles course display and filtering

const courses = [
    { code: "CSE 110", name: "Introduction to Programming", credits: 3, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 3, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 3, completed: false },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
    { code: "WDD 231", name: "Frontend Web Development I", credits: 3, completed: false },
];

document.addEventListener('DOMContentLoaded', function() {
    const coursesContainer = document.getElementById('courses');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const creditsElement = document.getElementById('total-credits');

    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = '';
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            courseCard.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
            `;
            coursesContainer.appendChild(courseCard);
        });

        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditsElement.textContent = `Total Credits: ${totalCredits}`;
    }

    function filterCourses(filter) {
        let filtered;
        if (filter === 'all') {
            filtered = courses;
        } else if (filter === 'wdd') {
            filtered = courses.filter(course => course.code.startsWith('WDD'));
        } else if (filter === 'cse') {
            filtered = courses.filter(course => course.code.startsWith('CSE'));
        }
        displayCourses(filtered);
    }

    // Initial display
    displayCourses(courses);

    // Event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterCourses(filter);
        });
    });
});