const showData = document.getElementById('showData');
const result_screen = document.getElementById('result_screen');
const result_geoposition = document.getElementById('result_geoposition');

const error = () => {
    result_geoposition.textContent = 'Невозможно получить ваше местоположение';
};

const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    result_geoposition.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

showData.addEventListener('click', () => {
    result_screen.textContent = `Ширина экрана - ${screen.width}, высота экрана - ${screen.height}`;

    if (!navigator.geolocation) {
        result_geoposition.textContent = 'Информация о местоположении недоступна';
    } else {
        result_geoposition.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});



