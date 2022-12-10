import{i as d,c as r,k as h,h as m,a as u}from"./API-cbbf5697.js";import{s as o,a as f,b as g}from"./Notify-514eff47.js";let b={list:[],getList:async function(){h().then(e=>{console.log(e);const{isSuccess:s,message:t,collects:n}=e;if(!s){o(t);return}this.list=n,this.render()})},render:function(){const e=document.querySelector("#spanCnt");e.textContent=this.list.length;const s=document.querySelector("#collectTable > tbody");let t="";this.list.forEach(n=>{const{id:c,name:i,content:a,image:l}=n.Views;t+=`
                <tr>
                    <td>
                        <a href="./view.html?id=${c}">${i}</a>
                    </td>
                    <td>${a.slice(0,50)}</td>
                    <td>
                        <img src="${l}" class="w-100 img-fluid" alt="${i}" width="100">
                    </td>
                    <td>
                        <button class="cancelBtn btn btn-danger" data-id="${c}">取消收藏</button>
                    </td>
                </tr>
            `}),s.innerHTML=t,this.bindEvent()},bindEvent:function(){document.querySelectorAll(".cancelBtn").forEach(async s=>{s.addEventListener("click",async t=>{const n=t.target.dataset.id;f("確定要取消收藏嗎？").then(async c=>{if(c.isConfirmed){let{isSuccess:i,message:a}=await m(n);i?(g(a),this.getList()):o(a)}})})})}};const w=()=>{d(u),r(),b.getList()};w();
