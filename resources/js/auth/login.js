import {LoginForm} from "./login-form";

document.querySelectorAll('.login-form').forEach((form) => {
    new LoginForm(form);
});