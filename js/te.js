fetch('http://127.0.0.1:8000/chat/last_message/some_cookie')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Ответ:', data.data);
    messages = data.data
    messages.forEach(element => {
        // let currentTime = new Date().toLocaleTimeString(); // Определение времени
        // chatMessages.innerHTML += `<div class="message sent"><span class="timestamp">${currentTime}</span><span class="message-content">${element}</span></div>`;
        console.log(element)
    });
})
.catch(error => {
    console.error('Ошибка:', error);
});
