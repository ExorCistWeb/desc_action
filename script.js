var ws;
var username;
var email;
var chatMessages;  // Объявляем переменную в глобальной области видимости

function startChat(event) {
    event.preventDefault();
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    document.getElementById("user-form").style.display = "none";
    document.getElementById("message-input-container").style.display = "flex";
    document.getElementById("chat-messages").innerHTML += `<b class="chat_user">${username}:</b><div class="start_chat">Начал чат</div>`;
    connectWebSocket();
}

function connectWebSocket() {
    var cookie = 'some_cookie';
    ws = new WebSocket("ws://localhost:8000/chat/ws/" + cookie);
    ws.onmessage = function(event) {
        var currentTime = new Date().toLocaleTimeString();
        chatMessages.innerHTML += `<div class="message sent"><span class="timestamp">${currentTime}</span><span class="message-content"> ${event.data}</span></div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
}

function sendMessage() {
    var messageInput = document.getElementById("message-input").value;
    var messageData = {
        user_name: username,
        user_email: email,
        message: messageInput
    };

    if (messageInput.trim() !== "") {
        ws.send(JSON.stringify(messageData));
        document.getElementById("message-input").value = "";
    }
}

