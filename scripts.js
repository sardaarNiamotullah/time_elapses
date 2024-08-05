const startDate = new Date("2024-08-05T00:00:00");

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
