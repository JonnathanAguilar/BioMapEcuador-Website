document.addEventListener('DOMContentLoaded', function() {
    const openLoginButton = document.getElementById('startGame');
    openLoginButton.addEventListener('click', function() {
        window.location.href = 'trivia.html';
    });
});
