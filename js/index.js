let ws;
let username;
let email;
let chatMessages; // Объявляем переменную в глобальной области видимости

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
    ws = new WebSocket("ws://localhost:8000/chat/ws/" + email);
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
    // Запрос на сервер за последними сообщениями пользователя
    try {
        const offset = 0;
        fetch(`http://127.0.0.1:8000/chat/user_last_messages/?user_email=${email}&offset=${offset}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обработка полученных данных
            messages = data.data
            console.log(data.data); // Вывод полученных данных в консоль для проверки
            // const chatMessages = document.getElementById("chat-messages");
            chatMessages = document.getElementById("chat-messages");
            messages.forEach(element => {
                if (element[1] == 'user'){
                    chatMessages.innerHTML += `<div class="message sent"><span class="message-content">${username}: ${element[0]}</span></div>`;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                else{
                    chatMessages.innerHTML += `<div class="message sent"><span class="message-content"">Тех.поддержка: ${element[0]}</span></div>`;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                
            });
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    
    } catch (error) {
        console.error('Error fetching last messages:', error);
    }
    
});