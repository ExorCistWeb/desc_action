document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    const formData = new FormData(this); // Получаем данные формы

    const response = await fetch(this.action, {
        method: this.method,
        body: formData
    });

    const data = await response.json(); // Преобразуем ответ в JSON

    console.log(data); // Выводим полученный JSON в консоль
    document.cookie = `auth_token=${data['access_token']}; path=/`
    window.location.href="admin-chat.html"
});
