let ws;
let username;
let email;
let chatMessages;  // Объявляем переменную в глобальной области видимости

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
    let cookie = 'some_cookie';
    ws = new WebSocket("ws://localhost:8001/chat/ws/" + cookie);
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
