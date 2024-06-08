document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageContainer = document.getElementById('messageContainer');

    const showMessage = (message, success = true) => {
        messageContainer.innerHTML = message;
        messageContainer.className = success ? 'alert alert-success' : 'alert alert-danger';
        messageContainer.classList.remove('hidden');
    };

    const showPopupMessage = (message) => {
        alert(message);
    };

    const API_URL = 'https://7541-31-223-3-72.ngrok-free.app/api/users/Loginuser';

    const extractErrorMessage = (text) => {
        const match = text.match(/Kullanıcı Bulunamadı/);
        return match ? match[0] : 'Bir hata oluştu';
    };

    const fetchData = (email, password) => {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true' // Ngrok uyarılarını geçmek için
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            return response.text().then(text => {
                try {
                    const data = JSON.parse(text);
                    if (response.status === 200) {
                        showPopupMessage('Giriş başarılı!');
                        console.log(response.status);
                        showMessage('', true);  // Ekranda herhangi bir bilgi gösterme
                        localStorage.setItem('loggedIn', 'true');
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 2000); // 2 saniye sonra yönlendir
                    } else if (response.status === 400) {
                        const errorMessage = data.message || extractErrorMessage(text);
                        showMessage(`<p><strong>Hata:</strong> ${errorMessage}</p>`, false);
                    } else {
                        const errorMessage = data.message || 'Bir hata oluştu.';
                        showMessage(`<p><strong>Hata:</strong> ${errorMessage}</p>`, false);
                    }
                } catch (error) {
                    console.error('Yanıt JSON formatına değil:', text);
                    const errorMessage = extractErrorMessage(text);
                    showMessage( errorMessage, false);
                }
            });
        })
        .catch(error => {
            console.error('POST isteği hatası:', error);
            showMessage('POST isteği başarısız oldu: ' + error.message, false);
        });
    };

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (email && password) {
            fetchData(email, password); // Form gönderildiğinde API'yi çağır
        } else {
            showMessage('Lütfen tüm alanları doğru şekilde doldurun.', false);
        }
    });

    const googleLoginButton = document.getElementById('googleLogin');
    googleLoginButton.addEventListener('click', () => {
        // Google OAuth Simülasyonu
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    });
});
