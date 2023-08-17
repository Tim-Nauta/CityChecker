"strict";

/* 1. Variables*/
/* submit city form*/
const cityInput = document.getElementById("city-input");
const citySubmit = document.querySelector(".city-submit");
let capitalizedCityInput = "";

/* container classes */
/* these classes are used to transition to the main container */
const mainContainer = document.querySelector(".main-app-container");
const costOverview = document.querySelector(".costs-overview");
const introHeading = document.querySelector(".intro-heading");
const mainAppBackground = document.querySelector(".main-app-background");
const mainAppOverlay = document.querySelector(".main-app-overlay");

/* 1.1 open weather API*/
/* open weather API key*/
const openWeatherApiKey = "83f6d058a9249986fc56c3821fe9a562";
const openWeatherApiKeyOld = "5ac0b29e5f43be93e21afe189ea88ade";

/* display the requested weather data */
const showCity = document.querySelector(".city");
const showTemperature = document.querySelector(".temperature-text");

/* display weather forecast */
const forecastTomorrow = document.querySelector(".forecast-text-tomorrow");
const forecast2Days = document.querySelector(".forecast-text-2days");
const forecast3Days = document.querySelector(".forecast-text-3days");
const forecast4Days = document.querySelector(".forecast-text-4days");

/* display weather forecast date */
const forecastTomorrowDate = document.querySelector(".forecast-date-tomorrow");
const forecast2DaysDate = document.querySelector(".forecast-date-2days");
const forecast3DaysDate = document.querySelector(".forecast-date-3days");
const forecast4DaysDate = document.querySelector(".forecast-date-4days");

/* 1.2 teleport API */
/* application background */
const appBackground = document.querySelector(".main-app-background");

/* 1.3 living costs */
let dataCityAndCountry = "";
let cityArrayResult = "";
let submittedCountry = "";

/* elements that display the costs*/
const taxiPrices = document.querySelector(".taxi-costs-number");
const publicTransportPrices = document.querySelector(
  ".public-transport-costs-number"
);
const gasolinePrices = document.querySelector(".gasoline-costs-number");
const fastfoodPrices = document.querySelector(".fastfood-costs-number");
const inexpensiveRestaurantPrices = document.querySelector(
  ".inexpensive-restaurant-costs-number"
);
const midRangeRestaurantPrices = document.querySelector(
  ".mid-range-restaurant-costs-number"
);
const apartmentPrices = document.querySelector(".apartment-costs-number");
const rentingPrices = document.querySelector(".renting-costs-number");
const utilitiesPrices = document.querySelector(".utilities-costs-number");

/* 1.4 currency exchange USD to EUR */
let usdToEurExchangeRate = "";

/* 2. openWeather API */

/* convert Kelvin to Celsius */
const convertTemperature = function (temperatureKelvin) {
  const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
  return temperatureCelsius;
};

/* request the weather data via the openweather API */
async function requestWeather() {
  /* change the url by adding the open weather api key */
  const openWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalizedCityInput}&appid=${openWeatherApiKey}`;
  const response = await fetch(openWeatherApiUrl);

  /* store the data as a json file */
  const data = await response.json();
  console.log(data);

  /* change the displayed city name*/
  showCity.innerHTML = data.name;

  /* convert temperature and change the displayed temperature*/
  showTemperature.innerHTML = convertTemperature(data.main.temp);
}

// /* 2.1 openWeather Statistical Weather Data API */
// async function requestStatisticalWeather2() {
//   /* change the url by adding the open weather api key */
//   const openWeatherStatisticalApiUrl = `history.openweathermap.org/data/2.5/aggregated/year?lat=${geolocationLat}&lon=${geolocationLon}&appid=${openWeatherApiKey}`;
//   const response = await fetch(openWeatherStatisticalApiUrl);

//   /* store the data as a json file */
//   const data = await response.json();
//   console.log(data);

//   /* change the displayed city name*/
//   // showCity.innerHTML = data.name;

//   /* convert temperature and round the number */
//   const temperature = convertTemperature(data.main.temp);

//   /* change the displayed temperature*/
//   // showTemperature.innerHTML = temperature;
// }

/* 2.1 openWeather Statistical Weather Data API */
async function requestForecastWeather() {
  /* urls to request the geocoding and open weather statisitcal API. the open weather forecast API requires the response from the geocoding API to function */
  const openWeatherGeocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${capitalizedCityInput}&limit=${1}&appid=${openWeatherApiKey}`;

  /* request geocoding data */
  const responseGeocoding = await fetch(openWeatherGeocodingApiUrl);

  /* store the geocoding data as a json file */
  const dataGeocoding = await responseGeocoding.json();
  console.log(dataGeocoding);

  /* request open weather forecast data */
  const openWeatherForecastApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${dataGeocoding[0].lat}&lon=${dataGeocoding[0].lon}&appid=${openWeatherApiKey}`;

  const responseForecastWeather = await fetch(openWeatherForecastApiUrl);

  /* store the forecast data as a json file */
  const dataForecastWeather = await responseForecastWeather.json();
  console.log(dataForecastWeather);

  /* convert the temperature from Kelvin to Celsius and then display the forecast data in the weather forecast container */
  forecastTomorrow.innerHTML = convertTemperature(
    dataForecastWeather.list[8].main.temp
  );
  forecast2Days.innerHTML = convertTemperature(
    dataForecastWeather.list[16].main.temp
  );
  forecast3Days.innerHTML = convertTemperature(
    dataForecastWeather.list[24].main.temp
  );
  forecast4Days.innerHTML = convertTemperature(
    dataForecastWeather.list[32].main.temp
  );
}

/* set the days for the weather forecast */
const today = new Date();
const tomorrow = new Date(today);
const twoDays = new Date(today);
const threeDays = new Date(today);
const fourDays = new Date(today);

tomorrow.setDate(today.getDate() + 1);
twoDays.setDate(today.getDate() + 2);
threeDays.setDate(today.getDate() + 3);
fourDays.setDate(today.getDate() + 4);

/* convert date to string and get the first three letters to display the date */
const todaySubstring = today.toString().substring(0, 3);
const tomorrowSubstring = tomorrow.toString().substring(0, 3);
const twoDaysSubstring = twoDays.toString().substring(0, 3);
const threeDaysSubstring = threeDays.toString().substring(0, 3);
const fourDaysSubstring = fourDays.toString().substring(0, 3);

console.log(todaySubstring);
console.log(tomorrowSubstring);
console.log(twoDaysSubstring);
console.log(threeDaysSubstring);

forecastTomorrowDate.innerHTML = tomorrowSubstring;
forecast2DaysDate.innerHTML = twoDaysSubstring;
forecast3DaysDate.innerHTML = threeDaysSubstring;
forecast4DaysDate.innerHTML = fourDaysSubstring;

/* 3. Teleport API */
/* produce an image for the requested city */
async function requestCityImage() {
  /* replace all spaces and change the input to lowercase */
  const teleportApiUrl = `https://api.teleport.org/api/urban_areas/slug:${capitalizedCityInput
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
/* 4.1 request country and city list to search for the corresponding country based on the submitted city */
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
  return city.city_name === `${capitalizedCityInput}`;
}

/* 4.2 request costs */
async function requestCostOfLiving() {
  const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${capitalizedCityInput}&country_name=${submittedCountry}`;
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

  /* 4.3 display requested data */
  /* 4.3.1 food */
  /* 4.3.1.1 prices for fastfood */
  /* convert USD to EUR prices*/
  const priceEurFastfood = usdToEurExchangeRate * data.prices[33].usd.avg;

  /* round amount to 2 decimals */
  fastfoodPrices.innerHTML = `€ ${priceEurFastfood.toFixed(2)}`;

  console.log(
    `the average price for a fastfood meal is ${data.prices[33].usd.avg}`
  );
  /* 4.3.1.2 prices for mid-range restaurant */
  /* convert USD to EUR prices*/
  const priceEurMidRangeRestaurant =
    usdToEurExchangeRate * data.prices[34].usd.avg;

  /* round amount to 2 decimals */
  midRangeRestaurantPrices.innerHTML = `€ ${priceEurMidRangeRestaurant.toFixed(
    2
  )}`;

  console.log(
    `the average price for a mid-range restaurant is ${data.prices[34].usd.avg}`
  );
  /* 4.3.1.3 prices for cheap restaurant */
  /* convert USD to EUR prices*/
  const priceEurInexpensiveRestaurant =
    usdToEurExchangeRate * data.prices[35].usd.avg;

  /* round amount to 2 decimals */
  inexpensiveRestaurantPrices.innerHTML = `€ ${priceEurInexpensiveRestaurant.toFixed(
    2
  )}`;

  console.log(
    `the average price for an inexpensive restaurant is ${data.prices[35].usd.avg}`
  );

  /* 4.3.2 transport */
  /* 4.3.2.1 prices for public transport */
  /* convert USD to EUR prices*/
  const priceEurPublicTransport =
    usdToEurExchangeRate * data.prices[42].usd.avg;

  /* round amount to 2 decimals */
  publicTransportPrices.innerHTML = `€ ${priceEurPublicTransport.toFixed(2)}`;

  console.log(
    `the average price for a one-way local transport ticket is ${data.prices[42].usd.avg}`
  );

  /* 4.3.2.2 prices for 1km taxi */
  /* convert USD to EUR prices*/
  const priceEurTaxi = usdToEurExchangeRate * data.prices[49].usd.avg;

  /* round amount to 2 decimals */
  taxiPrices.innerHTML = `€ ${priceEurTaxi.toFixed(2)}`;
  console.log(`the average price for 1km taxi is ${data.prices[49].usd.avg}`);

  /* 4.3.2.3 prices for 1 liter gasoline */
  /* convert USD to EUR prices*/
  const priceEurGasoline = usdToEurExchangeRate * data.prices[44].usd.avg;

  /* round amount to 2 decimals */
  gasolinePrices.innerHTML = `€ ${priceEurGasoline.toFixed(2)}`;

  console.log(
    `the average price for 1 liter gasoline is ${data.prices[44].usd.avg}`
  );

  /* 4.3.3 living expenses */
  /* 4.3.3.1 prices for renting */
  /* convert USD to EUR prices*/
  const priceEurRenting = usdToEurExchangeRate * data.prices[26].usd.avg;

  /* round amount to 2 decimals */
  rentingPrices.innerHTML = `€ ${priceEurRenting.toFixed(2)}`;

  console.log(
    `the average price for renting an apartment is ${data.prices[26].usd.avg}`
  );

  /* 4.3.3.2 prices for apartment */
  /* convert USD to EUR prices*/
  const priceEurApartment = usdToEurExchangeRate * data.prices[1].usd.avg;

  /* round amount to 2 decimals */
  apartmentPrices.innerHTML = `€ ${priceEurApartment.toFixed(2)}`;

  console.log(
    `the average price for an apartment per m2 is ${data.prices[1].usd.avg}`
  );

  /* 4.3.3.3 prices for utilities */
  /* convert USD to EUR prices*/
  const priceEurUtilities = usdToEurExchangeRate * data.prices[48].avg;

  /* round amount to 2 decimals */
  utilitiesPrices.innerHTML = `€ ${priceEurUtilities.toFixed(2)}`;

  console.log(
    `the average price for basic utilities is ${data.prices[48].avg}`
  );
}

/* 5. Currency conversion API */

async function requestConvertCurrency() {
  const url =
    "https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=EUR&q=1.0";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1e57bfef2amsh9231ede2da10ba7p180c79jsn8010f9c78bef",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  usdToEurExchangeRate = await response.json();
}

requestConvertCurrency();

/* 6. transition to main container */
/* if user is in the intro screen transition to the main container, otherwise stay in the current configuration */
const transitionToMainContainer = function () {
  mainContainer.classList.remove("no-display");
  costOverview.classList.remove("hide");
  introHeading.classList.add("hide");
  mainAppBackground.classList.remove("mobile-layout");
  mainAppOverlay.classList.remove("mobile-layout");
};

/* 7. Handle the form input */
/* submit the city name that was filled in by the user */
citySubmit.addEventListener("click", function (event) {
  /* disable form auto submit */
  event.preventDefault();

  /* if user is in the intro screen transition to the main container */
  transitionToMainContainer();

  /* capitalize the first letter of the submitted city. captitalization is required for the API urls to receive a valid response */
  /* split all the seperate words into an array */
  const cityInputArray = cityInput.value.split(" ");

  /* capitalize the first letter of each entry */
  for (i = 0; i < cityInputArray.length; i++) {
    cityInputArray[i] =
      cityInputArray[i].charAt(0).toUpperCase() + cityInputArray[i].slice(1);
  }

  /* join all the elements of the array back together into a string */
  capitalizedCityInput = cityInputArray.join(" ");

  /* search for the array that corresponds with the submitted city. this array needs to be found so the country that belongs to the submitted city can be stored and used to call the cost of living and prices api */
  cityArrayResult = dataCityAndCountry.cities.find(findCityArray);
  console.log(cityArrayResult);

  submittedCountry = cityArrayResult.country_name;

  /* call the function that handles the openweather API */
  requestWeather();

  requestForecastWeather();

  /* call the function that handles the teleport API to generate a city image */
  requestCityImage();

  /* call the function that handles the cost of living and prices API*/
  requestCostOfLiving();
  console.log(submittedCountry);
});

/* plan of action */
/* information tables to include in the app */
/* 
1. weather forecast for coming week

optional
5. cost to get there (plane, car, train)
*/

/* inexpensive restuaraunt 
three course dinner */

/* living expenses: apartment, renting utilities */
