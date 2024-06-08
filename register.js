document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const messageContainer = document.getElementById('messageContainer');

    const showMessage = (message, success = true) => {
        messageContainer.innerHTML = message;
        messageContainer.className = success ? 'alert alert-success' : 'alert alert-danger';
        messageContainer.classList.remove('hidden');
    };

    const showPopupMessage = (message) => {
        alert(message);
    };

    const API_URL = 'https://7541-31-223-3-72.ngrok-free.app/api/users/SignUpUser';

    const fetchData = (email, password, passwordConfirm) => {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true' // Ngrok uyarılarını geçmek için
            },
            body: JSON.stringify({
                email: email,
                password: password,
                passwordConfirm: passwordConfirm
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json().then(data => {
                    showPopupMessage('Kayıt başarılı!');
                    console.log(response.status);
                    showMessage('', true);  // Ekranda herhangi bir bilgi gösterme
                });
            } else if (response.status === 400) {
                return response.json().then(data => {
                    const errorMessage = `
                        <p><strong>Hata:</strong> ${data.message}</p>
                    `;
                    showMessage(errorMessage, false);
                });
            } else {
                return response.json().then(data => {
                    const errorMessage = `
                        <p><strong>Title:</strong> ${data.title}</p>
                    `;
                    showMessage(errorMessage, false);
                });
            }
        })
        .catch(error => {
            console.error('POST isteği hatası:', error);
            showMessage('POST isteği başarısız oldu: ' + error.message, false);
        });
    };

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('newPassword').value.trim();
        const passwordConfirm = document.getElementById('confirmPassword').value.trim();
        
        if (email && password && password === passwordConfirm) {
            fetchData(email, password, passwordConfirm); // Form gönderildiğinde API'yi çağır
        } else {
            showMessage('Lütfen tüm alanları doğru şekilde doldurun ve şifrelerinizin eşleştiğinden emin olun.', false);
        }
    });

    const googleRegisterButton = document.getElementById('googleRegister');
    googleRegisterButton.addEventListener('click', () => {
        // Google OAuth Simülasyonu
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
    });
});
