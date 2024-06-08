document.addEventListener('DOMContentLoaded', () => {
    

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
        
        if (title === '' || content === '') {
            alert('Lütfen başlık ve metin girin.');
            return;
        }
        
        const uniqueId = Math.random().toString(36).substr(2, 9);
        const link = `${window.location.href}${uniqueId}`;
        
        pasteLink.value = link;
        pasteLinkContainer.classList.remove('hidden');
        
        // Display preview
        titlePreview.textContent = title;
        contentPreview.textContent = content;
        previewContainer.classList.remove('hidden');
        
        // Simulate storing the content to a server-side database (for demonstration purposes only)
        //console.log('Stored title:', title, 'Stored content:', content, 'with ID:', uniqueId);
        
        // Send GET request to JSONPlaceholder API
        const API_URL = "https://7b21-31-223-96-14.ngrok-free.app/api/Paste/GetPastes";

const makeRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true' 
      },
    });



    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }

};
makeRequest(API_URL);
    });

    // Copy link to clipboard
    copyLinkButton.addEventListener('click', () => {
        pasteLink.select();
        pasteLink.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        alert('Bağlantı kopyalandı: ' + pasteLink.value);
    });

    // Update preview on input
    pasteTitle.addEventListener('input', () => {
        titlePreview.textContent = pasteTitle.value;
    });

    pasteContent.addEventListener('input', () => {
        contentPreview.textContent = pasteContent.value;
    });
});
