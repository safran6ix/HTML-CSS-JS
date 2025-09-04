
    document.addEventListener('DOMContentLoaded', function () {
            const button = document.getElementById('particleButton');

    button.addEventListener('click', function (e) {

                const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createParticles(x, y);
            });

    function createParticles(x, y) {
                const particles = 30;
    const colors = ['#ff6b6b', '#ff8e53', '#ffce5c', '#6bff8a', '#5ccaff'];

    for (let i = 0; i < particles; i++) {
                    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 5 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 50;

    const finalX = Math.cos(angle) * distance;
    const finalY = Math.sin(angle) * distance;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    button.appendChild(particle);

    const animation = particle.animate([
    {
        transform: 'translate(0, 0) scale(1)',
    opacity: 1
                        },
    {
        transform: `translate(${finalX}px, ${finalY}px) scale(0)`,
    opacity: 0
                        }
    ], {
        duration: Math.random() * 1000 + 1000,
    easing: 'cubic-bezier(0, .9, .57, 1)'
                    });

                    animation.onfinish = () => {
        particle.remove();
                    };
                }
            }
        });
