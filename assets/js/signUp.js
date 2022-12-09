import { initHeader } from './components/Header.js';
import { isLogin } from './helpers/LoginStatus.js';
import { signUp } from './helpers/API';
import * as notify from './helpers/Notify.js';

const bindEvents = () => {
    const signUpForm = document.querySelector('#signUpForm');

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const { nickname, email, password, passwordConfirm } = data;

        if (!nickname || !email || !password || !passwordConfirm) {
            notify.showError('請填寫所有欄位')
            return;
        }

        if (password !== passwordConfirm) {
            notify.showError('密碼兩次輸入不同')
            return;
        }

        signUp({ nickname, email, password }).then((res) => {

            const { isSuccess, message, userInfo } = res;

            if (!isSuccess) {
                notify.showError(message)
                return;
            }

            // 存入localStorage
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            notify.showSuccess(message)
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1000)
        })

    })
}

const init = () => {
    initHeader(isLogin);
    bindEvents();
}

init();