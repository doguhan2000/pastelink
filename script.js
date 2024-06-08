document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const pasteForm = document.getElementById('pasteForm');
  const pasteTitle = document.getElementById('pasteTitle');
  const pasteContent = document.getElementById('pasteContent');
  const pasteLinkContainer = document.getElementById('pasteLinkContainer');
  const pasteLink = document.getElementById('pasteLink');
  const copyLinkButton = document.getElementById('copyLinkButton');
  const previewContainer = document.getElementById('previewContainer');
  const titlePreview = document.getElementById('titlePreview');
  const contentPreview = document.getElementById('contentPreview');

  const API_URL = 'https://7541-31-223-3-72.ngrok-free.app/api/Paste/Createpaste';

  // Toggle theme
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
          themeIcon.src = 'sun-icon.png';
          themeIcon.alt = 'Açık Tema';
      } else {
          themeIcon.src = 'moon-icon.png';
          themeIcon.alt = 'Koyu Tema';
      }
  });

  // Handle form submission
  pasteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const title = pasteTitle.value.trim();
      const content = pasteContent.value.trim();
      const privacy = document.querySelector('input[name="privacy"]:checked').value;
      const expiration = document.querySelector('input[name="expiration"]:checked').value;
      
      if (title === '' || content === '') {
          alert('Lütfen başlık ve metin girin.');
          return;
      }

      const payload = {
          title: title,
          content: content,
          privacy: privacy,
          expiration: expiration
      };
      
      fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true' // Ngrok uyarılarını geçmek için
          },
          body: JSON.stringify(payload)
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then(data => {
                  throw new Error(data.message || 'Sunucu hatası');
              });
          }
          return response.json();
      })
      .then(data => {
          const link = `${window.location.href}${data.id}`;
          pasteLink.value = link;
          pasteLinkContainer.classList.remove('hidden');
          
          
          titlePreview.textContent = title;
          contentPreview.textContent = content;
          previewContainer.classList.remove('hidden');
          
          showPopupMessage('Başarıyla kaydedildi!');
      })
      .catch(error => {
          console.error('POST isteği hatası:', error);
          showMessage('POST isteği başarısız oldu: ' + error.message, false);
      });
  });

  // Copy link to clipboard
  copyLinkButton.addEventListener('click', () => {
      pasteLink.select();
      pasteLink.setSelectionRange(0, 99999); // For mobile devices
      document.execCommand('copy');
      alert('Bağlantı kopyalandı: ' + pasteLink.value);
  });

  
  pasteTitle.addEventListener('input', () => {
      titlePreview.textContent = pasteTitle.value;
  });

  pasteContent.addEventListener('input', () => {
      contentPreview.textContent = pasteContent.value;
  });

  const showPopupMessage = (message) => {
      alert(message);
  };

  const showMessage = (message, success = true) => {
      const messageContainer = document.getElementById('messageContainer');
      if (!messageContainer) {
          const newMessageContainer = document.createElement('div');
          newMessageContainer.id = 'messageContainer';
          newMessageContainer.className = success ? 'alert alert-success' : 'alert alert-danger';
          newMessageContainer.innerHTML = message;
          document.body.insertBefore(newMessageContainer, document.body.firstChild);
      } else {
          messageContainer.innerHTML = message;
          messageContainer.className = success ? 'alert alert-success' : 'alert alert-danger';
          messageContainer.classList.remove('hidden');
      }
  };
});
