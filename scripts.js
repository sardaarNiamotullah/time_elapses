const startDate = new Date("2024-08-10T00:00:00");

function pad(num, size) {
  let s = "0".repeat(size) + num;
  return s.substr(s.length - size);
}

function updateFlipUnit(unit, value, padSize) {
  const top = unit.querySelector(".top");
  const bottom = unit.querySelector(".bottom");
  const currentValue = parseInt(top.textContent, 10);

  if (currentValue !== value) {
    const paddedValue = pad(value, padSize); // Apply padding based on padSize
    top.textContent = paddedValue;
    bottom.textContent = paddedValue;
    unit.classList.add("flip");
    setTimeout(() => unit.classList.remove("flip"), 500);
  }
}

function formatTime(duration) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

document.addEventListener("DOMContentLoaded", () => {
  const daysUnit = document.getElementById("days");
  const hoursUnit = document.getElementById("hours");
  const minutesUnit = document.getElementById("minutes");
  const secondsUnit = document.getElementById("seconds");

  function updateStopwatch() {
    const currentTime = new Date().getTime();
    const elapsed = currentTime - startDate.getTime();
    const formattedTime = formatTime(elapsed);

    updateFlipUnit(daysUnit, formattedTime.days, 3); // Days field with 3 digits
    updateFlipUnit(hoursUnit, formattedTime.hours, 2); // Hours field with 2 digits
    updateFlipUnit(minutesUnit, formattedTime.minutes, 2); // Minutes field with 2 digits
    updateFlipUnit(secondsUnit, formattedTime.seconds, 2); // Seconds field with 2 digits
  }

  updateStopwatch();
  setInterval(updateStopwatch, 1000);
});

// animation code...

function updateLineWidth() {
  const now = new Date();

  const lineSecond = document.querySelector(".lines_container_line_second");
  const lineMinute = document.querySelector(".lines_container_line_minute");
  const lineHour = document.querySelector(".lines_container_line_hour");
  const lineDay = document.querySelector(".lines_container_line_day");

  const milliseconds = now.getMilliseconds();
  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();

  const secondPercent = (milliseconds / 1000) * 100;
  const minutePercent = ((second + milliseconds / 1000) / 60) * 100;
  const hourPercent = ((minute + second / 60) / 60) * 100;
  const dayPercent = ((hour + minute / 60) / 24) * 100;

  // lineSecond.style.width = `${(secondPercent* 80) / 100}px`;
  // lineMinute.style.width = `${(minutePercent* 80) / 100}px`;
  // lineHour.style.width = `${(hourPercent* 80) / 100}px`;
  // lineDay.style.width = `${(dayPercent* 80) / 100}px`;

  lineSecond.style.width = `${secondPercent}%`;
  lineMinute.style.width = `${minutePercent}%`;
  lineHour.style.width = `${hourPercent}%`;
  lineDay.style.width = `${dayPercent}%`;

  // lineSecond.style.backgroundColor = `rgb(${minutePercent * 2.6}, ${secondPercent * 2.6}, ${hourPercent * 2.6})`;
  // lineMinute.style.backgroundColor = `rgb(${minutePercent * 2.6}, ${hourPercent * 2.6}, ${secondPercent * 2.6})`;
  // lineHour.style.backgroundColor = `rgb(${hourPercent * 2.6}, ${minutePercent * 2.6}, ${secondPercent * 2.6})`;
  // lineDay.style.backgroundColor = `rgb(${hourPercent * 2.6}, ${secondPercent * 2.6}, ${minutePercent * 2.6})`;
}
function startClock() {
  updateLineWidth(); // Initial update
  setInterval(updateLineWidth, 1); // Update every Milli second
}
startClock();
