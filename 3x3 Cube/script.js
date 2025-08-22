document.addEventListener('DOMContentLoaded', function () {
    const cube = document.querySelector('.cube');
    const rotateXBtn = document.getElementById('rotate-x');
    const rotateYBtn = document.getElementById('rotate-y');
    const rotateZBtn = document.getElementById('rotate-z');
    const resetBtn = document.getElementById('reset');

    // Initial rotation values
    let rotateX = -25;
    let rotateY = -25;

    // Update cube rotation
    function updateCubeTransform() {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    // Button event handlers
    rotateXBtn.addEventListener('click', () => {
        rotateX += 90;
        updateCubeTransform();
    });

    rotateYBtn.addEventListener('click', () => {
        rotateY += 90;
        updateCubeTransform();
    });

    rotateZBtn.addEventListener('click', () => {
        rotateX += 90;
        rotateY += 90;
        updateCubeTransform();
    });

    resetBtn.addEventListener('click', () => {
        rotateX = -25;
        rotateY = -25;
        updateCubeTransform();
    });

    // Mouse drag rotation
    let isMouseDown = false;
    let startX, startY;

    cube.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;

        updateCubeTransform();

        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        cube.style.transition = 'transform 0.5s ease';
    });

    // Touch support for mobile devices
    cube.addEventListener('touchstart', (e) => {
        isMouseDown = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        cube.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (!isMouseDown) return;

        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;

        updateCubeTransform();

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        isMouseDown = false;
        cube.style.transition = 'transform 0.5s ease';
    });
});