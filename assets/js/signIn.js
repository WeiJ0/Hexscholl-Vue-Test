import { initHeader } from './components/Header.js';
import { isLogin } from './helpers/LoginStatus.js';
import { showSuccess, showError } from './helpers/Notify.js';
import { signIn } from './helpers/API.js';

const bindEvents = () => {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const { email, password } = data;

        if (!email || !password) {
            showError('請輸入帳號密碼');
            return;
        }

        signIn(data).then((res) => {
            const { isSuccess, message, userInfo } = res;
            if (!isSuccess) {
                showError(message);
                return;
            }
            showSuccess(message).then(() => {
                // 存入localStorage
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                window.location.href = './index.html';
            });
        })
    })
}

const init = () => {
    initHeader(isLogin);
    bindEvents();
}

init();