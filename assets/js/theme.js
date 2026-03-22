// theme.js
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    // If body class wasn't added because body didn't exist yet, add it now
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;
    
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Set initial icon based on theme
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.className = 'fa-solid fa-moon';
    } else {
        themeIcon.className = 'fa-solid fa-sun';
    }
    
    themeToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });
});
