document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const openLoginButton = document.getElementById('openLogin');
    openLoginButton.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
});
