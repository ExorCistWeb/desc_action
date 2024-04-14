try {
    fetch(`http://127.0.0.1:8000/chat/last_message/?user_email=qwe@qwe`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
} catch (error) {
    console.error('Error fetching last messages:', error);
}