const wsUri = 'wss://echo.websocket.org/';

const inputMessage = document.getElementById('inputMessage');
const sendMessage = document.getElementById('input_area_btn');
const outputArea = document.getElementById('messages_area');

let websocket;
websocket = new WebSocket(wsUri);

websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };

sendMessage.addEventListener('click', () => {
    const message = inputMessage.value;
    inputMessage.value = '';
    writeToScreen('<span class="message">' + message + '</span>', false);
    websocket.send(message);
    websocket.onmessage = function() {
        writeToScreen('<span class="message">' + message + '</span>', true);
    };
          
});

function writeToScreen(message, isServer) {
    let item = document.createElement('p');
    item.className = isServer ? 'serverMessage' : 'userMessage';
    item.innerHTML = message;
    outputArea.appendChild(item);
}