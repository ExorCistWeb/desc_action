document.getElementById('loginForm').addEventListener('submit', async function(event) {
     event.preventDefault(); // Отменяем стандартное поведение формы

    const formData = new FormData(this); // Получаем данные формы
    const errorMessage = document.getElementById('error-msg')

    const response = await fetch(this.action, {
        method: this.method,
        body: formData
    });
    if (response.status == 401){
        errorMessage.style.display = 'block';
        return;
    }
    const data = await response.json(); // Преобразуем ответ в JSON
    console.log(data); // Выводим полученный JSON в консоль
    document.cookie = `auth_token=${data['access_token']}; path=/`
    window.location.href="admin-chat.html"
});
