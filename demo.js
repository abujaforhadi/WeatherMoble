document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city");
    const cityN = city.value;
    const cityName = cityN.toLowerCase();
    city.value = "";
    displayWeatherByCity(cityName);
  });

const displayWeatherByCity = async (cityName) => {
  const apiKey = "93baeb4ced524ec5ad8142345241510";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=4`
    );

    const weatherData = await response.json();
    displayWeather(weatherData);
    
  } catch (error) {
    alert(`${cityName} info is not available`, error.message);
   
  }
};
const displayWeather = (weatherData) => {
  // Today weather
  const today = weatherData.current;
  console.log(weatherData);
  dateStr = today.last_updated;
  const dayName = getDayNameFromDate(dateStr);
  const time = getTimeFromDate(dateStr);
  const formattedDate = getFormattedDate(dateStr);

 

  const location = weatherData.location;
  const todayWeatherDiv = document.getElementById("todayWeather");
  todayWeatherDiv.innerHTML = `
          <div class="background-design">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
        <div class="left-side">
            <div class="weather">
                <div >
                    <img class="icone" src="${today.condition.icon}" alt="weather icon" />
                </div>
                <div>${today.condition.text}</div>
            </div>
            <div class="temperature">${today.temp_c}°</div>
            <div class="range">${today.heatindex_c}°/${today.dewpoint_c}°</div>
        </div>
        <div class="right-side">
            <div>
                <div class="hour">${dayName}</div>
                <div class="date">${time} ${formattedDate}</div>
            </div>

            <div class="city">
                <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 my-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                ${location.name}, ${location.country}</p>
            </div>
        </div>
      `;

  // Next 4 day weather
  const nextDays = document.getElementById("nextDays");
nextDays.innerHTML = "";
const nextDay = weatherData.forecast.forecastday;

nextDay.forEach((element) => {
    const div = document.createElement("button");
    const dateStr = `${element.date}`;
    const nextDayName = getDayNameFromDate(dateStr);

    // Set the title attribute to show min and max temperature on hover
    div.title = `Max: ${element.day.maxtemp_c}°C, Min: ${element.day.mintemp_c}°C`;

    div.innerHTML = `<span class="day">${nextDayName}</span>
                     <span class="icon-weather-day"> <img src="${element.day.condition.icon}" alt="${element.day.condition.text}" /></span>`;
    
    nextDays.appendChild(div);
});

};

displayWeatherByCity("dhaka");
