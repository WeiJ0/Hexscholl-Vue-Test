import { initHeader } from './components/Header.js';
import { isLogin } from './helpers/LoginStatus.js';
import { getViews } from './helpers/API.js';

const isAdmin = false;

let views = {
    list: [],
    getViews: async function () {
        const result = await getViews(isAdmin);
        const { isSuccess, message, views } = result;
        if (!isSuccess)
            showError(result.message);
        else {
            this.list = result.views;
            this.render();
        }
    },
    render: function () {
        let viewList = document.querySelector('#viewList');
        viewList.innerHTML = '';
        let html = '';
        this.list.forEach(view => {
            const { id, name, content, image } = view;
            html += `
                        <div class="col-6 col-md-3">
                            <div class="card">
                                <a class="text-decoration-none" href="./view.html?id=${id}">
                                    <img src="${image}" class="card-img-top" style="height: 200px; max-width: 100%" alt="${name}">
                                    <div class="card-body">
                                        <h4 class="text-center card-title h5">${name}</h4>
                                        <p class="card-text">${content.slice(0, 50)}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
        });
        viewList.innerHTML = html;
    }
}

const init = () => {
    initHeader(isLogin);
    views.getViews();
}

init();