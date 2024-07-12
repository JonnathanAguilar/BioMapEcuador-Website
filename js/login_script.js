document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (username === 'admin' && password === 'admin123') {
        alert('¡Ingreso exitoso!');
        errorMessage.style.display = 'none';
    } else {
        errorMessage.textContent = '¡Usuario y/o contraseña incorrecto!';
        errorMessage.style.display = 'block';
    }
});
