import{s as Ee,f as v,a as w,g,h as C,c as S,d as b,A,j as k,B as R,k as Ue,i as ae,x as a,C as F,D as ve,E as we,z as Se,l as Q,m as W,n as ge}from"../chunks/scheduler.74d0f875.js";import{S as ye,i as Be,b as ke,d as Te,m as Ce,a as G,c as Ie,t as Y,e as xe,g as Ve}from"../chunks/index.f316daf3.js";import{N as He,e as X}from"../chunks/Navigation.95c3be35.js";import{j as Pe}from"../chunks/singletons.d1a12230.js";import{T as qe,a as Ne,d as Le}from"../chunks/dungeons.c7ca222f.js";const Ae=Pe("goto");function me(l,n,s){const i=l.slice();return i[11]=n[s],i[13]=s,i}function pe(l,n,s){const i=l.slice();return i[14]=n[s],i}function be(l){let n,s=l[14].name+"",i,d,c,f=l[14].monsters.length+"",T,o,_,y;function O(){return l[6](l[14])}return{c(){n=v("button"),i=Q(s),d=Q(" dungeon "),c=v("br"),T=Q(f),o=Q(`x
						monster
					`),this.h()},l(p){n=g(p,"BUTTON",{class:!0});var h=C(n);i=W(h,s),d=W(h," dungeon "),c=g(h,"BR",{}),T=W(h,f),o=W(h,`x
						monster
					`),h.forEach(b),this.h()},h(){k(n,"class","dungeon-btn svelte-smcyfq")},m(p,h){ae(p,n,h),a(n,i),a(n,d),a(n,c),a(n,T),a(n,o),_||(y=F(n,"click",O),_=!0)},p(p,h){l=p,h&4&&s!==(s=l[14].name+"")&&ge(i,s),h&4&&f!==(f=l[14].monsters.length+"")&&ge(T,f)},d(p){p&&b(n),_=!1,y()}}}function De(l){let n,s,i,d,c,f;s=new qe({props:{direction:l[11]}});function T(){return l[10](l[13])}return{c(){n=v("button"),ke(s.$$.fragment),i=w()},l(o){n=g(o,"BUTTON",{});var _=C(n);Te(s.$$.fragment,_),i=S(_),_.forEach(b)},m(o,_){ae(o,n,_),Ce(s,n,null),a(n,i),d=!0,c||(f=F(n,"click",T),c=!0)},p(o,_){l=o;const y={};_&2&&(y.direction=l[11]),s.$set(y)},i(o){d||(G(s.$$.fragment,o),d=!0)},o(o){Y(s.$$.fragment,o),d=!1},d(o){o&&b(n),xe(s),c=!1,f()}}}function Oe(l){let n,s,i,d,c,f,T,o,_,y='<div>1. select monster</div> <img src="/monster/1_1.jpg" alt="" class="w-full"/>',O,p,h,D="2. select dungeon",Z,x,$,re="ALPH",ee,E,ce="BTC",te,U,ie="ETH",ne,B,j,de="3. Predict price swings",le,P,se,I,ue="Send to Dungeon",q,oe,fe;s=new He({});let M=X(l[2]),m=[];for(let t=0;t<M.length;t+=1)m[t]=be(pe(l,M,t));let N=X(l[1]),r=[];for(let t=0;t<N.length;t+=1)r[t]=De(me(l,N,t));const $e=t=>Y(r[t],1,1,()=>{r[t]=null});return{c(){n=v("div"),ke(s.$$.fragment),i=w(),d=v("div"),c=v("div"),f=v("div");for(let t=0;t<m.length;t+=1)m[t].c();T=w(),o=v("div"),_=v("div"),_.innerHTML=y,O=w(),p=v("div"),h=v("div"),h.textContent=D,Z=w(),x=v("div"),$=v("button"),$.textContent=re,ee=w(),E=v("button"),E.textContent=ce,te=w(),U=v("button"),U.textContent=ie,ne=w(),B=v("div"),j=v("div"),j.textContent=de,le=w(),P=v("div");for(let t=0;t<r.length;t+=1)r[t].c();se=w(),I=v("button"),I.textContent=ue,this.h()},l(t){n=g(t,"DIV",{class:!0});var u=C(n);Te(s.$$.fragment,u),i=S(u),d=g(u,"DIV",{class:!0});var e=C(d);c=g(e,"DIV",{class:!0});var V=C(c);f=g(V,"DIV",{class:!0});var _e=C(f);for(let L=0;L<m.length;L+=1)m[L].l(_e);_e.forEach(b),V.forEach(b),T=S(e),o=g(e,"DIV",{class:!0,style:!0});var H=C(o);_=g(H,"DIV",{"data-svelte-h":!0}),A(_)!=="svelte-d8or50"&&(_.innerHTML=y),O=S(H),p=g(H,"DIV",{});var J=C(p);h=g(J,"DIV",{"data-svelte-h":!0}),A(h)!=="svelte-dgknx0"&&(h.textContent=D),Z=S(J),x=g(J,"DIV",{class:!0});var z=C(x);$=g(z,"BUTTON",{class:!0,"data-svelte-h":!0}),A($)!=="svelte-u78evw"&&($.textContent=re),ee=S(z),E=g(z,"BUTTON",{class:!0,"data-svelte-h":!0}),A(E)!=="svelte-h8l732"&&(E.textContent=ce),te=S(z),U=g(z,"BUTTON",{class:!0,"data-svelte-h":!0}),A(U)!=="svelte-uimxy2"&&(U.textContent=ie),z.forEach(b),J.forEach(b),ne=S(H),B=g(H,"DIV",{class:!0});var K=C(B);j=g(K,"DIV",{"data-svelte-h":!0}),A(j)!=="svelte-16sr6oi"&&(j.textContent=de),le=S(K),P=g(K,"DIV",{class:!0});var he=C(P);for(let L=0;L<r.length;L+=1)r[L].l(he);he.forEach(b),K.forEach(b),se=S(H),I=g(H,"BUTTON",{class:!0,"data-svelte-h":!0}),A(I)!=="svelte-1di8hbc"&&(I.textContent=ue),H.forEach(b),e.forEach(b),u.forEach(b),this.h()},h(){k(f,"class","flex flex-col gap-4"),k(c,"class","dungeons fixed left-2 top-16"),k($,"class","dungeon-btn svelte-smcyfq"),R($,"selected",l[0]==="ALPH/USD"),k(E,"class","dungeon-btn svelte-smcyfq"),R(E,"selected",l[0]==="BTC/USD"),k(U,"class","dungeon-btn svelte-smcyfq"),R(U,"selected",l[0]==="ETH/USD"),k(x,"class","flex gap-4 justify-center"),k(P,"class","mt-2 flex gap-6 self-center"),k(B,"class","w-full flex flex-col"),k(I,"class","cursor-pointer grow shadow-md pt-4 cursor-pointer mint font-bold p-2 rounded-md px-4 svelte-smcyfq"),k(o,"class","text-2xl yellow-font flex flex-col gap-6 svelte-smcyfq"),Ue(o,"width","270px"),k(d,"class","h-full w-full flex flex-col items-center justify-center gap-6"),k(n,"class","main h-full svelte-smcyfq")},m(t,u){ae(t,n,u),Ce(s,n,null),a(n,i),a(n,d),a(d,c),a(c,f);for(let e=0;e<m.length;e+=1)m[e]&&m[e].m(f,null);a(d,T),a(d,o),a(o,_),a(o,O),a(o,p),a(p,h),a(p,Z),a(p,x),a(x,$),a(x,ee),a(x,E),a(x,te),a(x,U),a(o,ne),a(o,B),a(B,j),a(B,le),a(B,P);for(let e=0;e<r.length;e+=1)r[e]&&r[e].m(P,null);a(o,se),a(o,I),q=!0,oe||(fe=[F($,"click",l[7]),F(E,"click",l[8]),F(U,"click",l[9]),F(I,"click",l[4])],oe=!0)},p(t,[u]){if(u&4){M=X(t[2]);let e;for(e=0;e<M.length;e+=1){const V=pe(t,M,e);m[e]?m[e].p(V,u):(m[e]=be(V),m[e].c(),m[e].m(f,null))}for(;e<m.length;e+=1)m[e].d(1);m.length=M.length}if((!q||u&1)&&R($,"selected",t[0]==="ALPH/USD"),(!q||u&1)&&R(E,"selected",t[0]==="BTC/USD"),(!q||u&1)&&R(U,"selected",t[0]==="ETH/USD"),u&34){N=X(t[1]);let e;for(e=0;e<N.length;e+=1){const V=me(t,N,e);r[e]?(r[e].p(V,u),G(r[e],1)):(r[e]=De(V),r[e].c(),G(r[e],1),r[e].m(P,null))}for(Ve(),e=N.length;e<r.length;e+=1)$e(e);Ie()}},i(t){if(!q){G(s.$$.fragment,t);for(let u=0;u<N.length;u+=1)G(r[u]);q=!0}},o(t){Y(s.$$.fragment,t),r=r.filter(Boolean);for(let u=0;u<r.length;u+=1)Y(r[u]);q=!1},d(t){t&&b(n),xe(s),ve(m,t),ve(r,t),oe=!1,we(fe)}}}function je(l,n,s){let i;Se(l,Le,D=>s(2,i=D));let d="ALPH/USD",c=["up","up","down","down"];function f(D){s(0,d=D)}function T(){Ne(d,{monster:1,prediction:[...c]}),console.log(`Sent to dungeon: ${d}`),console.log(`Prediction: ${c}`)}function o(D){s(1,c[D]=c[D]==="up"?"down":"up",c),s(1,c=[...c])}return[d,c,i,f,T,o,D=>Ae(`/dungeons/${D.name.replace("/","_")}`),()=>f("ALPH/USD"),()=>f("BTC/USD"),()=>f("ETH/USD"),D=>o(D)]}class Je extends ye{constructor(n){super(),Be(this,n,je,Oe,Ee,{})}}export{Je as component};
