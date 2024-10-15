function isValidNumber(value) {
    const normalizedValue = value.replace(',', '.');
    const regex = /^-?\d+(\.\d+)?(e[-+]?\d+)?$/i; 
    return regex.test(normalizedValue);
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    const firstNumInput = document.querySelector('.first_num');
    const secondNumInput = document.querySelector('.second_num');
    const resultInput = document.querySelector('.result');
    const errorMessage = document.querySelector('.error-message');

    firstNumInput.addEventListener('blur', validateInput);
    secondNumInput.addEventListener('blur', validateInput);

    button.addEventListener('click', function() {
        errorMessage.textContent = '';  

        const firstNum = firstNumInput.value;
        const secondNum = secondNumInput.value;
        const operation = document.querySelector('input[name="operation"]:checked');

        if (!operation) {
            errorMessage.textContent = 'Vui lòng chọn phép toán.';
            return;
        }

        const firstNumValid = isValidNumber(firstNum);
        const secondNumValid = isValidNumber(secondNum);

        if (!firstNumValid && !secondNumValid) {
            errorMessage.textContent = 'Cả hai số không hợp lệ. Vui lòng nhập lại.';
            return;
        } 
        if (!firstNumValid) {
            errorMessage.textContent = 'Giá trị nhập ở \"Số thứ nhất\" không hợp lệ.';
            return;
        } 
        if (!secondNumValid) {
            errorMessage.textContent = 'Giá trị nhập ở \"Số thứ hai\" không hợp lệ.';
            return;
        }

        const firstNumParsed = parseFloat(firstNum.replace(',', '.'));
        const secondNumParsed = parseFloat(secondNum.replace(',', '.'));

        let result;

        switch (operation.value) {
            case 'add':
                result = firstNumParsed + secondNumParsed;
                break;
            case 'subtract':
                result = firstNumParsed - secondNumParsed;
                break;
            case 'multiply':
                result = firstNumParsed * secondNumParsed;
                break;
            case 'divide':
                if (secondNumParsed === 0) {
                    errorMessage.textContent = 'Không thể chia cho 0.';
                    return;
                }
                result = firstNumParsed / secondNumParsed;
                break;
        }

        resultInput.value = result;
    });

    function validateInput(event) {
        const input = event.target;
        if (!isValidNumber(input.value) || input.value.trim() === '') {
            errorMessage.textContent = `Giá trị nhập ở ô "${input === firstNumInput ? 'Số thứ nhất' : 'Số thứ hai'}" không hợp lệ.`;
        } else {
            errorMessage.textContent = ''; 
        }
    }
});
