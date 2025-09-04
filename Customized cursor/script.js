
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

        document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
    mouseY = e.clientY;
        });

    function updateCursor() {

        cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    const dx = mouseX - circleX;
    const dy = mouseY - circleY;
    circleX += dx * 0.15;
    circleY += dy * 0.15;

    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;

    requestAnimationFrame(updateCursor);
        }

    updateCursor();

