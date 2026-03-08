document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        removeAllErrors();

        let isValid = true;

        const nameInput = document.getElementById('name');
        const nameValue = nameInput ? nameInput.value.trim() : '';
        
        if (!nameInput) {
            console.error('Поле с id="name" не найдено');
            isValid = false;
        } else if (nameValue === '') {
            showError(nameInput, 'Введите ваше имя');
            isValid = false;
        } else {
            const words = nameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 1) { 
                showError(nameInput, 'Введите имя');
                isValid = false;
            }
        }

        const emailInput = document.getElementById('email');
        const emailValue = emailInput ? emailInput.value.trim() : '';
        
        if (!emailInput) {
            console.error('Поле с id="email" не найдено');
            isValid = false;
        } else if (emailValue === '') {
            showError(emailInput, 'Введите email');
            isValid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailValue)) {
                showError(emailInput, 'Введите корректный email (пример: name@domain.ru)');
                isValid = false;
            }
        }

        const phoneInput = document.getElementById('phone');
        const phoneValue = phoneInput ? phoneInput.value.trim() : '';
        
        if (!phoneInput) {
            console.error('Поле с id="phone" не найдено');
            isValid = false;
        } else if (phoneValue === '') {
            showError(phoneInput, 'Введите номер телефона');
            isValid = false;
        } else {
            const phoneDigits = phoneValue.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
                showError(phoneInput, 'Введите 10 цифр номера');
                isValid = false;
            }
        }

        const messageInput = document.getElementById('message');
        const messageValue = messageInput ? messageInput.value.trim() : '';

        const agreementCheck = document.getElementById('agreement');
        
        if (!agreementCheck) {
            console.error('Чекбокс с id="agreement" не найден');
            isValid = false;
        } else if (!agreementCheck.checked) {
            showError(agreementCheck, 'Необходимо согласие на обработку данных');
            isValid = false;
        }

        if (isValid) {
            const formData = {
                name: nameValue,
                email: emailValue,
                phone: phoneValue,
                message: messageValue || '(не заполнено)',
                agreement: agreementCheck.checked
            };

            const validEvent = new CustomEvent('formValid', { 
                detail: formData 
            });
            
            document.dispatchEvent(validEvent);
            
            alert('✅ Форма успешно отправлена! Данные в консоли.');
        }
    });

    function showError(input, message) {
        input.classList.add('is-danger');
        
        const helpBlock = document.createElement('p');
        helpBlock.classList.add('help', 'is-danger');
        helpBlock.textContent = message;
        
        const control = input.closest('.control');
        if (control) {
            control.parentNode.appendChild(helpBlock);
        } else {
            input.parentNode.appendChild(helpBlock);
        }
    }

    function removeAllErrors() {
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .checkbox.is-danger')
            .forEach(el => el.classList.remove('is-danger'));
        
        document.querySelectorAll('.help.is-danger')
            .forEach(el => el.remove());
    }

    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            
            const control = this.closest('.control');
            if (control) {
                const errorMessages = control.parentNode.querySelectorAll('.help.is-danger');
                errorMessages.forEach(el => el.remove());
            }
        });
    });

    const agreementCheck = document.getElementById('agreement');
    if (agreementCheck) {
        agreementCheck.addEventListener('change', function() {
            this.classList.remove('is-danger');
            const errorMessages = this.closest('.field').querySelectorAll('.help.is-danger');
            errorMessages.forEach(el => el.remove());
        });
    }
});