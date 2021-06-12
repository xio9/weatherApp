const key = '90323f40115ed8a6cd91bce45d2aa58d';
const btnGo = document.querySelector('.add-city');
const container = document.querySelector('.container');
const cityСard = document.querySelector('.city-card');

async function fetchAPI(location) {
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}

async function weatherApp(location){
  const data = await fetchAPI(location);
  generateCard(data);
}

function generateCard(data){
  const cityName = data.location.name;
  const status = data.current.weather_descriptions.map(item => item).join('');
  const currTemp = data.current.temperature;
  const cloudCover = data.current.cloudcover;
  const feelsLike = data.current.feelslike;
  const localTime = data.location.localtime;
  const wind = data.current.wind_speed;
  const icon = data.current.weather_icons[0];
  const card = `
    <h2 class="city-name">${cityName}</h2>
    <h3 class="temp-name">${status}</h3>
    <img src="${icon}" alt="">
    <div class="city-info">
      <span class="temp">Температура: ${currTemp}</span>
      <span class="vis">Облачность: ${cloudCover}</span>
      <span class="feelsLike">Ощущается как: ${feelsLike}</span>
      <span class="feelsLike">Скорость ветра: ${wind}</span>
      <span class="localTime">Местное время: ${localTime}</span>
    </div>
  `;
  cityСard.innerHTML = card;
}

btnGo.addEventListener('click', () => {
  const location = document.querySelector('.city-input').value;
  weatherApp(location);
});
