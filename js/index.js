let ws;
let username;
let email;
let chatMessages; // Объявляем переменную в глобальной области видимости
let star_number;
const reviewButton = document.getElementById('reviewButton')
const reviewForm = document.getElementById('review-window')
const closeButton = document.getElementById('close-button')
const reviewText = document.getElementById('review-text')


const formData = document.getElementById('main-form')
formData.addEventListener('submit', function(event){
    // Убираем стандартное поведение формы
    event.preventDefault();
    const jsonn = {
        "user_name": username,
        "user_email": email,
        "user_reviews": reviewText.value,
        "user_star_rating": star_number
    }
    
    console.log(jsonn)
    fetch(formData.action, {
        method: "POST",
        body: JSON.stringify(jsonn),
        headers: {
            "Content-Type": "application/json" // Указываем тип контента как application/json
        },
    })
    .then(response => {
        if (response.ok){
            return response.text()
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
})

const stars = document.querySelectorAll('.yellow-star');

stars.forEach(star => {
    star.addEventListener('click', function (event) {
        // Ваш обработчик клика здесь
        star_number = Array.from(stars).indexOf(event.target) + 1
        for(let i = 0; i < stars.length; i++){
            stars[i].style.color = 'black'
        }
        console.log(star_number)
        for(let i = 0; i < star_number; i++){
            stars[i].style.color = 'yellow'
        }

    });
});



reviewButton.addEventListener('click', function(){
    reviewForm.style.display = 'block';
})
closeButton.addEventListener('click', function(){
    reviewForm.style.display = 'none'
})
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
                    chatMessages.innerHTML += `<div class="message sent"><span class="message-content"">Тех.поддержка:${element[0]}</span></div>`;
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