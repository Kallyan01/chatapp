const socket = io();

const sbtn = document.getElementById('sendbtn');
const messageInput = document.getElementById('chatbox')
const messageContainer = document.getElementById('txtmsg')
let inpbtn = document.getElementById('inpbtn');
let inpname = document.getElementById('inpname');
let nameBox = document.getElementById('ncont');
let nameWar = document.getElementById('warning');

const append = (name, message, position) => {
    const messageElement = document.createElement('div');
    const messageName = document.createElement('div');
    // const messageTime = document.createElement('div');
    messageName.innerText = name;
    messageElement.innerText = message;
    messageName.classList.add('msgname');
    messageElement.appendChild(messageName);
    messageElement.classList.add('messages');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const wlcmmsg = (name) => {
    const messageElement = document.createElement('div');
    const appearMsg = document.createElement('div');
    appearMsg.innerHTML = `${name} Joined The Chat`
    appearMsg.classList.add('appearmsg');
    // messageElement.appendChild(appearMsg);
    messageContainer.append(appearMsg);
}
sbtn.addEventListener('click', (e) => {
    const message = messageInput.value;
    if (message.length != 0) {
        append(`You`, `${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    }
})

// const name = prompt("Enter Your Name:");
function nameinput() {
        return inpname.value;
}
function nameErr()
{
    nameWar.style="opacity:100% !important;"
    setTimeout(() => {
        nameWar.style="opacity:0% !important;"   
    }, 2000);
}
console.log("hi")
inpbtn.addEventListener('click', async () => {
    if (nameinput().length > 0) {
        socket.emit('new-user-joined', await nameinput());
        nameBox.style = "display:none;"
        console.log(nameinput().length)
        socket.on('user-joined', name => {
            // append(" ",`${name} Joined the chat`,"right")
            wlcmmsg(name);
        })
        socket.on('receive', data => {
            append(`${data.name}:`, `${data.message} `, "left")
        })
    }
    else
    {
        nameErr();
    }
})
