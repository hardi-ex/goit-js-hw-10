import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form-js');
const delayInputEl = formEl.querySelector('input[name="delay"]');
const fulfilledEl = formEl.querySelector('input[value="fulfilled"]');
const rejectedEl = formEl.querySelector('input[value="rejected"]');

formEl.addEventListener('submit', handleSubmit);
function handleSubmit(evt) {
  evt.preventDefault();

  const delay = delayInputEl.value;

  if (isNaN(delay) || delay <= 0) {
    iziToast.warning({
      title: 'Caution',
      message: isNaN(delay)
        ? 'Delay must be a number'
        : 'Delay must be a number greater than zero',
      position: 'topRight',
      color: 'red',
    });
    return;
  }

  // Простий варік
  // if (fulfilledEl.checked) {
  //   setTimeout(() => showResolvedMessage(delay), delay);
  // } else if (rejectedEl.checked) {
  //   setTimeout(() => showRejectedMessage(delay), delay);
  // }

  const isFulfilled = fulfilledEl.checked;
  const isRejected = rejectedEl.checked;

  const promise = createPromise(delay, isFulfilled, isRejected);

  promise.then(showResolvedMessage).catch(showRejectedMessage);

  formEl.reset();
}

function createPromise(delay, isFulfilled, isRejected) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(delay);
      } else if (isRejected) {
        reject(delay);
      }
    }, delay);
  });
}

function showResolvedMessage(delay) {
  iziToast.show({
    message: `✅ Fulfilled promise in ${delay}ms`,
    color: 'green',
    position: 'topRight',
    timeout: 4000,
  });
}

function showRejectedMessage(delay) {
  iziToast.show({
    message: `❌ Rejected promise in ${delay}ms`,
    color: 'red',
    position: 'topRight',
    timeout: 4000,
  });
}
