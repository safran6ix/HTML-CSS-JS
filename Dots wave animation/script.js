const canvas = document.getElementById("scanner");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let dots = [];
const spacing = 25;
let waveX = 0;

for (let y = spacing; y < canvas.height; y += spacing) {
    for (let x = spacing; x < canvas.width; x += spacing) {
        dots.push({ x, y });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waveX += 4;

    if (waveX > canvas.width + 100) waveX = -100;

    dots.forEach(dot => {
        const distance = Math.abs(dot.x - waveX);
        const glow = Math.max(0, 1 - distance / 200);
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3 + glow * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(83, 255, 60, ${0.15 + glow})`;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}
animate();