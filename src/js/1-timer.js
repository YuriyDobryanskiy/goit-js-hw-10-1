import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerButton = document.querySelector("button");
const timerInput = document.querySelector("#datetime-picker");
timerButton.disabled = true;

const showMessage = (status, message) => {
  iziToast.show({
    title: status,
    timeout: 5000,
    position: 'center',
    message: message,
    color: (status == 'Err') ? 'red' : 'green', // blue, red, green, yellow
    close: (status == 'Err') ? true : false,
  });
}

const options = {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      timerButton.disabled = true;
      showMessage("Err", "Please choose a date in the future");
    } else {
      timerButton.disabled = false;
    }
  },
};

flatpickr(timerInput, options);

timerButton.addEventListener("click", startTimer);

function startTimer() {
  const userSelectedDate = flatpickr(timerInput,{dateFormat: "Y-m-d H:i"}).selectedDates[0];
  const currentDate = new Date();
  let timeDifference = userSelectedDate - currentDate;

  if (timeDifference <= 0) {
    showMessage("Err", "Invalid date. Please choose a date in the future.");
    return;
  }

  timerButton.disabled = true;
  timerInput.disabled = true;

  const timerInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    document.querySelector("[data-days]").textContent = addLeadingZero(days);
    document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);

    timeDifference -= 1000;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      timerButton.disabled = false;
      timerInput.disabled = false;
      showMessage("OK", "Time Is Up! Reload page");
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}