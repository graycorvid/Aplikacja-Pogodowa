const input = document.querySelector("input");
const button = document.querySelector("button");
const nazwaMiasta = document.querySelector(".nazwa-miasta");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const pogoda = document.querySelector(".pogoda");
const temperatura = document.querySelector(".temperatura");
const wilgotnosc = document.querySelector(".wilgotnosc");

const API_LINK = `http://api.openweathermap.org/data/2.5/weather?q=`;
const API_KEY = `&appid=e17324448084f41100543aee0221c857`;
const API_UNITS = `&units=metric`;

const getWeather = () => {
  warning.textContent = "";
  const miasto = input.value || "Wrocław"; //jeśli nie podamy miasta to automatycznie pobierzemy dane 'Wrocław'
  const URL = API_LINK + miasto + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((response) => {
      const temp = response.data.main.temp;
      const hum = response.data.main.humidity;
      const status = Object.assign({}, ...response.data.weather);
      pogoda.textContent = status.main;

      const id = status.id;

      if (id >= 200 && id < 300) {
        photo.setAttribute("src", "./img/thunderstorm.png"); //burza
      } else if (id >= 300 && id < 500) {
        photo.setAttribute("src", "./img/drizzle.png"); //mżawka
      } else if (id >= 500 && id < 600) {
        photo.setAttribute("src", "./img/rain.png"); //deszcz
      } else if (id >= 600 && id < 700) {
        photo.setAttribute("src", "./img/snow.png"); //śnieg
      } else if (id >= 700 && id < 800) {
        photo.setAttribute("src", "./img/fog.png"); //mgła
      } else if (id === 800) {
        photo.setAttribute("src", "./img/sun.png"); //słońce
      } else if (id > 800) {
        photo.setAttribute("src", "./img/cloud.png"); //zachmurzenie
      } else {
        photo.setAttribute("src", "./img/unknown.png"); //nieznana/startowa
      }

      //obrazki pobrane z Pixabay (możliwość użytkowania za darmo w zgodzie z licencją, jeśli nie są pobrane dla celów komercyjnych)

      nazwaMiasta.textContent = response.data.name;
      temperatura.textContent = Math.round(temp) + "℃";
      wilgotnosc.textContent = Math.round(hum) + "%";
    })
    .catch(() => (warning.textContent = "Niepoprawna nazwa miasta!"));
  input.value = "";
};

button.addEventListener("click", getWeather);
input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeather();
  }
});
