const wsUri = 'wss://echo.websocket.org/';

const inputMessage = document.getElementById('inputMessage');
const sendMessage = document.getElementById('input_area_btn');
const sendGeo = document.getElementById('input_geo');
const outputArea = document.getElementById('messages_area');

let message;
let isGeo;

let websocket;
websocket = new WebSocket(wsUri);

websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };

websocket.onmessage = function() {
    if (!isGeo) {
        writeToScreen('<span class="message">' + message + '</span>', true);
    }
};

sendMessage.addEventListener('click', () => {
    isGeo = false;
    message = inputMessage.value;
    inputMessage.value = '';
    writeToScreen('<span class="message">' + message + '</span>', false);
    websocket.send(message);
});

sendGeo.addEventListener('click', () => {
    isGeo = true;
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const coords = position;
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            websocket.send(latitude, longitude);
            writeToScreen('<span class="message">' + `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blanck">Гео-локация</a>` + '</span>', false)
        })
    }
});

function writeToScreen(message, isServer) {
    let item = document.createElement('p');
    item.className = isServer ? 'serverMessage' : 'userMessage';
    item.innerHTML = message;
    outputArea.appendChild(item);
}