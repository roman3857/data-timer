//  - Створити секундомір, з використанням вбудованих функцій
// для отримання поточного часу, який буде мати можливість
// зупинятися та продовжуватися за допомогою кнопок
//  "Старт" та "Стоп".
// Також потрібно мати можливість скидати лічильник до 0.
const output = document.querySelector(".js-clockface");
const startBtn = document.querySelector('.timer-btn[data-action="start"]');
const stopBtn = document.querySelector('.timer-btn[data-action="stop"]');
const resetBtn = document.querySelector('.timer-btn[data-action="reset"]');
let startTimerTime = 0;
let timerId = null;
let timerIsActive = false;
let accumulatedTime = 0;
startBtn.addEventListener("click", () => {
  console.log("start timer");
  if (timerIsActive) {
    return;
  }

  startTimerTime = Date.now();
  timerId = setInterval(() => {
    const currentTime = Date.now();
    let delta = currentTime - startTimerTime + accumulatedTime;
    const { hours, mins, secs } = getTimeComponents(delta);
    output.textContent = `${hours}:${mins}:${secs}`;
  }, 1000);
  let currentDelta = Date.now() - startTimerTime + accumulatedTime;
  const { hours, mins, secs } = getTimeComponents(currentDelta);
  output.textContent = `${hours}:${mins}:${secs}`;

  timerIsActive = true;
});
resetBtn.addEventListener("click", () => {
  console.log("reset timer");
  clearInterval(timerId);
  timerIsActive = false;
  output.textContent = "00:00:00";
  accumulatedTime = 0;
  startTimerTime = 0;
});
stopBtn.addEventListener("click", () => {
  console.log("stop timer");
  clearInterval(timerId);
  timerIsActive = false;
  accumulatedTime = Date.now() - startTimerTime + accumulatedTime; // додати акумулятор
  startTimerTime = 0;
});
function pad(value) {
  return String(value).padStart(2, "0");
}
function getTimeComponents(time) {
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
  return { hours, mins, secs };
}
