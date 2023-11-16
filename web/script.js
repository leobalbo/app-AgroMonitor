const daysOfWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const daysWithoutSuffix = daysOfWeek.map((day) => day.replace("-feira", ""));

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function formatDate(date) {
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function addSmoothAnimationClass(element) {
  element.classList.add("smooth-animation");
  element.addEventListener("animationend", () => {
    element.classList.remove("smooth-animation");
  });
}

function updateDateAndTime() {
  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);
  const dayOfWeekElement = document.getElementById("dayOfWeek");
  const dateElement = document.getElementById("date");

  dayOfWeekElement.textContent = daysOfWeek[currentDate.getDay()];
  dateElement.textContent = formattedDate;

  setTimeout(updateDateAndTime, 60000);
}

let temperature = 0;

function updateWeatherData() {
  const getUrl = "https://api-agromonitor-production.up.railway.app/getdata";

  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.temperature !== temperature || temperature === 0) {
        const temperatureElement = document.getElementById("temperature");
        const humidityElement = document.getElementById("humidity");

        temperatureElement.textContent = `${data.temperature}°C`;
        humidityElement.textContent = `UR ${data.humidity}%`;

        addSmoothAnimationClass(temperatureElement);
        addSmoothAnimationClass(humidityElement);
        temperature = data.temperature;
      }
    })
    .catch((error) =>
      console.error("Erro ao buscar dados da API (getdata):", error)
    )
    .finally(() => {
      setTimeout(updateWeatherData, 2500);
    });
}

async function fetchAndUpdateWeather() {
  try {
    const response = await fetch(
      "https://api-agromonitor-production.up.railway.app/gethistoric"
    );
    const data = await response.json();

    data.forEach((entry, index) => {
      const dayElement = document.getElementById(`day${index + 1}`);
      const tempElement = document.getElementById(`temp${index + 1}`);
      const humidityElement = document.getElementById(`humidity${index + 1}`);

      const newData = new Date(
        new Date(entry.date).setDate(new Date(entry.date).getDate() + 1)
      );

      dayElement.textContent = daysWithoutSuffix[newData.getDay()];
      tempElement.textContent = `${entry.temp.toFixed(1)}°C`;
      humidityElement.textContent = `UR ${entry.humi.toFixed(1)}%`;
    });
  } catch (error) {
    console.error("Erro ao buscar dados da API (gethistoric):", error);
  }
}

updateDateAndTime();
updateWeatherData();
fetchAndUpdateWeather();
