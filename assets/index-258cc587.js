import{i as l,g as r,a as o}from"./API-424af6de.js";const d=!1;let h={list:[],getViews:async function(){const s=await r(d),{isSuccess:e,message:i,views:t}=s;e?(this.list=s.views,this.render()):showError(s.message)},render:function(){let s=document.querySelector("#viewList");s.innerHTML="";let e="";this.list.forEach(i=>{const{id:t,name:c,content:a,image:n}=i;e+=`
                        <div class="col-6 col-md-3">
                            <div class="card">
                                <a class="text-decoration-none" href="./view.html?id=${t}">
                                    <img src="${n}" class="card-img-top" style="height: 200px; max-width: 100%" alt="${c}">
                                    <div class="card-body">
                                        <h4 class="text-center card-title h5">${c}</h4>
                                        <p class="card-text">${a.slice(0,50)}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `}),s.innerHTML=e}};const m=()=>{l(o),h.getViews()};m();
