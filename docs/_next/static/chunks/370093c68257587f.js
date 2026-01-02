(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89954,e=>{"use strict";var o=e.i(43476),r=e.i(71645),t=e.i(18566),i=e.i(97053),a=e.i(37517),d=e.i(25636);let s=i.createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  body {
    overflow-x: hidden;
  }
`,n=i.keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`,l=i.keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`,p=i.keyframes`
  to {
    transform: rotate(360deg);
  }
`,c=i.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;

    /* 渐变背景 + 动画 */
    background: ${({isDarkMode:e})=>e?"linear-gradient(-45deg, #1e1b4b, #312e81, #4c1d95, #0f172a)":"linear-gradient(-45deg, #6366f1, #8b5cf6, #ec4899, #23a6d5)"};
    background-size: 400% 400%;
    animation: ${n} 15s ease infinite;
    position: relative;
    overflow: hidden;
`,f=i.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  position: absolute;
  top: ${({top:e})=>e};
  left: ${({left:e})=>e};
  width: ${({size:e})=>e}px;
  height: ${({size:e})=>e}px;
  background: ${({color:e})=>e};
  border-radius: 50%;
  opacity: ${({isDarkMode:e})=>e?.2:.3};
  animation: ${l} ${({delay:e})=>5+e}s ease-in-out infinite;
  z-index: 1;
`,g=i.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    z-index: 3;
    backdrop-filter: blur(5px);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`,u=i.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    background: ${({isDarkMode:e})=>e?"rgba(15, 23, 42, 0.95)":"rgba(255, 255, 255, 0.95)"};
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(10px);
    border: ${({isDarkMode:e})=>e?"1px solid rgba(75, 85, 99, 0.3)":"1px solid rgba(255, 255, 255, 0.2)"};
`,h=i.default.h1.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    text-align: center;
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
    margin: 0 0 30px 0;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.5px;
`,x=i.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`,b=i.default.label.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
  font-size: 14px;
  color: ${({isDarkMode:e})=>e?"#f9fafb":"#374151"};
  font-weight: 500;
`,m=i.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    position: relative;
`,w=i.default.input.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    padding: 14px 16px;
    border: 1px solid ${({isDarkMode:e})=>e?"#475569":"#d1d5db"};
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.2s ease;
    background: ${({isDarkMode:e})=>e?"rgba(30, 41, 59, 0.8)":"rgba(255, 255, 255, 0.8)"};
    color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
    width: 100%;

    &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    &::placeholder {
        color: ${({isDarkMode:e})=>e?"#9ca3af":"#6b7280"};
        opacity: 0.8;
    }
`,k=i.default.button.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: ${({isDarkMode:e})=>e?"#9ca3af":"#6b7280"};
    cursor: pointer;
    font-size: 18px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${({isDarkMode:e})=>e?"#f9fafb":"#111827"};
    }
`,y=i.default.div.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: -10px 0 15px 0;
`,M=i.default.input.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    width: 16px;
    height: 16px;
    accent-color: #6366f1;
    cursor: pointer;
`,j=i.default.label.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    font-size: 14px;
    color: ${({isDarkMode:e})=>e?"#9ca3af":"#6b7280"};
    cursor: pointer;
`,D=i.default.p.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    color: ${({isDarkMode:e})=>e?"#f87171":"#ef4444"};
    font-size: 14px;
    margin: -10px 0 15px 0;
    text-align: center;
    min-height: 18px;
`,v=i.default.button.withConfig({shouldForwardProp:e=>"isLoading"!==e})`
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
        background: linear-gradient(90deg, #4f46e5, #7c3aed);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }

    /* 加载动画 */
    &::after {
        content: '';
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        border-top-color: white;
        animation: ${p} 1s linear infinite;
        display: ${({isLoading:e})=>e?"block":"none"};
    }
`,$=i.default.p.withConfig({shouldForwardProp:e=>"isDarkMode"!==e})`
    text-align: center;
    color: ${({isDarkMode:e})=>e?"#9ca3af":"#6b7280"};
    font-size: 14px;
    margin: 20px 0 0 0;

    span {
        color: #6366f1;
        font-weight: 500;
    }
`;function C(){let[e,i]=(0,r.useState)(""),[n,l]=(0,r.useState)(""),[p,C]=(0,r.useState)(""),[z,P]=(0,r.useState)(!1),[F,S]=(0,r.useState)(!1),[L,O]=(0,r.useState)(!1),U=(0,t.useRouter)(),{login:Y,isLoggedIn:I,isDarkerMode:T,setDarkerMode:A}=(0,a.useAppBaseState)(),B=(0,d.useMessage)();(0,r.useEffect)(()=>{I&&U.push("/dashboard");let e=localStorage.getItem("rememberedUser");if(e){let{username:o}=JSON.parse(e);i(o),O(!0)}},[I,U]);let N=async o=>{if(o.preventDefault(),!e||!n)return void C("Please enter username and password!");try{P(!0),C(""),await Y(e,n)?(B.success("Login successfully"),L?localStorage.setItem("rememberedUser",JSON.stringify({username:e})):localStorage.removeItem("rememberedUser"),U.push("/dashboard")):(B.error("Login failed"),C("Wrong Credentials!"))}catch(e){C("Login failed!"),console.error("登录异常：",e)}finally{P(!1)}};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s,{}),(0,o.jsxs)(c,{isDarkMode:T,children:[(0,o.jsx)(g,{onClick:()=>{let e=!T;A(e),localStorage.setItem("darkMode",JSON.stringify(e))},children:T?"🌙":"☀️"}),[{size:10,top:"10%",left:"10%",delay:0,color:"#6366f1"},{size:15,top:"20%",left:"80%",delay:1,color:"#8b5cf6"},{size:8,top:"80%",left:"20%",delay:2,color:"#ec4899"},{size:12,top:"70%",left:"70%",delay:3,color:"#23a6d5"},{size:18,top:"40%",left:"40%",delay:4,color:"#6366f1"},{size:6,top:"90%",left:"90%",delay:5,color:"#8b5cf6"}].map((e,r)=>(0,o.jsx)(f,{size:e.size,top:e.top,left:e.left,delay:e.delay,color:e.color,isDarkMode:T},r)),(0,o.jsx)(u,{isDarkMode:T,children:(0,o.jsxs)("form",{onSubmit:N,children:[(0,o.jsx)(h,{isDarkMode:T,children:"Login Now"}),(0,o.jsxs)(x,{children:[(0,o.jsx)(b,{isDarkMode:T,children:"username"}),(0,o.jsx)(w,{type:"text",value:e,onChange:e=>i(e.target.value),disabled:z,placeholder:"please enter username",isDarkMode:T})]}),(0,o.jsxs)(x,{children:[(0,o.jsx)(b,{isDarkMode:T,children:"password"}),(0,o.jsxs)(m,{children:[(0,o.jsx)(w,{type:F?"text":"password",value:n,onChange:e=>l(e.target.value),disabled:z,placeholder:"please input your password",isDarkMode:T}),(0,o.jsx)(k,{type:"button",onClick:()=>S(!F),disabled:z,isDarkMode:T,children:F?"🙈":"👁️"})]})]}),(0,o.jsxs)(y,{children:[(0,o.jsx)(M,{type:"checkbox",id:"remember",checked:L,onChange:e=>O(e.target.checked),disabled:z}),(0,o.jsx)(j,{htmlFor:"remember",isDarkMode:T,children:"remember username"})]}),(0,o.jsx)(D,{isDarkMode:T,children:p}),(0,o.jsx)(v,{type:"submit",disabled:z,isLoading:z,children:z?"Opearting....":"Login"}),(0,o.jsxs)($,{isDarkMode:T,children:["Test Account：",(0,o.jsx)("span",{children:"admin"})," / Password：",(0,o.jsx)("span",{children:"admin"})]})]})})]})]})}e.s(["default",()=>C])},66448,e=>{e.v(e=>Promise.resolve().then(()=>e(88014)))}]);