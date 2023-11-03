const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

function updateWeatherData() {
  const getUrl = "https://web-production-d62e.up.railway.app/getData";

  fetch(getUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperatureElement = document.getElementById("temperature");
      const humidityElement = document.getElementById("humidity");

      temperatureElement.textContent = `${data.temperature}°C`;
      humidityElement.textContent = `UR ${data.humidity}%`;

      addSmoothAnimationClass(temperatureElement);
      addSmoothAnimationClass(humidityElement);
    })
    .catch((error) => console.error("Erro ao buscar dados da API:", error))
    .finally(() => {
      setTimeout(updateWeatherData, 5000);
    });
}

updateDateAndTime();
updateWeatherData();
