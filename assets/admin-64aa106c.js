import{c as r,i as l,g as h,d as m,a as f}from"./API-424af6de.js";import{s as c,a as w,b as u}from"./Notify-abceee52.js";const g=!0;let b={info:[],getViews:async function(){let{isSuccess:i,message:e,views:t}=await h(g);i?(this.info=t,await this.render()):c(e)},render:function(){const i=document.querySelector("#spanCnt");i.textContent=this.info.length;const e=document.querySelector("#viewTable > tbody");let t="";this.info.forEach(d=>{const{id:s,name:n,content:a,image:o}=d;t+=`
            <tr>
                <td>
                    <a href="./view.html?id=${s}" target="_blank">${n}</a>
                </td>
                <td>${a.slice(0,50)}</td>
                <td>
                    <img src="${o}" class="w-100 img-fluid" alt="${n}" width="100">
                </td>
                <td>
                    <a href="./editView.html?id=${s}" class="btn btn-primary">編輯</a>
                    <button class="delBtn btn btn-danger" data-id="${s}">刪除</button>
                </td>
            </tr>
            `}),e.innerHTML=t,this.bindEvent()},bindEvent:function(){document.querySelectorAll(".delBtn").forEach(async e=>{e.addEventListener("click",async t=>{const d=t.target.dataset.id;w("確定要刪除嗎？").then(async s=>{if(s.isConfirmed){let{isSuccess:n,message:a}=await m(d);n?(u(a),this.getViews()):c(a)}})})})}};const y=()=>{r(),l(f),b.getViews()};y();
