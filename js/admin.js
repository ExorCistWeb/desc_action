let headers;
let mainDiv;
let currentUserEmail;
const messagesContainer = document.getElementById('messages');
const userEmail = document.querySelector('.user-email-answer')
const sendMessageButton = document.getElementById('send-message')

// Находим родительский элемент, который существует на момент загрузки страницы

// Добавляем обработчик события 'click' к родительскому элементу
messagesContainer.addEventListener('click', function(event) {
    // Проверяем, был ли клик на элементе с классом 'answer-button'
    if (event.target.classList.contains('answer-button')) {
        // Находим родительский элемент с классом 'message'
        const messageContainer = event.target.closest('.message');

        // Находим все элементы <p> внутри родительского элемента
        const paragraphs = messageContainer.querySelectorAll('p');
        currentUserEmail = paragraphs[1].textContent;
        userEmail.textContent = `Ответь на сообщение пользователя ${currentUserEmail}`
        console.log(currentUserEmail);
    }
});


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener("DOMContentLoaded", function() {
    // Получаем значение токена из куки
    const token = getCookie("auth_token");

    // Создаем объект Headers и добавляем в него заголовок Authorization
    headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    try {
        const offset = 0;
        fetch(`http://127.0.0.1:8000/admin/last_message/?offset=${offset}`, { 
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обработка полученных данных
            let messages = data['data']
            mainDiv = document.getElementById('messages')
            if (messages.length > 0){
                messages.forEach(element => {
                    if (element[2] == 'user'){
                        mainDiv.innerHTML += `<div class= "message"><p class="answer-button">Ответить </p> <p>${element[0]}</p> <p>${element[1]}</p> </div>`
                    }
                    else{
                        mainDiv.innerHTML += `<div class="admin-message"> <p>Ответ пользователю: ${element[0]}</p> <p>Сообщение: ${element[1]}</p> </div>`
                    }
                });
            }

        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    
    } catch (error) {
        console.error('Error fetching last messages:', error);
    }


    connectToWebSocket()
});

function connectToWebSocket(){
    // /ws/admin/{user_email}
    ws = new WebSocket("ws://localhost:8000/chat/ws/admin/" + "admin@mail.ru");
    ws.onmessage = function(event) {
        mainDiv = document.getElementById('messages')
        const user_message = JSON.parse(event.data)
        console.log(user_message)
        // user_message.user_email user_message.message
        mainDiv.innerHTML += `<div class= "message"><p class="answer-button">Ответить </p> <p>${user_message.user_email}</p> <p>${user_message.message}</p> </div>`
        
    };
}
sendMessageButton.addEventListener('click', function(){
    if (!currentUserEmail){
        return;
        document.getElementById('message-input').value = ""
    }
    let messageInput = document.getElementById('message-input').value;
    let messageData = {
        'message': messageInput,
        'user_email': currentUserEmail
    }
    ws.send(JSON.stringify(messageData))
    document.getElementById('message-input').value = ""
    mainDiv.innerHTML += `<div class="admin-message"> <p>Ответ пользователю: ${currentUserEmail}</p> <p>Сообщение: ${messageInput}</p> </div>`
    userEmail.textContent = ""
})


function testClick(){
    // Выполняем GET запрос с заголовком Authorization
    fetch('http://127.0.0.1:8000/auth/users/me', {
    method: 'GET',
    headers: headers
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    console.log(data);
    })
    .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
    });
}

