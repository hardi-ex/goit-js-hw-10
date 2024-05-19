import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dataPickerEl = document.querySelector('#datetime-picker');
const startButtonEl = document.querySelector('[data-start]');
const timerEl = document.querySelector('.timer');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      startButtonEl.disabled = true;
      pastDateAlert();
      return;
    }
    userSelectedDate = selectedDates[0];
    startButtonEl.disabled = false;
  },
};

flatpickr(dataPickerEl, options);

startButtonEl.addEventListener('click', () => {
  if (Date.now() > userSelectedDate) {
    startButtonEl.disabled = true;
    pastDateAlert();
    return;
  }

  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      finishedTimerAlert();
      return stopTimer(intervalId);
    }
    const convertDiff = convertMs(userSelectedDate - Date.now());
    updateTime(convertDiff);
  }, 1000);
  startedTimerAlert();

  startButtonEl.disabled = true;
  dataPickerEl.disabled = true;
});

function updateTime(time) {
  const { days, hours, minutes, seconds } = time;
  timerEl.querySelector('[data-days]').textContent = addLeadingZero(days);
  timerEl.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  timerEl.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  timerEl.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

function stopTimer(id) {
  clearInterval(id);
  startButtonEl.disabled = false;
  dataPickerEl.disabled = false;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function pastDateAlert() {
  iziToast.warning({
    title: 'Caution',
    message: 'Please choose a date in the future',
    timeout: 4000,
    position: 'topRight',
    color: 'red',
  });
}

function startedTimerAlert() {
  iziToast.success({
    message: 'The timer was started!',
    color: 'green',
    position: 'topRight',
    timeout: 4000,
  });
}

function finishedTimerAlert() {
  iziToast.info({
    message: 'The timer was finished!',
    color: 'green',
    position: 'topRight',
    timeout: 4000,
  });
}
