function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error-message');
    const ageResult = document.getElementById('age-result');

    errorDiv.style.display = 'none';
    resultDiv.style.display = 'none';

    if (!birthdateInput) {
        errorDiv.style.display = 'block';
        return;
    }

    const birthdate = new Date(birthdateInput);
    const today = new Date();

    if (birthdate > today) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = "Birthdate cannot be in the future!";
        return;
    }

    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    let ageText = '';

    if (years > 0) {
        ageText += `${years} year${years !== 1 ? 's' : ''}`;
    }

    if (months > 0) {
        if (ageText) ageText += ', ';
        ageText += `${months} month${months !== 1 ? 's' : ''}`;
    }

    if (days > 0 || (years === 0 && months === 0)) {
        if (ageText) ageText += ', ';
        ageText += `${days} day${days !== 1 ? 's' : ''}`;
    }

    ageResult.textContent = ageText;
    resultDiv.style.display = 'block';
}

document.getElementById('birthdate').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        calculateAge();
    }
});