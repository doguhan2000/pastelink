document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (username === 'admin' && password === 'password') { // Basit doğrulama
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Geçersiz kullanıcı adı veya şifre');
        }
    });

    const googleLoginButton = document.getElementById('googleLogin');
    googleLoginButton.addEventListener('click', () => {
        // Google OAuth Simülasyonu
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    });
});
