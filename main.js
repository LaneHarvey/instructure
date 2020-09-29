const today = new Date();

const options = { month: 'numeric', day: 'numeric' };

const month = today.toLocaleString('default', { month: 'long' });
const weekday = today.getDate();
const numericDay = today.toLocaleDateString('default', options)

switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}


const getOrdinalNum = (number) => {
    let selector;
  
    if (number <= 0) {
      selector = 4;
    } else if ((number > 3 && number < 21) || number % 10 > 3) {
      selector = 0;
    } else {
      selector = number % 10;
    }
  
    return number + ['th', 'st', 'nd', 'rd', ''][selector];
};

const time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

console.log(time)

const clock = document.querySelector(".clock");
const numericDate = document.querySelector(".numeric-date")
const date = document.querySelector(".date");

clock.innerHTML = time;
numericDate.innerHTML = numericDay;
date.innerHTML = `${day}, ${month} ${getOrdinalNum(weekday)}`;

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

fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=GOOG%252CMSFT%252CAAPL&region=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
		"x-rapidapi-key": "a85a621d12msh71817779011baebp116b04jsn64dbd3163c33"
	}
})
.then(response => {
    return response.json();
}).then(data => {
	document.querySelector(".AAPL").innerHTML = (`AAPL $${data.quoteResponse.result[2].regularMarketPrice} <span>&#8593;</span>`);
	document.querySelector(".GOOG").innerHTML = (`GOOG $${data.quoteResponse.result[0].regularMarketPrice} <span>&#8593;</span>`);
  document.querySelector(".MSFT").innerHTML = (`MSFT $${data.quoteResponse.result[1].regularMarketPrice} <span>&#8593;</span>`);
})
.catch(err => {
	console.log(err);
});