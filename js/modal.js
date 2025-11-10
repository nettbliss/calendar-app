const modal = document.getElementById("event-modal");
const closeBtn = document.querySelector(".close-btn");
const selectedDateEl = document.getElementById("selected-date");

let selectedDate = null;

const openEventModal = (dateKey) => {
  console.log('openEventModal called with:', dateKey);
  selectedDate = dateKey;
  window.selectedDate = dateKey;
  
  const [year, month, day] = dateKey.split("-").map(Number);
  selectedDateEl.textContent = `${day} ${window.monthNames[month]} ${year} года`;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  document.getElementById("hours-input").value = hours.toString().padStart(2, "0");
  document.getElementById("minutes-input").value = minutes.toString().padStart(2, "0");

  document.getElementById("event-text").value = "";

  window.resetEditMode();
  window.renderEventsList();

  modal.style.display = "flex";
};

const closeModal = () => {
  modal.style.display = "none";
  window.eventsExpanded = true;
  window.resetEditMode();
};

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

window.openEventModal = openEventModal;
window.selectedDate = selectedDate;
