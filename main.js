const today = new Date();
const time = (today.getHours() % 12) + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes();

const clock = document.querySelector(".clock");
clock.innerHTML = time;