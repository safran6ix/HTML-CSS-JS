const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//Dot configuration
const dots = [];
const dotCount = 150;
const speed = 1.5;
const dotColor = { r: 255, g: 255, b: 255 };

//Create Dot class
class Dot {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.alpha = Math.random() * 0.6 + 0.4;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        //Bounce off edges
        if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

        //Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor.r},
        ${dotColor.g}, ${dotColor.b}, ${this.alpha})`;
        ctx.fill();
    }
}

//Initialize dots
for (let i = 0; i < dotCount; i++) {
    dots.push(new Dot());
}

//Draw connecting lines
function drawConnection() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 *
                    (1 - distance / 120)})`;
                ctx.lineWidth = 0.4;
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
            }
        }
    }
}

//Animation Loop
function animate() {
    //clear with fade effect
    ctx.fillStyle = `rgba(10, 10, 10, 0.1)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Update and draw dots
    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });

    //Draw connections
    drawConnection();

    requestAnimationFrame(animate);
}

//Start animation
animate();

//click interaction
canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    //Push dots away from click
    dots.forEach(dot => {
        const dx = dot.x - x;
        const dy = dot.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
            const force = (150 - distance) / 30;
            dot.speedX += (dx / distance) * force;
            dot.speedY += (dy / distance) * force;
        }
    });
});