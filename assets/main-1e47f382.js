(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function Mt(t,e){t.indexOf(e)===-1&&t.push(e)}const vt=(t,e,n)=>Math.min(Math.max(n,t),e),y={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},A=t=>typeof t=="number",P=t=>Array.isArray(t)&&!A(t[0]),Wt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function Rt(t,e){return P(t)?t[Wt(0,t.length,e)]:t}const wt=(t,e,n)=>-n*t+n*e+t,bt=()=>{},w=t=>t,K=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function xt(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=K(0,e,i);t.push(wt(n,1,s))}}function Et(t){const e=[0];return xt(e,t-1),e}function Ot(t,e=Et(t.length),n=w){const i=t.length,s=i-e.length;return s>0&&xt(e,s),r=>{let o=0;for(;o<i-2&&!(r<e[o+1]);o++);let a=vt(0,1,K(e[o],e[o+1],r));return a=Rt(n,o)(a),wt(t[o],t[o+1],a)}}const St=t=>Array.isArray(t)&&A(t[0]),Q=t=>typeof t=="object"&&Boolean(t.createAnimation),b=t=>typeof t=="function",it=t=>typeof t=="string",H={ms:t=>t*1e3,s:t=>t/1e3};function Ft(t,e){return e?t*(1e3/e):0}const Tt=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Ht=1e-7,Vt=12;function _t(t,e,n,i,s){let r,o,a=0;do o=e+(n-e)/2,r=Tt(o,i,s)-t,r>0?n=o:e=o;while(Math.abs(r)>Ht&&++a<Vt);return o}function F(t,e,n,i){if(t===e&&n===i)return w;const s=r=>_t(r,0,1,t,n);return r=>r===0||r===1?r:Tt(s(r),e,i)}const qt=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return vt(0,1,s/t)},ct={ease:F(.25,.1,.25,1),"ease-in":F(.42,0,1,1),"ease-in-out":F(.42,0,.58,1),"ease-out":F(0,0,.58,1)},jt=/\((.*?)\)/;function Y(t){if(b(t))return t;if(St(t))return F(...t);if(ct[t])return ct[t];if(t.startsWith("steps")){const e=jt.exec(t);if(e){const n=e[1].split(",");return qt(parseFloat(n[0]),n[1].trim())}}return w}class At{constructor(e,n=[0,1],{easing:i,duration:s=y.duration,delay:r=y.delay,endDelay:o=y.endDelay,repeat:a=y.repeat,offset:f,direction:l="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=w,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((d,c)=>{this.resolve=d,this.reject=c}),i=i||y.easing,Q(i)){const d=i.createAnimation(n);i=d.easing,n=d.keyframes||n,s=d.duration||s}this.repeat=a,this.easing=P(i)?w:Y(i),this.updateDuration(s);const u=Ot(n,f,P(i)?i.map(Y):w);this.tick=d=>{var c;r=r;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(d-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const I=m/this.duration;let D=Math.floor(I),x=I%1;!x&&I>=1&&(x=1),x===1&&D--;const q=D%2;(l==="reverse"||l==="alternate"&&q||l==="alternate-reverse"&&!q)&&(x=1-x);const M=m>=this.totalDuration?1:Math.min(x,1),z=u(this.easing(M));e(z),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+o)?(this.playState="finished",(c=this.resolve)===null||c===void 0||c.call(this,z)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class $t{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const G=new WeakMap;function zt(t){return G.has(t)||G.set(t,{transforms:[],values:new Map}),G.get(t)}function Bt(t,e){return t.has(e)||t.set(e,new $t),t.get(e)}const Ct=["","X","Y","Z"],Nt=["translate","scale","rotate","skew"],U={x:"translateX",y:"translateY",z:"translateZ"},lt={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Ut={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:lt,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:w},skew:lt},_=new Map,st=t=>`--motion-${t}`,k=["x","y","z"];Nt.forEach(t=>{Ct.forEach(e=>{k.push(t+e),_.set(st(t+e),Ut[t])})});const kt=(t,e)=>k.indexOf(t)-k.indexOf(e),Kt=new Set(k),Lt=t=>Kt.has(t),Gt=(t,e)=>{U[e]&&(e=U[e]);const{transforms:n}=zt(t);Mt(n,e),t.style.transform=Xt(n)},Xt=t=>t.sort(kt).reduce(Zt,"").trim(),Zt=(t,e)=>`${t} ${e}(var(${st(e)}))`,tt=t=>t.startsWith("--"),ut=new Set;function Jt(t){if(!ut.has(t)){ut.add(t);try{const{syntax:e,initialValue:n}=_.has(t)?_.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const X=(t,e)=>document.createElement("div").animate(t,e),ft={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{X({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(X({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{X({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},Z={},L={};for(const t in ft)L[t]=()=>(Z[t]===void 0&&(Z[t]=ft[t]()),Z[t]);const Qt=.015,Yt=(t,e)=>{let n="";const i=Math.round(e/Qt);for(let s=0;s<i;s++)n+=t(K(0,i-1,s))+", ";return n.substring(0,n.length-2)},dt=(t,e)=>b(t)?L.linearEasing()?`linear(${Yt(t,e)})`:y.easing:St(t)?te(t):t,te=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function ee(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const ne=t=>Array.isArray(t)?t:[t];function et(t){return U[t]&&(t=U[t]),Lt(t)?st(t):t}const B={get:(t,e)=>{e=et(e);let n=tt(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=_.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=et(e),tt(e)?t.style.setProperty(e,n):t.style[e]=n}};function Pt(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function ie(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||w;const s=t[t.length-1];if(it(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=o=>o+r)}return i}function se(){return window.__MOTION_DEV_TOOLS_RECORD}function re(t,e,n,i={},s){const r=se(),o=i.record!==!1&&r;let a,{duration:f=y.duration,delay:l=y.delay,endDelay:u=y.endDelay,repeat:d=y.repeat,easing:c=y.easing,persist:m=!1,direction:I,offset:D,allowWebkitAcceleration:x=!1}=i;const q=zt(t),M=Lt(e);let z=L.waapi();M&&Gt(t,e);const v=et(e),j=Bt(q.values,v),E=_.get(v);return Pt(j.animation,!(Q(c)&&j.generator)&&i.record!==!1),()=>{const $=()=>{var h,W;return(W=(h=B.get(t,v))!==null&&h!==void 0?h:E==null?void 0:E.initialValue)!==null&&W!==void 0?W:0};let g=ee(ne(n),$);const at=ie(g,E);if(Q(c)){const h=c.createAnimation(g,e!=="opacity",$,v,j);c=h.easing,g=h.keyframes||g,f=h.duration||f}if(tt(v)&&(L.cssRegisterProperty()?Jt(v):z=!1),M&&!L.linearEasing()&&(b(c)||P(c)&&c.some(b))&&(z=!1),z){E&&(g=g.map(T=>A(T)?E.toDefaultUnit(T):T)),g.length===1&&(!L.partialKeyframes()||o)&&g.unshift($());const h={delay:H.ms(l),duration:H.ms(f),endDelay:H.ms(u),easing:P(c)?void 0:dt(c,f),direction:I,iterations:d+1,fill:"both"};a=t.animate({[v]:g,offset:D,easing:P(c)?c.map(T=>dt(T,f)):void 0},h),a.finished||(a.finished=new Promise((T,Dt)=>{a.onfinish=T,a.oncancel=Dt}));const W=g[g.length-1];a.finished.then(()=>{m||(B.set(t,v,W),a.cancel())}).catch(bt),x||(a.playbackRate=1.000001)}else if(s&&M)g=g.map(h=>typeof h=="string"?parseFloat(h):h),g.length===1&&g.unshift(parseFloat($())),a=new s(h=>{B.set(t,v,at?at(h):h)},g,Object.assign(Object.assign({},i),{duration:f,easing:c}));else{const h=g[g.length-1];B.set(t,v,E&&A(h)?E.toDefaultUnit(h):h)}return o&&r(t,e,g,{duration:f,delay:l,easing:c,repeat:d,offset:D},"motion-one"),j.setAnimation(a),a}}const oe=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function rt(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const ae=t=>t(),It=(t,e,n=y.duration)=>new Proxy({animations:t.map(ae).filter(Boolean),duration:n,options:e},le),ce=t=>t.animations[0],le={get:(t,e)=>{const n=ce(t);switch(e){case"duration":return t.duration;case"currentTime":return H.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(ue)).catch(bt)),t.finished;case"stop":return()=>{t.animations.forEach(i=>Pt(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=H.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},ue=t=>t.finished;function fe(t=.1,{start:e=0,from:n=0,easing:i}={}){return(s,r)=>{const o=A(n)?n:de(n,r),a=Math.abs(o-s);let f=t*a;if(i){const l=r*t;f=Y(i)(f/l)*l}return e+f}}function de(t,e){if(t==="first")return 0;{const n=e-1;return t==="last"?n:n/2}}function he(t,e,n){return b(t)?t(e,n):t}function ge(t){return function(n,i,s={}){n=rt(n);const r=n.length,o=[];for(let a=0;a<r;a++){const f=n[a];for(const l in i){const u=oe(s,l);u.delay=he(u.delay,a,r);const d=re(f,l,i[l],u,t);o.push(d)}}return It(o,s,s.duration)}}const pe=ge(At);function me(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(t);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(t,i[s])&&(n[i[s]]=t[i[s]]);return n}const ye={any:0,all:1};function S(t,e,{root:n,margin:i,amount:s="any"}={}){if(typeof IntersectionObserver>"u")return()=>{};const r=rt(t),o=new WeakMap,a=l=>{l.forEach(u=>{const d=o.get(u.target);if(u.isIntersecting!==Boolean(d))if(u.isIntersecting){const c=e(u);b(c)?o.set(u.target,c):f.unobserve(u.target)}else d&&(d(u),o.delete(u.target))})},f=new IntersectionObserver(a,{root:n,rootMargin:i,threshold:typeof s=="number"?s:ye[s]});return r.forEach(l=>f.observe(l)),()=>f.disconnect()}const C=new WeakMap;let O;function ve(t,e){if(e){const{inlineSize:n,blockSize:i}=e[0];return{width:n,height:i}}else return t instanceof SVGElement&&"getBBox"in t?t.getBBox():{width:t.offsetWidth,height:t.offsetHeight}}function we({target:t,contentRect:e,borderBoxSize:n}){var i;(i=C.get(t))===null||i===void 0||i.forEach(s=>{s({target:t,contentSize:e,get size(){return ve(t,n)}})})}function be(t){t.forEach(we)}function xe(){typeof ResizeObserver>"u"||(O=new ResizeObserver(be))}function Ee(t,e){O||xe();const n=rt(t);return n.forEach(i=>{let s=C.get(i);s||(s=new Set,C.set(i,s)),s.add(e),O==null||O.observe(i)}),()=>{n.forEach(i=>{const s=C.get(i);s==null||s.delete(e),s!=null&&s.size||O==null||O.unobserve(i)})}}const N=new Set;let V;function Oe(){V=()=>{const t={width:window.innerWidth,height:window.innerHeight},e={target:window,size:t,contentSize:t};N.forEach(n=>n(e))},window.addEventListener("resize",V)}function Se(t){return N.add(t),V||Oe(),()=>{N.delete(t),!N.size&&V&&(V=void 0)}}function Te(t,e){return b(t)?Se(t):Ee(t,e)}const Ae=50,ht=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),ze=()=>({time:0,x:ht(),y:ht()}),Le={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function gt(t,e,n,i){const s=n[e],{length:r,position:o}=Le[e],a=s.current,f=n.time;s.current=t["scroll"+o],s.scrollLength=t["scroll"+r]-t["client"+r],s.offset.length=0,s.offset[0]=0,s.offset[1]=s.scrollLength,s.progress=K(0,s.scrollLength,s.current);const l=i-f;s.velocity=l>Ae?0:Ft(s.current-a,l)}function Pe(t,e,n){gt(t,"x",e,n),gt(t,"y",e,n),e.time=n}function Ie(t,e){let n={x:0,y:0},i=t;for(;i&&i!==e;)if(i instanceof HTMLElement)n.x+=i.offsetLeft,n.y+=i.offsetTop,i=i.offsetParent;else if(i instanceof SVGGraphicsElement&&"getBBox"in i){const{top:s,left:r}=i.getBBox();for(n.x+=r,n.y+=s;i&&i.tagName!=="svg";)i=i.parentNode}return n}const De={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},nt={start:0,center:.5,end:1};function pt(t,e,n=0){let i=0;if(nt[t]!==void 0&&(t=nt[t]),it(t)){const s=parseFloat(t);t.endsWith("px")?i=s:t.endsWith("%")?t=s/100:t.endsWith("vw")?i=s/100*document.documentElement.clientWidth:t.endsWith("vh")?i=s/100*document.documentElement.clientHeight:t=s}return A(t)&&(i=e*t),n+i}const Me=[0,0];function We(t,e,n,i){let s=Array.isArray(t)?t:Me,r=0,o=0;return A(t)?s=[t,t]:it(t)&&(t=t.trim(),t.includes(" ")?s=t.split(" "):s=[t,nt[t]?t:"0"]),r=pt(s[0],n,i),o=pt(s[1],e),r-o}const Re={x:0,y:0};function Fe(t,e,n){let{offset:i=De.All}=n;const{target:s=t,axis:r="y"}=n,o=r==="y"?"height":"width",a=s!==t?Ie(s,t):Re,f=s===t?{width:t.scrollWidth,height:t.scrollHeight}:{width:s.clientWidth,height:s.clientHeight},l={width:t.clientWidth,height:t.clientHeight};e[r].offset.length=0;let u=!e[r].interpolate;const d=i.length;for(let c=0;c<d;c++){const m=We(i[c],l[o],f[o],a[r]);!u&&m!==e[r].interpolatorOffsets[c]&&(u=!0),e[r].offset[c]=m}u&&(e[r].interpolate=Ot(Et(d),e[r].offset),e[r].interpolatorOffsets=[...e[r].offset]),e[r].progress=e[r].interpolate(e[r].current)}function He(t,e=t,n){if(n.x.targetOffset=0,n.y.targetOffset=0,e!==t){let i=e;for(;i&&i!=t;)n.x.targetOffset+=i.offsetLeft,n.y.targetOffset+=i.offsetTop,i=i.offsetParent}n.x.targetLength=e===t?e.scrollWidth:e.clientWidth,n.y.targetLength=e===t?e.scrollHeight:e.clientHeight,n.x.containerLength=t.clientWidth,n.y.containerLength=t.clientHeight}function Ve(t,e,n,i={}){const s=i.axis||"y";return{measure:()=>He(t,i.target,n),update:r=>{Pe(t,n,r),(i.offset||i.target)&&Fe(t,n,i)},notify:b(e)?()=>e(n):_e(e,n[s])}}function _e(t,e){return t.pause(),t.forEachNative((n,{easing:i})=>{var s,r;if(n.updateDuration)i||(n.easing=w),n.updateDuration(1);else{const o={duration:1e3};i||(o.easing="linear"),(r=(s=n.effect)===null||s===void 0?void 0:s.updateTiming)===null||r===void 0||r.call(s,o)}}),()=>{t.currentTime=e.progress}}const R=new WeakMap,mt=new WeakMap,J=new WeakMap,yt=t=>t===document.documentElement?window:t;function ot(t,e={}){var{container:n=document.documentElement}=e,i=me(e,["container"]);let s=J.get(n);s||(s=new Set,J.set(n,s));const r=ze(),o=Ve(n,t,r,i);if(s.add(o),!R.has(n)){const l=()=>{const d=performance.now();for(const c of s)c.measure();for(const c of s)c.update(d);for(const c of s)c.notify()};R.set(n,l);const u=yt(n);window.addEventListener("resize",l,{passive:!0}),n!==document.documentElement&&mt.set(n,Te(n,l)),u.addEventListener("scroll",l,{passive:!0})}const a=R.get(n),f=requestAnimationFrame(a);return()=>{var l;typeof t!="function"&&t.stop(),cancelAnimationFrame(f);const u=J.get(n);if(!u||(u.delete(o),u.size))return;const d=R.get(n);R.delete(n),d&&(yt(n).removeEventListener("scroll",d),(l=mt.get(n))===null||l===void 0||l(),window.removeEventListener("resize",d))}}function qe(t,e={}){return It([()=>{const n=new At(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function p(t,e,n){return(b(t)?qe:pe)(t,e,n)}S(".tracking-in-expand",()=>{p(".tracking-in-expand",{x:[-2e3,0]},{duration:2})});S(".fotogalleryinview",({target:t})=>{p(t.querySelectorAll("img"),{x:[-2e3,0]},{duration:1,delay:fe(1,{start:.25})})});S(".mangeelementerinview",()=>{p(".mangeelementer1",{x:[-2e3,0]},{duration:2}),p(".mangeelementer2",{x:[-1500,0]},{duration:2}),p(".mangeelementer3",{x:[-1e3,0]},{duration:2}),p(".mangeelementer4",{x:[-500,0]},{duration:2}),p(".mangeelementer5",{x:[-2e3,0]},{duration:2}),p(".mangeelementer6",{x:[2e3,0]},{duration:2})});p("body",{opacity:[0,1]},{duration:4});S(".box1",()=>{p(".box1",{x:[-2e3,0]},{duration:3})});S(".box2",()=>{p(".box2",{x:[2e3,0]},{duration:3})});S(".box3",()=>{p(".box3",{x:[-2e3,0]},{duration:3})});S(".box4",()=>{p(".box4",{y:[-2e3,0]},{duration:2})});S(".box5",()=>{p(".box5",{y:[2e3,0]},{duration:3})});ot(p(".progress",{strokeDasharray:["0,1","1,1"]}));ot(p(".scrollzoomimg",{scale:[1,1.5]}),{target:document.querySelector(".scrollzoom"),offset:["0.5 0.5","1 1"]});const je=document.querySelectorAll("#horisontalliste li");ot(p("#horisontalliste",{transform:["none",`translateX(-${je.length-1}00vw)`]}),{target:document.querySelector("#horisontalscrollsection")});
