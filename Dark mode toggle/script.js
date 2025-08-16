document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('colorful-toggle');
    const statusSpan = document.querySelector('.toggle-status span');

    toggle.addEventListener('change', function () {
        if (this.checked) {
            statusSpan.textContent = 'On';
            statusSpan.style.color = '#6c5ce7';
            document.body.style.background = 'linear-gradient(135deg, #2d3436, #636e72)';
        } else {
            statusSpan.textContent = 'Off';
            statusSpan.style.color = '#6c5ce7';
            document.body.style.background = 'linear-gradient(135deg, #a29bfe, #6c5ce7)';
        }
    });

    // Add animation on load
    const container = document.querySelector('.toggle-container');
    setTimeout(() => {
        container.style.transform = 'translateY(0)';
        container.style.opacity = '1';
    }, 100);
});