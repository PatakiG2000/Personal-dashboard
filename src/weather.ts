import { weatherContainer } from './selectors';

export function initWeather(): void {
  //get users location and fetch weather data
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=feb00505bb1f18c6a87d08f4d0e94fef
        `,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        weatherContainer.innerHTML = `
          <div class="icon-name">
          <img class="weather-icon" src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
          }@2x.png" alt="weather icon" />
         
          </div>
          <div>
        <h2><i class="fa-solid fa-tree-city"></i> ${data.name} </h2>
              <p><i class="fa-solid fa-temperature-three-quarters"></i> Temperature: ${(
                data.main.temp - 272.15
              ).toFixed(1)} &#8451</p>
             
              <p><i class="fa-solid fa-temperature-low"></i> Daily min: ${(
                data.main.temp_min - 272.15
              ).toFixed(1)}&#8451 </p>
              <p><i class="fa-solid fa-temperature-high"></i> Daily max: ${(
                data.main.temp_max - 272.15
              ).toFixed(1)}&#8451</p>
              <p><i class="fa-solid fa-wind"></i> ${data.wind.speed} km/h</p>
              <p><i class="fa-solid fa-comment"></i> ${
                data.weather[0].description
              }</p>
              </div>
        `;
      });
  });
}
