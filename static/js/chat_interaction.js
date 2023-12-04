document.addEventListener("DOMContentLoaded", function() {
    const messageSection = document.querySelector('.messages');
    const messagesList = document.querySelector('.imessage');
    const newMessage = document.createElement('p');

    newMessage.classList.add('from-chat');

    newMessage.innerHTML = `Hola, ¿En qué te podemos ayudar?`;
    messagesList.appendChild(newMessage);
});

function addMessageToList(sender, messageText, isUser) {
    const messageSection = document.querySelector('.messages');
    const messagesList = document.querySelector('.imessage');
    const newMessage = document.createElement('p');
    if(isUser){
        newMessage.classList.add('from-me');
    }else{
        newMessage.classList.add('from-chat');
    }
    // newMessage.innerHTML = `<strong>${sender}:</strong> ${messageText}`;
    newMessage.innerHTML = `${messageText}`;
    messagesList.appendChild(newMessage);
    messageSection.scrollTop = messageSection.scrollHeight;
}

document.querySelector('.input-field').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('.send-button').click();
    }
});

document.querySelector('.send-button').addEventListener('click', function() {
    const inputField = document.querySelector('.input-field');
    const message = inputField.value;
    folder = actualCheckbox;
    chatbotResponse = "Default";

    if (message) {
        addMessageToList('You', message, 1);
        inputField.value = '';
        console.log(folder)
        
        fetch('/chat_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `user_message=${encodeURIComponent(message)}
                    &folder_location=${encodeURIComponent(folder)}`,
        })
        .then(response => response.text())
        .then(data => {
            chatbotResponse = data;
            addMessageToList('Chatbot', chatbotResponse, 0);
            // console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }
});

document.getElementById('toggleButton').addEventListener('click', function() {
    var sidePanel = document.querySelector('.side-panel');
    var currentDisplayStyle = window.getComputedStyle(sidePanel).display;
    sidePanel.style.display = (currentDisplayStyle === 'none') ? '' : 'none';
});

const checkboxes = document.querySelectorAll('.checkbox-list input[type="checkbox"]');
actualCheckbox = "Ingenieria";

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            actualCheckbox = checkbox.value;
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});
