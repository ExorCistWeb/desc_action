let ws;
let username;
let email;
let chatMessages; // Объявляем переменную в глобальной области видимости

document.addEventListener("DOMContentLoaded", function() {
    var animatedElements = document.querySelectorAll(".animated");

    animatedElements.forEach(function(element) {
        element.classList.add("animate");
    });
});


function startChat(event) {
    event.preventDefault();
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
   // Сохраняем введенные данные в localStorage
   localStorage.setItem('username', username);
   localStorage.setItem('email', email);
   document.getElementById("user-form").style.display = "none";
   document.getElementById("message-input-container").style.display = "flex";
   document.getElementById("chat-messages").innerHTML += `<b class="chat_user">${username}:</b><div class="start_chat">Начал чат</div>`;
   connectWebSocket();
}

function connectWebSocket() {
    let cookie = 'some_cookie';
    ws = new WebSocket("ws://localhost:8001/chat/ws/");
    ws.onmessage = function(event) {
        let currentTime = new Date().toLocaleTimeString();
        chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML += `<div class="message sent"><span class="timestamp">${currentTime}</span><span class="message-content">${event.data}</span></div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
}

function sendMessage() {
    let messageInput = document.getElementById("message-input").value;
    let messageData = {
        user_name: username,
        user_email: email,
        message: messageInput
    };

    if (messageInput.trim() !== "") {
        ws.send(JSON.stringify(messageData));
        document.getElementById("message-input").value = "";
    }
}
document.getElementById("toggle-chat-btn").addEventListener("click", function() {
    var chatContainer = document.getElementById("chat-container");
    if (chatContainer.style.display === "none") {
        chatContainer.style.display = "block";
    } else {
        chatContainer.style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", function() {
    var animatedElements = document.querySelectorAll(".animated");

    animatedElements.forEach(function(element) {
        element.classList.add("animate");
    });

    // При загрузке страницы проверяем, есть ли сохраненные данные в localStorage
    const savedUsername = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('email');

    if (savedUsername && savedEmail) {
        username = savedUsername;
        email = savedEmail;
        document.getElementById("user-form").style.display = "none";
        document.getElementById("message-input-container").style.display = "flex";
        document.getElementById("chat-messages").innerHTML += `<b class="chat_user">${username}:</b><div class="start_chat">Начал чат</div>`;
        connectWebSocket();
    }

    // Создание объекта с данными для запроса
    const requestData = {
        user_email: "example@example.com" // Ваш email пользователя
    };
    
    // Опции запроса
    const requestOptions = {
        method: 'POST', // Метод запроса
        headers: {
        'Content-Type': 'application/json' // Установка типа содержимого как JSON
        },
        body: JSON.stringify(requestData) // Преобразование объекта с данными в JSON строку и передача в тело запроса
    };
    
    // Отправка запроса на сервер
    fetch('http://127.0.0.1:8000/chat/last_message/', requestOptions)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        console.log('Ответ:', data.data);
        messages = data.data
        chatMessages = document.getElementById("chat-messages");
        messages.forEach(element => {
            let currentTime = new Date().toLocaleTimeString(); // Определение времени
            chatMessages.innerHTML += `<div class="message sent"><span class="timestamp">${currentTime}</span><span class="message-content">${element}</span></div>`;
        });
        })
        .catch(error => {
        console.error('Ошибка:', error);
        });
  

});