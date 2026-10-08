const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysSpan = document.querySelector("span.value[data-days]");
const hoursSpan = document.querySelector("span.value[data-hours]");
const minutesSpan = document.querySelector("span.value[data-minutes]");
const secondsSpan = document.querySelector("span.value[data-seconds]");
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      iziToast.warning({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      return;
    }
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
  },
};
flatpickr(input, options);
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;
  console.log(userSelectedDate);
  let ms = Date.parse(userSelectedDate);
  const id = setInterval(() => {
    const currentDate = Date.now();
    const delta = ms - currentDate;
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minutesSpan.textContent = minutes;
    secondsSpan.textContent = seconds;
  }, 1000);
});

flatpickr(input, { options });
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, "0");
}
