import{s as Q,a as N,f as x,l as I,c as w,g as y,h as C,m as P,d as g,j as E,i as $,x as v,n as R,z as S,A as H,y as D,e as T,D as G}from"../chunks/scheduler.74d0f875.js";import{S as U,i as W,b as J,d as K,m as L,t as k,c as M,a as b,e as O,g as j}from"../chunks/index.a26b1ccc.js";import{N as X,e as V}from"../chunks/Navigation.d0aeebf9.js";import{p as Y}from"../chunks/stores.edb25a7e.js";import{d as Z,T as ee}from"../chunks/dungeons.e3dbb4de.js";function q(_,e,o){const t=_.slice();return t[4]=e[o],t[6]=o,t}function z(_,e,o){const t=_.slice();return t[7]=e[o],t}function te(_){let e,o="Dungeon not found.";return{c(){e=x("p"),e.textContent=o},l(t){e=y(t,"P",{"data-svelte-h":!0}),H(e)!=="svelte-11ca2r5"&&(e.textContent=o)},m(t,n){$(t,e,n)},p:D,i:D,o:D,d(t){t&&g(e)}}}function ne(_){let e,o,t="Monsters in this dungeon:",n,u,l,a;const i=[oe,le],h=[];function m(r,p){return r[1].monsters.length>0?0:1}return u=m(_),l=h[u]=i[u](_),{c(){e=x("div"),o=x("h2"),o.textContent=t,n=N(),l.c(),this.h()},l(r){e=y(r,"DIV",{class:!0});var p=C(e);o=y(p,"H2",{class:!0,"data-svelte-h":!0}),H(o)!=="svelte-8xyfwt"&&(o.textContent=t),n=w(p),l.l(p),p.forEach(g),this.h()},h(){E(o,"class","text-xl"),E(e,"class","mt-4")},m(r,p){$(r,e,p),v(e,o),v(e,n),h[u].m(e,null),a=!0},p(r,p){let f=u;u=m(r),u===f?h[u].p(r,p):(j(),k(h[f],1,1,()=>{h[f]=null}),M(),l=h[u],l?l.p(r,p):(l=h[u]=i[u](r),l.c()),b(l,1),l.m(e,null))},i(r){a||(b(l),a=!0)},o(r){k(l),a=!1},d(r){r&&g(e),h[u].d()}}}function le(_){let e,o="No monsters in this dungeon yet.";return{c(){e=x("p"),e.textContent=o},l(t){e=y(t,"P",{"data-svelte-h":!0}),H(e)!=="svelte-jpxcid"&&(e.textContent=o)},m(t,n){$(t,e,n)},p:D,i:D,o:D,d(t){t&&g(e)}}}function oe(_){let e,o,t=V(_[1].monsters),n=[];for(let l=0;l<t.length;l+=1)n[l]=F(q(_,t,l));const u=l=>k(n[l],1,1,()=>{n[l]=null});return{c(){for(let l=0;l<n.length;l+=1)n[l].c();e=T()},l(l){for(let a=0;a<n.length;a+=1)n[a].l(l);e=T()},m(l,a){for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(l,a);$(l,e,a),o=!0},p(l,a){if(a&2){t=V(l[1].monsters);let i;for(i=0;i<t.length;i+=1){const h=q(l,t,i);n[i]?(n[i].p(h,a),b(n[i],1)):(n[i]=F(h),n[i].c(),b(n[i],1),n[i].m(e.parentNode,e))}for(j(),i=t.length;i<n.length;i+=1)u(i);M()}},i(l){if(!o){for(let a=0;a<t.length;a+=1)b(n[a]);o=!0}},o(l){n=n.filter(Boolean);for(let a=0;a<n.length;a+=1)k(n[a]);o=!1},d(l){l&&g(e),G(n,l)}}}function A(_){let e,o;return e=new ee({props:{direction:_[7]}}),{c(){J(e.$$.fragment)},l(t){K(e.$$.fragment,t)},m(t,n){L(e,t,n),o=!0},p(t,n){const u={};n&2&&(u.direction=t[7]),e.$set(u)},i(t){o||(b(e.$$.fragment,t),o=!0)},o(t){k(e.$$.fragment,t),o=!1},d(t){O(e,t)}}}function F(_){let e,o,t,n=_[6]+1+"",u,l,a,i,h,m=V(_[4].prediction),r=[];for(let f=0;f<m.length;f+=1)r[f]=A(z(_,m,f));const p=f=>k(r[f],1,1,()=>{r[f]=null});return{c(){e=x("div"),o=x("p"),t=I("Monster #"),u=I(n),l=N(),a=x("div");for(let f=0;f<r.length;f+=1)r[f].c();i=N(),this.h()},l(f){e=y(f,"DIV",{class:!0});var s=C(e);o=y(s,"P",{});var c=C(o);t=P(c,"Monster #"),u=P(c,n),c.forEach(g),l=w(s),a=y(s,"DIV",{class:!0});var d=C(a);for(let B=0;B<r.length;B+=1)r[B].l(d);d.forEach(g),i=w(s),s.forEach(g),this.h()},h(){E(a,"class","flex gap-2"),E(e,"class","mt-2 p-2 border border-yellow-500 rounded")},m(f,s){$(f,e,s),v(e,o),v(o,t),v(o,u),v(e,l),v(e,a);for(let c=0;c<r.length;c+=1)r[c]&&r[c].m(a,null);v(e,i),h=!0},p(f,s){if(s&2){m=V(f[4].prediction);let c;for(c=0;c<m.length;c+=1){const d=z(f,m,c);r[c]?(r[c].p(d,s),b(r[c],1)):(r[c]=A(d),r[c].c(),b(r[c],1),r[c].m(a,null))}for(j(),c=m.length;c<r.length;c+=1)p(c);M()}},i(f){if(!h){for(let s=0;s<m.length;s+=1)b(r[s]);h=!0}},o(f){r=r.filter(Boolean);for(let s=0;s<r.length;s+=1)k(r[s]);h=!1},d(f){f&&g(e),G(r,f)}}}function re(_){let e,o,t,n,u,l,a,i,h,m;e=new X({});const r=[ne,te],p=[];function f(s,c){return s[1]?0:1}return i=f(_),h=p[i]=r[i](_),{c(){J(e.$$.fragment),o=N(),t=x("div"),n=x("h1"),u=I(_[0]),l=I(" Dungeon"),a=N(),h.c(),this.h()},l(s){K(e.$$.fragment,s),o=w(s),t=y(s,"DIV",{class:!0});var c=C(t);n=y(c,"H1",{class:!0});var d=C(n);u=P(d,_[0]),l=P(d," Dungeon"),d.forEach(g),a=w(c),h.l(c),c.forEach(g),this.h()},h(){E(n,"class","text-2xl"),E(t,"class","p-2")},m(s,c){L(e,s,c),$(s,o,c),$(s,t,c),v(t,n),v(n,u),v(n,l),v(t,a),p[i].m(t,null),m=!0},p(s,[c]){(!m||c&1)&&R(u,s[0]);let d=i;i=f(s),i===d?p[i].p(s,c):(j(),k(p[d],1,1,()=>{p[d]=null}),M(),h=p[i],h?h.p(s,c):(h=p[i]=r[i](s),h.c()),b(h,1),h.m(t,null))},i(s){m||(b(e.$$.fragment,s),b(h),m=!0)},o(s){k(e.$$.fragment,s),k(h),m=!1},d(s){s&&(g(o),g(t)),O(e,s),p[i].d()}}}function se(_,e,o){let t,n,u,l;return S(_,Z,a=>o(2,u=a)),S(_,Y,a=>o(3,l=a)),_.$$.update=()=>{_.$$.dirty&8&&o(0,t=l.params.name.replace("_","/")),_.$$.dirty&5&&o(1,n=u.find(a=>a.name===t))},[t,n,u,l]}class _e extends U{constructor(e){super(),W(this,e,se,re,Q,{})}}export{_e as component};