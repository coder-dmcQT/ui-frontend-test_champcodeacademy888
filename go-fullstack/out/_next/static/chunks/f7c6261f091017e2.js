(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,35353,e=>{"use strict";let r;var o=e.i(43476),i=e.i(71645),a=e.i(18566),t=e.i(97053),d=e.i(37517);let n=t.createGlobalStyle`
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .dialog-overlay.show {
    opacity: 1;
  }

  .dialog-content {
    transform: scale(0.95);
    transition: transform 0.2s ease;
  }

  .dialog-overlay.show .dialog-content {
    transform: scale(1);
  }
`,s=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  background: ${({isDarkMode:e})=>e?"#1e1b4b":"#ffffff"};
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border: ${({isDarkMode:e})=>e?"1px solid #312e81":"1px solid #e5e7eb"};
`,l=t.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
`,c=t.default.h3.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  font-size: 18px;
  font-weight: 600;
  color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
`,f=t.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  background: transparent;
  border: none;
  color: ${({isDarkMode:e})=>e?"#9ca3af":"#6b7280"};
  font-size: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
  }
`,u=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  margin-bottom: 20px;
  font-size: 14px;
  color: ${({isDarkMode:e})=>e?"#d1d5db":"#4b5563"};
  line-height: 1.6;
`,p=t.default.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,h=t.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({type:e,isDarkMode:r})=>"primary"===e?`
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        color: #fff;
        border: none;

        &:hover {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
        }
      `:`
      background: ${r?"#312e81":"#f3f4f6"};
      color: ${r?"#f9fafb":"#374151"};
      border: none;

      &:hover {
        background: ${r?"#2d2b55":"#e5e7eb"};
      }
    `}
`,x=null;async function g(e,r=5){let o="/api/lessons",i=Object.keys(e).reduce((r,o)=>(e[o]&&r.push(`${o}=${encodeURIComponent(e[o])}`),r),[]);i.length>0&&(o+="?"+i.join("&"));try{let i=await fetch(o,{});if(404===i.status){if(0===r)return[];return g(e,r-1)}return(await i.json()).data}catch{}return[]}var b=e.i(25636),k=e.i(85066);let w=t.keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`,m=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({isDarkMode:e})=>e?"rgba(15, 23, 42, 0.6)":"rgba(255, 255, 255, 0.6)"};
    backdrop-filter: blur(2px);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`,y=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    width: 40px;
    height: 40px;
    border: 4px solid ${({isDarkMode:e})=>e?"#312e81":"#e5e7eb"};
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: ${w} 1s linear infinite;
    z-index: 11;
`;function D({visible:e,isDarkMode:r,className:i="",size:a=40}){return e?(0,o.jsx)(m,{isDarkMode:r,className:i,children:(0,o.jsx)(y,{isDarkMode:r,style:{width:a,height:a,borderWidth:a/10}})}):null}async function j(e,r=5){let o=`/api/lessons/take?id=${e.id}&username=${e.username}`;try{let i=await fetch(o);if(400===i.status){if(0===r)return{code:0,error:"retry failed"};return j(e,r-1)}return await i.json()}catch{}return{code:0,error:"There was an error trying to take lesson."}}let M=t.createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    body {
        overflow-x: hidden;
    }
`,v=t.keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`,C=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    display: flex;
    min-height: 100vh;
    background: ${({isDarkMode:e})=>e?"linear-gradient(-45deg, #1e1b4b, #312e81, #4c1d95, #0f172a)":"linear-gradient(-45deg, #f0f4ff, #e6e9ff, #f9e6ff, #e6f7ff)"};
    background-size: 400% 400%;
    animation: ${v} 20s ease infinite;
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
`,$=t.default.header.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: ${({isDarkMode:e})=>e?"#1e1b4b":"rgba(255, 255, 255, 0.9)"};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    z-index: 100;
    backdrop-filter: blur(5px);
    border-bottom: ${({isDarkMode:e})=>e?"1px solid #312e81":"1px solid #e5e7eb"}
`,F=t.default.h1.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    font-size: 22px;
    font-weight: 600;
    color: #6366f1;
`,P=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    display: flex;
    align-items: center;
    gap: 20px;
`,z=t.default.span.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    font-size: 16px;
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#374151"};
`,T=t.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: ${({isDarkMode:e})=>e?"#ef4444":"#fef2f2"};
    color: ${({isDarkMode:e})=>e?"#fff":"#dc2626"};
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${({isDarkMode:e})=>e?"#dc2626":"#fee2e2"};
    }
`,S=t.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-left: 15px;
    backdrop-filter: blur(5px);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`,L=t.default.aside.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    width: 180px;
    background: ${({isDarkMode:e})=>e?"#1e1b4b":"rgba(255, 255, 255, 0.9)"};
    border-right: ${({isDarkMode:e})=>e?"1px solid #312e81":"1px solid #e5e7eb"};
    padding-top: 80px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 90;
`,R=t.default.ul.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    display: flex;
    flex-direction: column;
    gap: 5px;
`,A=t.default.li.withConfig({shouldForwardProp:e=>"isDarkMode"!==e&&"isActive"!==e})`
    button {
        width: 100%;
        padding: 15px 20px;
        text-align: left;
        background: ${({isActive:e,isDarkMode:r})=>e?r?"#312e81":"#f3f4f6":"transparent"};
        border: none;
        color: ${({isDarkMode:e})=>e?"#f9fafb":"#374151"};
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 10px;

        &:hover {
            background: ${({isDarkMode:e})=>e?"#2d2b55":"#f9fafb"};
        }
    }
`,U=t.default.main.withConfig({shouldForwardProp:e=>"isDarkMode"!==e&&"loading"!==e})`
    margin-top: 60px;
    margin-left: 180px;
    padding: 30px;
    flex: 1;
    background: ${({isDarkMode:e})=>e?"rgba(15, 23, 42, 0.8)":"rgba(255, 255, 255, 0.8)"};
    backdrop-filter: blur(10px);
    min-height: 100vh;
    position: relative;
`,B=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    background: ${({isDarkMode:e})=>e?"#1e1b4b":"rgba(255, 255, 255, 0.9)"};
    border: ${({isDarkMode:e})=>e?"1px solid #312e81":"1px solid #e5e7eb"};
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`,E=t.default.label.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    font-size: 14px;
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#374151"};
`,H=t.default.input.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    padding: 6px 12px;
    border: ${({isDarkMode:e})=>e?"1px solid #475569":"1px solid #d1d5db"};
    border-radius: 6px;
    background: ${({isDarkMode:e})=>e?"#0f172a":"#fff"};
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
    font-size: 14px;
`,N=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`,O=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    background: ${({isDarkMode:e})=>e?"#1e1b4b":"rgba(255, 255, 255, 0.9)"};
    border: ${({isDarkMode:e})=>e?"1px solid #312e81":"1px solid #e5e7eb"};
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 280px;
    flex: 1;
    min-width: 200px;
    display: flex;
    flex-direction: column;
`,G=t.default.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`,I=t.default.i.withConfig({shouldForwardProp:e=>"isDarkMode"!==e&&"isMine"!==e})`
    color: ${({isDarkMode:e,isMine:r})=>r?"red":e?"#f9fafb":"#111827"};
    font-size: 14px;
    cursor: pointer;
    margin-right: 9px;
    text-decoration: underline;
`,K=t.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    margin-bottom: 15px;
    font-size: 14px;

    span {
        font-weight: 500;
        color: ${({isDarkMode:e})=>e?"#c7d2fe":"#6366f1"};
    }
`,q=t.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e&&"loading"!==e})`
    width: 100%;
    padding: 10px 0;
    border: none;
    border-radius: 6px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.2s ease;

    &:hover {
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
    }

    &:disabled {
        background: linear-gradient(90deg, #94a3b8, #94a3b8);
        cursor: not-allowed;
    }
`;function V(){let[t,w]=(0,i.useState)("Today"),m=(0,a.useRouter)(),{username:y,logout:v,isLoggedIn:V,isDarkerMode:W,setDarkerMode:Z,hydrated:J}=(0,d.useAppBaseState)(),[Q,X]=(0,i.useState)(!1),[Y,_]=(0,i.useState)([]),ee=(0,b.default)(),er=(0,i.useRef)(!1),eo=(0,i.useRef)(ee),[ei,ea]=(0,i.useState)(""),[et,ed]=(0,i.useState)(""),[en,es]=(0,i.useState)(!1),el=(0,i.useRef)(async()=>{}),ec=(0,i.useRef)(null);(0,i.useEffect)(()=>{eo.current=ee},[ee]);let ef=(0,i.useCallback)(e=>{eo.current.error(e)},[]),eu=(0,i.useCallback)(e=>{eo.current.success(e)},[]),ep=(0,i.useCallback)(function(e){return`${e}T00:00:00Z`},[]);el.current=async()=>{try{X(!0);let e=await g({type:t,startDate:ei?ep(ei):void 0,endDate:et?ep(et):void 0});er.current=!0,_(e)}catch{ef("Error here")}finally{X(!1)}},(0,i.useEffect)(()=>J?(X(!1),V)?(ec.current&&clearTimeout(ec.current),ec.current=setTimeout(()=>{el.current().then(()=>{er.current||(er.current=!0)})},0),()=>{ec.current&&clearTimeout(ec.current)}):void m.push("/login"):void X(!0),[V,m,J,el,ei,et,t]);let eh=(0,i.useCallback)(()=>{Z(!W)},[W,Z]),ex=(0,i.useCallback)(async()=>{(i=>{let a,{title:t,content:d,isDarkMode:g=!1,confirmText:b="Confirm",cancelText:k="Cancel",onConfirm:w,onCancel:m,showCancel:y=!0}=i;x||(x=document.createElement("div"),document.body.appendChild(x));let D=()=>{if(x){let e=x.querySelector(".dialog-overlay");e&&e.classList.remove("show"),setTimeout(()=>{x&&(x.innerHTML="")},200)}},j=async()=>{w&&await w(),D()},M=()=>{m&&m(),D()};return a=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{}),(0,o.jsx)("div",{className:"dialog-overlay show",children:(0,o.jsx)("div",{className:"dialog-content",children:(0,o.jsxs)(s,{isDarkMode:g,children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{isDarkMode:g,children:t}),(0,o.jsx)(f,{isDarkMode:g,onClick:M,children:"×"})]}),(0,o.jsx)(u,{isDarkMode:g,children:d}),(0,o.jsxs)(p,{children:[y&&(0,o.jsx)(h,{type:"default",isDarkMode:g,onClick:M,children:k}),(0,o.jsx)(h,{type:"primary",isDarkMode:g,onClick:j,children:b})]})]})})})]}),e.A(66448).then(({createRoot:e})=>{x&&(r||(r=e(x)),r.render(a))})})({title:"Confirm Logout",content:"Are you sure you want to log out?",isDarkMode:W,confirmText:"Logout",cancelText:"Cancel",async onConfirm(){await v()&&m.push("/login")}})},[W,v,m]),eg=(0,i.useMemo)(()=>[{key:"Historic",label:"Historic Lessons (completed)"},{key:"Upcoming",label:"Upcoming Lessons"},{key:"Available",label:"Available Lessons (open slots)"},{key:"Today",label:"Today’s Lessons"}],[]),eb=async e=>{let r={id:e.id,username:y};try{es(!0);let o=await j(r);console.log("lesson-take",o),200===o.code?(eu(`Lesson ${e.id} successfully successfully.`),_(r=>r.map(r=>r.id===e.id?{...r,students:[...r.students,y]}:r))):(ef(`Lesson ${e.id} failurefully successfully, with error ${o.error}`),console.log("resp here",o))}catch(e){console.log("error here",e)}finally{es(!1)}};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(M,{}),(0,o.jsxs)(C,{isDarkMode:W,children:[(0,o.jsxs)($,{isDarkMode:W,children:[(0,o.jsx)(F,{children:"Tutor Dashboard"}),(0,o.jsxs)(P,{children:[(0,o.jsx)(z,{isDarkMode:W,children:y}),(0,o.jsx)(T,{isDarkMode:W,onClick:ex,children:"Logout"}),(0,o.jsx)(S,{onClick:eh,children:W?"🌙":"☀️"})]})]}),(0,o.jsx)(L,{isDarkMode:W,children:(0,o.jsx)(R,{children:eg.map(e=>(0,o.jsx)(A,{isActive:t===e.key,isDarkMode:W,children:(0,o.jsx)("button",{onClick:()=>w(e.key),children:e.label})},e.key))})}),(0,o.jsxs)(U,{isDarkMode:W,loading:Q,children:[(0,o.jsx)(D,{visible:Q,isDarkMode:W,size:40}),(0,o.jsxs)(B,{isDarkMode:W,children:[(0,o.jsx)(E,{isDarkMode:W,children:"Date Range："}),(0,o.jsx)(H,{value:ei,onChange:function(e){let r=e.target.value;r&&et?new Date(r)<=new Date(et)?ea(r):ef("Start date must predate the end date!"):ea(r)},type:"date",isDarkMode:W}),(0,o.jsx)(H,{value:et,onChange:function(e){let r=e.target.value;if(!r||!ei)return void ed(r);let o=new Date(r);new Date(ei)<=o?ed(r):ef("Start date must predate the end date!")},type:"date",isDarkMode:W})]}),(0,o.jsx)(k.default,{keyValue:t,animationConfig:{initial:{opacity:0,scale:.98},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.98}},children:(0,o.jsx)(N,{children:Y.map((e,r)=>(0,o.jsxs)(O,{isDarkMode:W,children:[(0,o.jsxs)(G,{children:[(0,o.jsxs)(K,{isDarkMode:W,children:[(0,o.jsx)("span",{children:"Date："})," ",e.date.split("T")[0]]}),(0,o.jsxs)(K,{isDarkMode:W,children:[(0,o.jsx)("span",{children:"Time："})," ",e.date.split("T")[1].slice(0,-1)]}),(0,o.jsxs)(K,{isDarkMode:W,children:[(0,o.jsx)("span",{children:"Students："})," ",e.students.map((e,r)=>(0,o.jsxs)(I,{isDarkMode:W,isMine:e===y,children:[e,e===y?"(me)":""]},r))]}),(0,o.jsxs)(K,{isDarkMode:W,children:[(0,o.jsx)("span",{children:"Subject："})," ",e.subject]}),(0,o.jsxs)(K,{isDarkMode:W,children:[(0,o.jsx)("span",{children:"Type："})," ",e.type]})]}),(0,o.jsxs)(q,{onClick:()=>eb(e),loading:en,disabled:e.students.includes(y)||en,isDarkMode:W,children:[(0,o.jsx)(D,{visible:en,isDarkMode:W,size:20}),"Take Lesson"]})]},r))})})]})]})]})}e.s(["default",()=>V],35353)},40862,e=>{e.n(e.i(35353))},66448,e=>{e.v(e=>Promise.resolve().then(()=>e(88014)))}]);