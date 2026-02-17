// ONE simple toggle — low code, high effect
const button = document.getElementById('toggleButton');
const bulb = document.getElementById('bulb');
const body = document.getElementById('body');

button.onclick = function () {
    // check current state and flip everything
    if (button.textContent === 'turn on') {
        button.textContent = 'turn off';
        bulb.classList.remove('off');
        body.classList.add('light-mode');
    } else {
        button.textContent = 'turn on';
        bulb.classList.add('off');
        body.classList.remove('light-mode');
    }
};