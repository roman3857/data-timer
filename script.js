//  - Створити секундомір, з використанням вбудованих функцій
// для отримання поточного часу, який буде мати можливість
// зупинятися та продовжуватися за допомогою кнопок
//  "Старт" та "Стоп".
// Також потрібно мати можливість скидати лічильник до 0.
const output = document.querySelector(".js-clockface");
const startBtn2 = document.querySelector('.timer-btn[data-action="start"]');
const stopBtn = document.querySelector('.timer-btn[data-action="stop"]');
const resetBtn = document.querySelector('.timer-btn[data-action="reset"]');
let startTimerTime = 0;
let timerId = null;
let timerIsActive = false;
let accumulatedTime = 0;
startBtn2.addEventListener("click", () => {
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

//    6)    Методи Date
// Геттери
const date = new Date("March 16, 2030 14:25:00");
console.log("Date: ", date);
// Повертає день місяця від 1 до 31
console.log("Day: ", date.getDate()); // 16
// Повертає день тижня від 0 до 6, починається з неділі
console.log("Day of the week: ", date.getDay()); // 6
// Повертає місяць від 0 до 11
console.log("Month: ", date.getMonth()); // 2
// Повертає рік з 4 цифр
console.log("Full year: ", date.getFullYear()); // 2030
// Повертає години
console.log("Hours: ", date.getHours()); // 14
// Повертає хвилини
console.log("Minutes: ", date.getMinutes()); // 25
// Повертає секунди
console.log("Seconds: ", date.getSeconds()); // 0
// Повертає мілісекунди
console.log("Milliseconds: ", date.getMilliseconds()); // 0

// 1. Створити функцію, яка повертає поточну дату та час.
// 2. Створити функцію, яка приймає дату та повертає рік.
// 3. Створити функцію, яка приймає дату та повертає місяць.
// 4. Створити функцію, яка приймає дату та повертає день місяця.
// 5. Створити функцію, яка приймає дату та повертає години.
// 6. Створити функцію, яка приймає дату та повертає хвилини.
// 7. Створити функцію, яка приймає дату та повертає секунди.
// 8. Створити функцію, яка перевіряє чи є дата вихідним днем (субота або неділя).
// 9. Створити функцію, яка порівнює дві дати та повертає різницю в днях.
// 10. Створити функцію, яка приймає дату та кількість днів, та повертає нову дату після додавання цієї кількості днів.
