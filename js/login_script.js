document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (username === 'admin' && password === 'admin123') {
        alert('Login successful!');
        errorMessage.style.display = 'none';
        // Redirect or perform any action on successful login
    } else {
        errorMessage.textContent = 'Invalid username or password!';
        errorMessage.style.display = 'block';
    }
});
