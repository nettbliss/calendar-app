const hoursInput = document.getElementById("hours-input");
const minutesInput = document.getElementById("minutes-input");
const hoursUp = document.getElementById("hours-up");
const hoursDown = document.getElementById("hours-down");
const minutesUp = document.getElementById("minutes-up");
const minutesDown = document.getElementById("minutes-down");
const eventTextInput = document.getElementById("event-text");
const addEventBtn = document.getElementById("add-event-btn");
const updateEventBtn = document.getElementById("update-event-btn");
const eventsListEl = document.getElementById("events-list");
const toggleEventsBtn = document.getElementById("toggle-events-btn");

let eventsExpanded = true;
let editingEventIndex = -1;

window.calendarEvents =
  JSON.parse(localStorage.getItem("calendarEvents")) || {};

const saveEvents = () => {
  localStorage.setItem("calendarEvents", JSON.stringify(window.calendarEvents));
};

const getFormattedTime = () => {
  let hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const addEvent = () => {
  const time = getFormattedTime();
  const text = eventTextInput.value.trim();

  if (!text) {
    alert("Пожалуйста, заполните текст события");
    return;
  }

  if (!window.calendarEvents[window.selectedDate]) {
    window.calendarEvents[window.selectedDate] = [];
  }

  window.calendarEvents[window.selectedDate].push({ time, text });
  window.calendarEvents[window.selectedDate].sort((a, b) =>
    a.time.localeCompare(b.time)
  );

  saveEvents();

  renderEventsList();
  window.renderCalendar();

  eventTextInput.value = "";
  eventTextInput.focus();
};

const deleteEvent = (index) => {
  if (
    window.calendarEvents[window.selectedDate] &&
    window.calendarEvents[window.selectedDate][index]
  ) {
    window.calendarEvents[window.selectedDate].splice(index, 1);

    if (window.calendarEvents[window.selectedDate].length === 0) {
      delete window.calendarEvents[window.selectedDate];
    }

    saveEvents();
    renderEventsList();
    window.renderCalendar();
  }
};

const editEvent = (index) => {
  if (
    window.calendarEvents[window.selectedDate] &&
    window.calendarEvents[window.selectedDate][index]
  ) {
    const event = window.calendarEvents[window.selectedDate][index];

    const [hours, minutes] = event.time.split(":");
    hoursInput.value = hours;
    minutesInput.value = minutes;
    eventTextInput.value = event.text;

    editingEventIndex = index;

    updateEventBtn.style.display = "block";
    addEventBtn.style.display = "none";

    eventTextInput.focus();
  }
};

const updateEvent = () => {
  if (editingEventIndex === -1) return;

  const time = getFormattedTime();
  const text = eventTextInput.value.trim();

  if (!text) {
    alert("Пожалуйста, заполните текст события");
    return;
  }

  if (
    window.calendarEvents[window.selectedDate] &&
    window.calendarEvents[window.selectedDate][editingEventIndex]
  ) {
    window.calendarEvents[window.selectedDate][editingEventIndex] = {
      time,
      text,
    };

    window.calendarEvents[window.selectedDate].sort((a, b) =>
      a.time.localeCompare(b.time)
    );

    saveEvents();

    renderEventsList();
    window.renderCalendar();

    resetEditMode();

    eventTextInput.value = "";
  }
};

const resetEditMode = () => {
  editingEventIndex = -1;
  updateEventBtn.style.display = "none";
  addEventBtn.style.display = "block";
};

const renderEventsList = () => {
  const dateEvents = window.calendarEvents[window.selectedDate] || [];

  if (dateEvents.length === 0) {
    eventsListEl.innerHTML = '<p class="no-events">Нет событий</p>';
    toggleEventsBtn.style.display = "none";
  } else {
    eventsListEl.innerHTML = dateEvents
      .map(
        (event, index) => `
            <div class="event-item">
                <button class="delete-event" data-index="${index}">×</button>
                <button class="edit-event" data-index="${index}">✎</button>
                <div class="event-time">${event.time}</div>
                <div class="event-text">${event.text}</div>
            </div>
        `
      )
      .join("");

    toggleEventsBtn.style.display = "flex";

    document.querySelectorAll(".delete-event").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        deleteEvent(index);
      });
    });

    document.querySelectorAll(".edit-event").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"));
        editEvent(index);
      });
    });
  }

  updateToggleButton();
};

const updateToggleButton = () => {
  const dateEvents = window.calendarEvents[window.selectedDate] || [];
  const count = dateEvents.length;
  const toggleText = eventsExpanded ? "Свернуть" : `Показать (${count})`;

  toggleEventsBtn.innerHTML = `<span>${toggleText}</span> <span>${
    eventsExpanded ? "▼" : "▲"
  }</span>`;

  if (eventsExpanded) {
    eventsListEl.classList.remove("collapsed");
  } else {
    eventsListEl.classList.add("collapsed");
  }
};

const toggleEventsVisibility = () => {
  eventsExpanded = !eventsExpanded;
  updateToggleButton();
};

const changeTimeValue = (input, delta) => {
  let value = parseInt(input.value) || 0;
  const max = input === hoursInput ? 23 : 59;
  const min = 0;

  value += delta;

  if (value > max) value = min;
  if (value < min) value = max;

  input.value = value.toString().padStart(2, "0");
};

const handleTimeScroll = (input, event) => {
  event.preventDefault();
  const delta = Math.sign(event.deltaY) > 0 ? -1 : 1;
  changeTimeValue(input, delta);
};

const validateTimeInput = (input, max) => {
  let value = parseInt(input.value) || 0;

  if (value > max) {
    value = max;
  } else if (value < 0) {
    value = 0;
  }

  input.value = value.toString().padStart(2, "0");
};

addEventBtn.addEventListener("click", addEvent);
updateEventBtn.addEventListener("click", updateEvent);
toggleEventsBtn.addEventListener("click", toggleEventsVisibility);

hoursInput.addEventListener("blur", () => validateTimeInput(hoursInput, 23));
minutesInput.addEventListener("blur", () =>
  validateTimeInput(minutesInput, 59)
);

hoursUp.addEventListener("click", () => changeTimeValue(hoursInput, 1));
hoursDown.addEventListener("click", () => changeTimeValue(hoursInput, -1));
minutesUp.addEventListener("click", () => changeTimeValue(minutesInput, 1));
minutesDown.addEventListener("click", () => changeTimeValue(minutesInput, -1));

hoursInput.addEventListener("wheel", (e) => handleTimeScroll(hoursInput, e));
minutesInput.addEventListener("wheel", (e) =>
  handleTimeScroll(minutesInput, e)
);

window.renderEventsList = renderEventsList;
window.resetEditMode = resetEditMode;
window.eventsExpanded = eventsExpanded;
window.monthNames = monthNames;
