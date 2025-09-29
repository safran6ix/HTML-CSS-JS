const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

function updateHands(now) {
    const ms = now.getMilliseconds();
    const s = now.getSeconds() + ms / 1000;
    const m = now.getMinutes() + s / 60;
    const h = (now.getHours() % 12) + m / 60;
    const hourAngle = h * 30;
    const minuteAngle = m * 6;
    const secondAngle = s * 6;
    hourEl.style.transform = `translate(-50%, -100%)
    rotate(${hourAngle}deg)`;
    minuteEl.style.transform = `translate(-50%, -100%)
    rotate(${minuteAngle}deg)`;
    secondEl.style.transform = `translate(-50%, -100%)
    rotate(${secondAngle}deg)`;
}

function loop() {
    updateHands(new Date());
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
window.addEventListener("load", () => updateHands(new Date()));
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateHands(new Date());
});
