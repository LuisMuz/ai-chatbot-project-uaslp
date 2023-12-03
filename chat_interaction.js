function addMessageToList(sender, messageText, isUser) {
    const messagesList = document.querySelector('.imessage');
    const messageSection = document.querySelector('.messages');
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

    if (message) {
        addMessageToList('You', message, 1);
        inputField.value = '';
        
        // Here is where you would send the message to the chatbot server and retrieve the response
        // For example purposes, let's simulate a chatbot response using a timeout
        setTimeout(function() {
        const chatbotResponse = 'This is a chatbot response to your message.';
        addMessageToList('Chatbot', chatbotResponse, 0);
        }, 500);
    }
});

document.getElementById('toggleButton').addEventListener('click', function() {
    var sidePanel = document.querySelector('.side-panel');
    var currentDisplayStyle = window.getComputedStyle(sidePanel).display;
    sidePanel.style.display = (currentDisplayStyle === 'none') ? '' : 'none';
});