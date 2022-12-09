import { initHeader } from './components/Header.js';
import { isLogin, checkStatus } from './helpers/LoginStatus.js';
import { getViews, deleteView } from './helpers/API.js';
import { showError, showConfirm, showSuccess } from './helpers/Notify.js';

const isAdmin = true;

let views = {
    info: [],
    getViews: async function () {
        let { isSuccess, message, views } = await getViews(isAdmin);
        if (isSuccess) {
            this.info = views;
            await this.render();
        } else {
            showError(message);
        }
    },
    render: function () {

        const spanCnt = document.querySelector('#spanCnt');
        spanCnt.textContent = this.info.length;

        const tbody = document.querySelector('#viewTable > tbody');
        let html = '';

        this.info.forEach(view => {
            const { id, name, content, image } = view;
            html += `
            <tr>
                <td>
                    <a href="/view.html?id=${id}" target="_blank">${name}</a>
                </td>
                <td>${content.slice(0, 50)}</td>
                <td>
                    <img src="${image}" class="w-100 img-fluid" alt="${name}" width="100">
                </td>
                <td>
                    <a href="/editView.html?id=${id}" class="btn btn-primary">編輯</a>
                    <button class="delBtn btn btn-danger" data-id="${id}">刪除</button>
                </td>
            </tr>
            `;
        });

        tbody.innerHTML = html;
        this.bindEvent();
    },
    bindEvent: function () {
        const delBtns = document.querySelectorAll('.delBtn');
        delBtns.forEach(async (btn) => {
            btn.addEventListener('click', async e => {
                const id = e.target.dataset.id;
                showConfirm('確定要刪除嗎？').then(async result => {
                    if (result.isConfirmed) {
                        let { isSuccess, message } = await deleteView(id);
                        if (isSuccess) {
                            showSuccess(message);
                            this.getViews();
                        } else {
                            showError(message);
                        }
                    }
                })

            })
        })
    }
}

const init = () => {
    checkStatus();
    initHeader(isLogin);
    views.getViews();
}

init();