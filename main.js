const today = new Date();
const time = (today.getHours() % 12) + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes();

const clock = document.querySelector(".clock");
clock.innerHTML = time;

let currentCondition;
let currentTemp;
let currentTempIcon

const url = 'http://api.weatherapi.com/v1/current.json?key=0a3fb8be05f748b99d5223448202609&q=Ogden';
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    currentCondition = data.current.condition.text;
    currentTemp = data.current.temp_f;
    currentConditionIcon = data.current.condition.icon;
    const weather = document.querySelector(".current-weather");
    weather.innerHTML = `${currentCondition}`;
    const temp = document.querySelector(".current-temp");
    temp.innerHTML = `
        <img src="${currentConditionIcon}"></img>
        ${currentTemp}°
    `;
});