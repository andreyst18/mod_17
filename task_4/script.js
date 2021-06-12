const showData = document.getElementById('showData');
const result = document.getElementById('result');

const error = () => {
    console.log('Невозможно получить ваше местоположение');
};

const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            result.innerHTML = `<p>Временная зона, в которой находится пользователь: ${data['timezone']}</p>
                                <p>Местные дата и время: ${data['date_time_txt']}</p>`;
        })
        .catch(() => {
            console.log('error');
        });
}

showData.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log('Информация о местоположении недоступна');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});



