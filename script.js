"strict";

/* 1. Variables*/
/* submit city form*/
const cityInput = document.getElementById("city-input");
const citySubmit = document.querySelector(".city-submit");

/* 1.1 open weather API*/
/* open weather API key*/
const openWeatherApiKey = "5ac0b29e5f43be93e21afe189ea88ade";

/* display the requested weather data */
const showCity = document.querySelector(".city");
const showTemperature = document.querySelector(".temperature-text");

/* 1.2 teleport API */
/* application background */
const appBackground = document.querySelector(".weather-app-background");

/* 1.3 living costs */
let dataCityAndCountry = "";
let cityArrayResult = "";
let submittedCountry = "";

/* 2. openWeather API */
/* request the weather data via the openweather API */
async function requestWeather() {
  /* change the url by adding the open weather api key */
  const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${openWeatherApiKey}`;
  const response = await fetch(openWeatherApiUrl);

  /* store the data as a json file */
  const data = await response.json();
  console.log(data);

  /* change the displayed city name*/
  showCity.innerHTML = data.name;

  /* convert temperature and round the number */
  const temperature = convertTemperature(data.main.temp);

  /* change the displayed temperature*/
  showTemperature.innerHTML = temperature;
}

/* convert Kelvin to Celsius */
const convertTemperature = function (temperatureKelvin) {
  const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
  return temperatureCelsius;
};

/* 3. Teleport API */
/* produce an image for the requested city */
async function requestCityImage() {
  /* replace all spaces and change the input to lowercase */
  const teleportApiUrl = `https://api.teleport.org/api/urban_areas/slug:${cityInput.value
    .replaceAll(" ", "-")
    .toLowerCase()}/images/`;

  const response = await fetch(teleportApiUrl);

  /* store the data as a json file */
  const data = await response.json();
  console.log(data);

  console.log(data.photos[0].image.web);
  /* change the background */
  /* store the web image */
  const imageWeb = data.photos[0].image.web;

  /* change the currently displayed background image for desktop*/
  appBackground.style.backgroundImage = `url('${imageWeb}')`;

  /* store the image for mobile */
  const imageMobile = data.photos[0].image.web;
}

/* 4. cost of living */

// const url = "https://cost-of-living-and-prices.p.rapidapi.com/cities";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "1e57bfef2amsh9231ede2da10ba7p180c79jsn8010f9c78bef",
//     "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
//   },
// };

// async function requestCostOfLiving() {
//   const response = await fetch(url, options);
//   const result = await response.text();
//   console.log(result);
// }

// requestCostOfLiving();
/* request country and city list to search for the corresponding country based on the submitted city */
const urlCountries = "https://cost-of-living-and-prices.p.rapidapi.com/cities";
const optionsCountries = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1e57bfef2amsh9231ede2da10ba7p180c79jsn8010f9c78bef",
    "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
  },
};

async function requestCityAndCountry() {
  const response = await fetch(urlCountries, optionsCountries);
  dataCityAndCountry = await response.json();
  console.log(dataCityAndCountry);
}

requestCityAndCountry();

/* function to find country based on city */
function findCityArray(city) {
  /* search for the city that was input by the user */
  return city.city_name === `${cityInput.value}`;
}

/* request costs */
async function requestCostOfLiving() {
  const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityInput.value}&country_name=${submittedCountry}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1e57bfef2amsh9231ede2da10ba7p180c79jsn8010f9c78bef",
      "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  console.log(data.prices);

  /* food */
  /* prices for fastfood */
  console.log(
    `the average price for a fastfood meal is ${data.prices[33].usd.avg}`
  );
  /* prices for mid-range restaurant */
  console.log(
    `the average price for a mid-range restaurant is ${data.prices[34].usd.avg}`
  );
  /* prices for cheap restaurant */
  console.log(
    `the average price for an inexpensive restaurant is ${data.prices[35].usd.avg}`
  );

  /* transport */
  /* prices for public transport */
  console.log(
    `the average price for a one-way local transport ticket is ${data.prices[42].usd.avg}`
  );
  /* prices for 1km taxi */
  console.log(`the average price for 1km taxi is ${data.prices[34].usd.avg}`);
  /* prices for 1 liter gasoline */
  console.log(
    `the average price for 1 liter gasoline is ${data.prices[44].usd.avg}`
  );
}

/* 5. Handle the form input */
/* submit the city name that was filled in by the user */
citySubmit.addEventListener("click", function (event) {
  /* disable form auto submit */
  event.preventDefault();

  /* search for the array that corresponds with the submitted city. this array needs to be found so the country that belongs to the submitted city can be stored and used to call the cost of living and prices api */
  cityArrayResult = dataCityAndCountry.cities.find(findCityArray);
  console.log(cityArrayResult);

  submittedCountry = cityArrayResult.country_name;
  console.log(submittedCountry);

  /* call the function that handles the openweather API */
  requestWeather();

  /* call the function that handles the teleport API to generate a city image */
  requestCityImage();

  /* call the function that handles the cost of living and prices API*/
  requestCostOfLiving();
  console.log(submittedCountry);
  console.log(cityInput.value);
});

/* plan of action */
/* information tables to include in the app */
/* 
1. weather in coming week
2. transportation costs 
3. eating costs
4. staying costs (apartment, hotel etc.)

optional
5. cost to get there (plane, car, train)
*/
