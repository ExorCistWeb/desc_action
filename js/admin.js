let headers;
let mainDiv;
let currentUserEmail;
// Находим все элементы с классом 'answer-button'
// const answerButtons = document.querySelectorAll('.answer-button');

// // Проходим по каждому элементу с классом 'answer-button'
// answerButtons.forEach(button => {
//     // Добавляем обработчик события 'click' к текущему элементу
//     button.addEventListener('click', function() {
//         // Находим родительский элемент с классом 'message'
//         const messageContainer = this.closest('.message');

//         // Находим все элементы <p> внутри родительского элемента
//         const paragraphs = messageContainer.querySelectorAll('p');
//         currentUserEmail = paragraphs[1].textContent
//         console.log(currentUserEmail)
//     });
// });

// Находим родительский элемент, который существует на момент загрузки страницы
const messagesContainer = document.getElementById('messages');

// Добавляем обработчик события 'click' к родительскому элементу
messagesContainer.addEventListener('click', function(event) {
    // Проверяем, был ли клик на элементе с классом 'answer-button'
    if (event.target.classList.contains('answer-button')) {
        // Находим родительский элемент с классом 'message'
        const messageContainer = event.target.closest('.message');

        // Находим все элементы <p> внутри родительского элемента
        const paragraphs = messageContainer.querySelectorAll('p');
        const currentUserEmail = paragraphs[1].textContent;
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

