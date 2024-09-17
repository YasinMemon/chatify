const socket = io('http://localhost:8000');

const form = document.getElementById('form');
const input = document.getElementById('input');
const arena = document.querySelector(".arena");

var audio = new Audio('../sounds/ting.mp3');

function append(message, position){
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    arena.append(messageElement);
    if(position === 'left'){
        audio.play();
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = input.value;
    append(`You: ${msg}`, 'right');
    socket.emit('send', msg);
    input.value = '';
})

const name = prompt("Enter your name to join");
socket.emit("newUserJoined", name);

socket.on("user-joined", name => {
    append(`${name} joined the chat`,'right');
});

socket.on("receieve", data => {
    append(`${data.name} : ${data.message}`,'left');
});

socket.on("left", name => {
    append(`${name} left the group`, "left");
})