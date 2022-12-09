import { initHeader } from './components/Header.js';
import { isLogin } from './helpers/LoginStatus.js';
import { getView, collectView } from './helpers/API.js';
import { showError, showSuccess } from './helpers/Notify.js';

let view = {
    id: '',
    info: {
        name: '',
        content: '',
        image: '',
        isOwner: false,
    },
    getID: function () {
        let url = new URL(window.location.href);
        this.id = url.searchParams.get('id');

        if (!this.id)
            showError('找不到景點').then(() => {
                window.location.href = './index.html';
            });
        else
            this.getInfo();
    },
    getInfo: async function () {
        let result = await getView(this.id);
        const { isSuccess, message, view } = result;
        if (!isSuccess)
            showError(result.message).then(() => {
                window.location.href = './index.html';
            });
        else {
            this.info = result.view;
            this.render();
            this.bindEvent();
        }
    },
    render: function () {
        const { name, content, image, isOwner, Collects } = this.info;
        document.title = name;
        document.querySelector('#viewName').textContent = name;
        document.querySelector('#viewContent').textContent = content;
        document.querySelector('#viewImage').src = image;

        if (!isLogin) {
            document.querySelector('#btnCollect').style.display = 'none';
            return;
        }

        const btnCollect = document.querySelector('#btnCollect');
        if (Collects.length > 0) {
            btnCollect.textContent = '取消收藏';
            btnCollect.classList.add('btn-danger')
            btnCollect.classList.remove('btn-warning')
        }
        else {
            btnCollect.textContent = '收藏';
            btnCollect.classList.add('btn-warning')
            btnCollect.classList.remove('btn-danger')
        }
    },
    bindEvent: function () {
        const btnCollect = document.querySelector('#btnCollect');
        btnCollect.addEventListener('click', (e) => {
            e.preventDefault();
            collectView(this.id).then(res => {
                const { isSuccess, message } = res;
                if (!isSuccess) {
                    showError(message);
                    return;
                }

                showSuccess(message).then(() => {
                    this.getInfo();
                });
            })
        })
    }
}

const init = () => {
    initHeader(isLogin);
    view.getID();
}

init();