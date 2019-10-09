export class LoginForm {
    constructor(form) {
        let tabLogin =  form.querySelector('.tabs-select__item_login');
        let tabRegister = form.querySelector('.tabs-select__item_register');

        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('tabs-selector__item_active');
            tabRegister.classList.remove('tabs-selector__item_active');
            
            form.querySelector('.tab_register').classList.remove('tab_active');
            form.querySelector('.tab_login').classList.add('tab_active');
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('tabs-selector__item_active');
            tabLogin.classList.remove('tabs-selector__item_active');
            
            form.querySelector('.tab_login').classList.remove('tab_active');
            form.querySelector('.tab_register').classList.add('tab_active');
        });
    }
}