const monthYearEl = document.getElementById("month-year");
const daysContainer = document.getElementById("calendar-days");
const dayNamesContainer = document.querySelector(".calendar__day-names");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

let currentDate = new Date();

const getDateKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const renderDayNames = () => {
  dayNamesContainer.innerHTML = dayNames
    .map((day) => `<span>${day}</span>`)
    .join("");
};

const renderCalendar = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  const firstDay = (new Date(year, month).getDay() + 6) % 7;
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  daysContainer.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += `<span class="calendar__days-hidden"></span>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const today = new Date();
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const dateKey = getDateKey(date);
    const hasEvents =
      window.calendarEvents[dateKey] &&
      window.calendarEvents[dateKey].length > 0;

    daysContainer.innerHTML += `
        <span class="${isToday ? "today" : ""} ${
      hasEvents ? "has-events" : ""
    }" 
              data-date="${dateKey}">${day}</span>
    `;
  }

  document
    .querySelectorAll(".calendar__days span:not(.calendar__days-hidden)")
    .forEach((day) => {
      day.addEventListener("click", () => {
        const dateKey = day.getAttribute("data-date");
        window.openEventModal(dateKey);
      });
    });
};

const changeMonth = (delta) => {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar();
};

prevBtn.addEventListener("click", () => changeMonth(-1));
nextBtn.addEventListener("click", () => changeMonth(1));

window.renderCalendar = renderCalendar;
window.getDateKey = getDateKey;
