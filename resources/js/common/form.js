import {bemGetElement, bemGetMod} from "./bem-helper";
import {axios} from "./axios";

export class Form {
    constructor(el) {
        this.el = el;
        this.submit = this.el.querySelector('.' + bemGetMod('button', 'submit'));

        this.checkValueOnUpdate = this.checkValueOnUpdate.bind(this);
        this.clearError = this.clearError.bind(this);

        this.init();
        this.handleEvents();
        this.handleSubmit();
    }

    init() {
        this.el.querySelectorAll('.input-field').forEach((field) => {
            let input = field.querySelector('input');
            field.classList.toggle(bemGetMod('input-field', 'has-value'), !!input.value);
        });
    }

    handleEvents() {
        this.el.querySelectorAll('.input-field').forEach((field) => {
            let input = field.querySelector('input');

            input.addEventListener('input', this.checkValueOnUpdate);
            input.addEventListener('change', this.checkValueOnUpdate);
            input.addEventListener('blur', this.checkValueOnUpdate);
            input.addEventListener('focus', this.clearError);
        });
    }

    handleSubmit() {
        this.submit.onclick = (e) => {
            e.preventDefault();
            this.submit.classList.add(bemGetMod('button', 'performing'));

            let data = new FormData(this.el);

            axios({method: this.el.method, url: this.el.action, data: data})
                .then((response) => {
                    let result = response.data;
                    if (result.result) {
                        this.submit.classList.add(bemGetMod('button', 'success'));
                        this.submit.querySelector('.check-icon').classList.add(bemGetMod('check-icon', 'active'));
                    }

                    if (result.redirectPath) {
                        window.location.href = result.redirectPath;
                    }
                })
                .catch((error) => {
                    let data = error.response.data;
                    if (data.errors) {
                        this.drawErrors(data.errors);
                    }
                })
                .finally(() => {
                    this.submit.classList.remove(bemGetMod('button', 'performing'));
                });
        };
    }

    checkValueOnUpdate(e) {
        let inputField = e.target.closest('.input-field');
        inputField.classList.toggle(bemGetMod('input-field', 'has-value'), !!e.target.value);
        if (!!e.target.value) {
            inputField.classList.remove()
        }
    }

    clearError(e) {
        let inputField = e.target.closest('.input-field');
        inputField.classList.remove(bemGetMod('input-field', 'has-error'));
        inputField.querySelector('.' + bemGetElement('input-field', 'error')).innerText = '';
    }

    drawErrors(errors) {
        Object.keys(errors).forEach((field) => {
            let input = this.el.querySelector('input[name="' + field + '"]').closest('.input-field');
            input.classList.add(bemGetMod('input-field', 'has-error'));

            let error = input.parentElement.querySelector('.' + bemGetMod('error', field));
            error.innerText = errors[field].join(' ');
        });
    }
}