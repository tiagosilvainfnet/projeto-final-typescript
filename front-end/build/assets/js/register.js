"use strict";
const emailValidation = (value, name, key) => {
    var re = /\S+@\S+\.\S+/;
    const result = re.test(value);
    const element = document.querySelector(`#${name}Help`);
    if (result) {
        element.style.color = 'green';
        inputs[key].valid = true;
    }
    else {
        element.style.color = 'red';
        inputs[key].valid = false;
    }
};
const usernameValidation = (value, name, key) => {
    const element1 = document.querySelector(`#${name}Help1`);
    const element2 = document.querySelector(`#${name}Help2`);
    let result1 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    if (result1) {
        element1.style.color = 'red';
    }
    else {
        element1.style.color = 'green';
    }
    let result2 = /\s/g.test(value);
    if (result2) {
        element2.style.color = 'red';
    }
    else {
        element2.style.color = 'green';
    }
    if (result1 && result2) {
        inputs[key].valid = false;
    }
    else {
        inputs[key].valid = true;
    }
};
const passwordValidation = (value, name, key) => {
    const element1 = document.querySelector(`#${name}Help1`), element2 = document.querySelector(`#${name}Help2`), element3 = document.querySelector(`#${name}Help3`), element4 = document.querySelector(`#${name}Help4`);
    if (value.length >= 8) {
        element1.style.color = 'green';
    }
    else {
        element1.style.color = 'red';
    }
    let result1 = /[A-Z]/.test(value);
    if (result1) {
        element2.style.color = 'green';
    }
    else {
        element2.style.color = 'red';
    }
    let result2 = /[a-z]/.test(value);
    if (result2) {
        element3.style.color = 'green';
    }
    else {
        element3.style.color = 'red';
    }
    let result3 = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    if (result3) {
        element4.style.color = 'green';
    }
    else {
        element4.style.color = 'red';
    }
    if (result1 && result2 && result3 && value.length >= 8) {
        inputs[key].valid = true;
    }
    else {
        inputs[key].valid = false;
    }
};
const validateEqualPassword = (value, name, key) => {
    const element5 = document.querySelector(`#${name}Help1`);
    if (value === inputs['inputPassword'].input.value) {
        element5.style.color = 'green';
        inputs[key].valid = true;
    }
    else {
        element5.style.color = 'red';
        inputs[key].valid = false;
    }
};
const register = () => {
    console.log("Cadastrou");
};
const togglePassword = (element) => {
    element.classList.add('hide');
    element.classList.remove('show');
    if (element.id === 'exibir') {
        let el = document.querySelector('#ocultar');
        el.classList.add('show');
        el.classList.remove('hide');
        inputs.inputPassword.input.type = 'text';
        inputs.inputConfirmPassword.input.type = 'text';
    }
    else {
        let el = document.querySelector('#exibir');
        el.classList.add('show');
        el.classList.remove('hide');
        inputs.inputPassword.input.type = 'password';
        inputs.inputConfirmPassword.input.type = 'password';
    }
};
const inputs = {
    inputEmail: {
        input: document.querySelector('#inputEmail'),
        validate: emailValidation,
        name: 'email',
        valid: false
    },
    inputUsername: {
        input: document.querySelector('#inputUsername'),
        validate: usernameValidation,
        name: 'username',
        valid: false
    },
    inputName: {
        input: document.querySelector('#inputName'),
        validate: null,
        name: 'name',
        valid: true
    },
    inputPassword: {
        input: document.querySelector('#inputPassword'),
        validate: passwordValidation,
        name: 'password',
        valid: false
    },
    inputConfirmPassword: {
        input: document.querySelector('#inputConfirmPassword'),
        validate: validateEqualPassword,
        name: 'confirmPassword',
        valid: false
    }
};
const keys = Object.keys(inputs);
keys.forEach(key => {
    if (inputs[key].validate) {
        inputs[key].input.addEventListener('keyup', (event) => {
            inputs[key].validate(event.currentTarget.value, inputs[key].name, key);
        });
    }
});
