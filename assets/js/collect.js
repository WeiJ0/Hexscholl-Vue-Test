import { initHeader } from './components/Header.js';
import { isLogin, checkStatus } from './helpers/LoginStatus.js';
import { getCollects, collectView } from './helpers/API.js';
import { showError, showConfirm, showSuccess } from './helpers/Notify.js';

let collect = {
    list: [],
    getList: async function () {
        getCollects().then((res) => {
            console.log(res);
            const { isSuccess, message, collects } = res;

            if (!isSuccess) {
                showError(message);
                return;
            }
            this.list = collects;
            this.render();
        })
    },
    render: function () {

        const spanCnt = document.querySelector('#spanCnt');
        spanCnt.textContent = this.list.length;

        const tbody = document.querySelector('#collectTable > tbody');
        let html = '';

        this.list.forEach(view => {
            const { id, name, content, image } = view.Views;
            html += `
                <tr>
                    <td>
                        <a href="view.html?id=${id}">${name}</a>
                    </td>
                    <td>${content.slice(0, 50)}</td>
                    <td>
                        <img src="${image}" class="w-100 img-fluid" alt="${name}" width="100">
                    </td>
                    <td>
                        <button class="cancelBtn btn btn-danger" data-id="${id}">取消收藏</button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
        this.bindEvent();
    },
    bindEvent: function () {
        const cancelBtns = document.querySelectorAll('.cancelBtn');
        cancelBtns.forEach(async (btn) => {
            btn.addEventListener('click', async e => {
                const id = e.target.dataset.id;
                showConfirm('確定要取消收藏嗎？').then(async result => {
                    if (result.isConfirmed) {
                        let { isSuccess, message } = await collectView(id);
                        if (isSuccess) {
                            showSuccess(message);
                            this.getList();
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
    initHeader(isLogin);
    checkStatus();
    collect.getList();
}

init();