import { logout } from "../helpers/LoginStatus";

const user = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : null;

export const initHeader = (isLogin) => {
    const header = document.createElement('header');
    let headerItems = '';

    if (isLogin) {
        headerItems = `
        <li class="nav-item mx-3">
            <a class="nav-link" href="./admin.html">前往後台</a>
        </li>
        <li class="nav-item mx-3">
            <a class="nav-link" href="./collect.html">收藏列表</a>
        </li>
        <li class="nav-item mx-3 d-flex align-items-center">
            <span class="mb-0 fw-bold h5"> Hello ! ${user.nickname}</span>
        </li>
        <li class="nav-item mx-3">
            <a id="btnLogout" class="btn btn-outline-danger">登出</a>
        </li>
        `;

    } else {
        headerItems = `
        <li class="nav-item mx-3">
            <a id="btnLogin" class="nav-link" href="./signIn.html">登入</a>
        </li>
        <li class="nav-item mx-3">
            <a class="btn btn-primary" href="./signUp.html" role="button">註冊</a>
        </li>
        `
    }

    header.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container">
        <a class="navbar-brand" href="./index.html">景點介紹</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                ${headerItems}
            </ul>
        </div>
        </div>
    </nav>
    `;
    document.body.prepend(header);

    if(isLogin) {
        const btnLogout = document.querySelector('#btnLogout');
        btnLogout.addEventListener('click', logout);
    }
}