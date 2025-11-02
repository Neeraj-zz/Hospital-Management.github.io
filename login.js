document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');
    if (username === 'admin' && password === 'admin123') {
        errorEl.textContent = '';
        window.location.href = 'structure.html';
    } else {
        errorEl.textContent = 'Invalid username or password!';
    }
}); 