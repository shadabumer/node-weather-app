console.log('app.js file loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = 'Just a moment!';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = '';
            messageTwo.textContent = '';
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data.Location);
                console.log(data.message);
                messageOne.textContent = data.Location;
                messageTwo.textContent = data.message;
            }
        });
    });
});