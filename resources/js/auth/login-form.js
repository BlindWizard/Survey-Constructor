import {bemGetElementMod, bemGetMod} from "../common/bem-helper";
import {Form} from "../common/form";

export class LoginForm {
    constructor(el) {
        let tabLoginBtn =  el.querySelector('.tabs-select__item_login');
        let tabRegisterBtn = el.querySelector('.tabs-select__item_register');
        let tabLogin = el.querySelector('.tab_login');
        let tabRegister = el.querySelector('.tab_register');
        let loginForm = tabLogin.querySelector('form');
        let registerForm = tabRegister.querySelector('form');

        new Form(loginForm);
        new Form(registerForm);

        tabLoginBtn.addEventListener('click', () => {
            tabLoginBtn.classList.add(bemGetElementMod('tabs-selector', 'item', 'active'));
            tabRegisterBtn.classList.remove(bemGetElementMod('tabs-selector', 'item', 'active'));

            tabRegister.classList.remove(bemGetMod('tab', 'active'));
            tabLogin.classList.add(bemGetMod('tab', 'active'));
        });

        tabRegisterBtn.addEventListener('click', () => {
            tabRegisterBtn.classList.add(bemGetElementMod('tabs-selector', 'item', 'active'));
            tabLoginBtn.classList.remove(bemGetElementMod('tabs-selector', 'item', 'active'));

            tabLogin.classList.remove(bemGetMod('tab', 'active'));
            tabRegister.classList.add(bemGetMod('tab', 'active'));
        });
    }
}