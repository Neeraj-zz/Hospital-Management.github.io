function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

document.getElementById('theme-toggle').addEventListener('click', function() {
    const isDark = !document.body.classList.contains('dark-mode');
    setTheme(isDark);
});

document.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('theme');
    setTheme(saved === 'dark');
}); 