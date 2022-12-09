import { initHeader } from './components/Header.js';
import { isLogin, checkStatus } from './helpers/LoginStatus.js';
import { getView, updateView, addView } from './helpers/API.js';
import { showError, showSuccess } from './helpers/Notify';
import random from '../random.json';

const isAdmin = true;

let view = {
    id: '',
    info: '',
    getID: function () {
        let url = new URL(window.location.href);
        this.id = url.searchParams.get("id");

        if (this.id) {
            this.getInfo();
            document.querySelector('#btnFill').style.display = 'none';
        }
    },
    getInfo: async function () {
        console.log(this.id);
        let { isSuccess, message, view } = await getView(this.id);

        if (isSuccess) {
            this.info = view;
            await this.render();
        } else {
            showError(message).then(() => {
                window.location.href = '/admin.html';
            });
        }
    },
    render: function () {
        const inputName = document.querySelector('#name');
        const inputContent = document.querySelector('#content');
        const inputImage = document.querySelector('#image');

        inputName.value = this.info.name;
        inputContent.value = this.info.content;
        inputImage.value = this.info.image;
    },
    checkInput: function (data) {
        const { name, content, image } = data;

        if (!name || !content || !image) {
            showError('請填寫所有欄位');
            return;
        }
    },
    bindEvent: function () {
        const viewForm = document.querySelector('#viewForm');
        viewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            this.checkInput(data);

            if (this.id) {
                data.id = this.id;
                updateView(data).then(res => {
                    this.callback(res);
                }).catch(err => {
                    showError(err.message);
                });
            } else {
                addView(data).then(res => {
                    this.callback(res);
                }).catch(err => {
                    showError(err.message);
                });
            }
        });

        const btnFill = document.querySelector('#btnFill');
        btnFill.addEventListener('click', (e) => {
            e.preventDefault();

            let randomIndex = Math.floor(Math.random() * random.length);
            let randomData = random[randomIndex];

            document.querySelector('#name').value = randomData.name;
            document.querySelector('#content').value = randomData.content;
            document.querySelector('#image').value = randomData.image;
        })
    },
    callback: function (res) {
        const { isSuccess, message, viewID } = res;
        if (isSuccess) {
            showSuccess(message).then(() => {
                window.location.href = `/admin.html`;
            })
        } else {
            showError(res.message);
        }
    }

};




const init = () => {
    checkStatus();
    initHeader(isLogin);
    view.getID();
    view.bindEvent();
}

init();