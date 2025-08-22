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

    
});