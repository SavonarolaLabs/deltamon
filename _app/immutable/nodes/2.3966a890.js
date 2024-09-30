import{s as ft,f as Rt,g as Ft,h as _t,d as it,j as vt,i as Et,y as H,o as It,A as Pt,p as Ct}from"../chunks/scheduler.9ee62574.js";import{S as dt,i as mt,b as gt,d as Mt,m as Dt,a as Yt,t as Xt,e as Ut}from"../chunks/index.9ced2dbd.js";import{b as F}from"../chunks/paths.35d3ae26.js";import{s as Lt,g as Y}from"../chunks/gameloop.45755ab9.js";function ht(t){const e=[-.5,.5,-.5,-.5,.5,.5,.5,-.5],n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,new Float32Array(e),t.STATIC_DRAW);const r=[0,0,0,1,1,0,1,1],a=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.STATIC_DRAW),{positionBuffer:n,textureCoordBuffer:a}}function Bt(t){const e=`
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uProjectionMatrix;

varying highp vec2 vTextureCoord;

void main(void) {
    gl_Position = uProjectionMatrix * vec4(aVertexPosition, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
	`,n=`
		varying highp vec2 vTextureCoord;
		uniform sampler2D uSampler;
		uniform highp float uWhiteFlash; // Uniform for white flash effect

		void main(void) {
			// Sample the texture color
			highp vec4 texColor = texture2D(uSampler, vTextureCoord);

			// Blend texture color with white based on uWhiteFlash value
			highp vec4 whiteColor = vec4(1.0, 1.0, 1.0, texColor.a);
			gl_FragColor = mix(texColor, whiteColor, uWhiteFlash);
		}
	`,r=ot(t,t.VERTEX_SHADER,e),a=ot(t,t.FRAGMENT_SHADER,n),o=t.createProgram();return t.attachShader(o,r),t.attachShader(o,a),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?(t.useProgram(o),o):(console.error("Unable to initialize the shader program:",t.getProgramInfoLog(o)),null)}function ot(t,e,n){const r=t.createShader(e);return r?(t.shaderSource(r,n),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders:",t.getShaderInfoLog(r)),t.deleteShader(r),null)):(console.error("Unable to create shader"),null)}function St(t){const e=t.getContext("webgl",{alpha:!0});if(!e)return console.error("Unable to initialize WebGL. Your browser may not support it."),null;const n=Bt(e);if(!n)return console.error("Failed to initialize shader program"),null;const r=ht(e);return e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,1),{gl:e,shaderProgram:n,buffers:r}}var st=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});function Gt(){var t=new st(16);return st!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function Ot(t,e,n,r,a,o,f){var d=1/(e-n),m=1/(r-a),s=1/(o-f);return t[0]=-2*d,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*m,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*s,t[11]=0,t[12]=(e+n)*d,t[13]=(a+r)*m,t[14]=(f+o)*s,t[15]=1,t}var $t=Ot;function Wt(t,e,n,r,a,o){const f=new Float32Array([0,0,0,t.canvas.height,t.canvas.width,0,t.canvas.width,t.canvas.height]);t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,f,t.STATIC_DRAW);const d=t.getAttribLocation(e,"aVertexPosition");t.enableVertexAttribArray(d),t.vertexAttribPointer(d,2,t.FLOAT,!1,0,0),t.bindTexture(t.TEXTURE_2D,a.texture),t.bindBuffer(t.ARRAY_BUFFER,r);const m=new Float32Array([0,0,0,1,1,0,1,1]);t.bufferData(t.ARRAY_BUFFER,m,t.STATIC_DRAW);const s=t.getAttribLocation(e,"aTextureCoord");t.enableVertexAttribArray(s),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0);const p=t.getUniformLocation(e,"uSampler");t.uniform1i(p,0),t.uniform1f(o,0),t.drawArrays(t.TRIANGLE_STRIP,0,4)}let Q,Z,tt,et,ct,lt,rt;function Nt(t,e){({positionBuffer:Q,textureCoordBuffer:Z}=ht(t)),tt=t.getAttribLocation(e,"aVertexPosition"),et=t.getAttribLocation(e,"aTextureCoord"),ct=t.getUniformLocation(e,"uSampler"),lt=t.getUniformLocation(e,"uProjectionMatrix"),rt=t.getUniformLocation(e,"uWhiteFlash"),t.enableVertexAttribArray(tt),t.enableVertexAttribArray(et),t.uniform1i(ct,0)}function jt(t,e,n,r,a,o){n.clear(n.COLOR_BUFFER_BIT);const f=Gt();$t(f,0,n.canvas.width,n.canvas.height,0,-1,1),n.uniformMatrix4fv(lt,!1,f);const d=a[`${F}/bg/current.png`];d&&Wt(n,r,Q,Z,d,rt);const m=[...e,...o.filter(s=>s.draw)].sort((s,p)=>s.zIndex-p.zIndex);for(const s of m){const p=a[F+s.texturePath];if(p){const{x:T,y:_,scale:w,whiteFlash:A=0,angle:x=0}=s;zt(n,r,Q,Z,p,T,_,w,tt,et,A,x,rt,s.currentFrame)}else console.warn(`Texture not found for path: ${F+s.texturePath}`),console.warn("element.texturePath:",s.texturePath),console.warn("textures[base + '/' + element.texturePath]",a[F+"/"+s.texturePath])}}function zt(t,e,n,r,a,o,f,d,m,s,p=0,T=0,_,w){const{width:A,height:x,isGridFormat:R,gridRows:O=1,gridCols:v=1}=a;let E=new Float32Array([0,0,0,x,A,0,A,x]);const L=A/2,B=x/2,U=Math.cos(T),S=Math.sin(T);for(let b=0;b<E.length;b+=2){let I=E[b]-L,P=E[b+1]-B;I*=d,P*=d;const D=I*U-P*S,V=I*S+P*U;E[b]=D+o,E[b+1]=V+f}t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,E,t.STATIC_DRAW),t.vertexAttribPointer(m,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(m),t.bindTexture(t.TEXTURE_2D,a.texture),t.bindBuffer(t.ARRAY_BUFFER,r);let $;if(R){const b=w%v,I=Math.floor(w/v),P=1/v,D=1/O;$=new Float32Array([b*P,I*D,b*P,(I+1)*D,(b+1)*P,I*D,(b+1)*P,(I+1)*D])}else $=new Float32Array([0,0,0,1,1,0,1,1]);t.bufferData(t.ARRAY_BUFFER,$,t.STATIC_DRAW),t.vertexAttribPointer(s,2,t.FLOAT,!1,0,0),t.enableVertexAttribArray(s),t.uniform1f(_,p),t.drawArrays(t.TRIANGLE_STRIP,0,4)}const X=[{name:"flame10",path:"/abilities/flame10",frameCount:41},{name:"flame2",path:"/abilities/flame2",frameCount:16},{name:"slash3",path:"/abilities/slash3",frameCount:12},{name:"water10",path:"/abilities/water10",frameCount:14},{name:"water8",path:"/abilities/water8",frameCount:21},{name:"lightnings1_0000",path:"/abilities/lightnings1/0000.png",frameCount:9,isGridFormat:!0,gridRows:3,gridCols:3},{name:"lightnings1_0001",path:"/abilities/lightnings1/0001.png",frameCount:9,isGridFormat:!0,gridRows:3,gridCols:3},{name:"lightnings1_0002",path:"/abilities/lightnings1/0002.png",frameCount:16,isGridFormat:!0,gridRows:4,gridCols:4},{name:"lightnings1_0003",path:"/abilities/lightnings1/0003.png",frameCount:9,isGridFormat:!0,gridRows:3,gridCols:3}],kt=[`${F}/monster/card_001.png`,`${F}/monster/card_002.png`,`${F}/monster/card_003.png`,`${F}/bg/current.png`];function J(t,e){return new Promise((n,r)=>{const a=t.createTexture();if(!a){r(new Error("Failed to create texture"));return}const o=new Image;o.crossOrigin="anonymous",o.src=e,o.onload=()=>{t.bindTexture(t.TEXTURE_2D,a),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,o),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),n({texture:a,width:o.width,height:o.height,aspectRatio:o.width/o.height})},o.onerror=()=>{r(new Error(`Failed to load texture from ${e}`))}})}async function Ht(t){const e={};await Promise.all(kt.map(async n=>{try{const r=await J(t,n);e[n]=r}catch(r){console.error(r)}}));for(const n of X)if(n.isGridFormat)try{const r=await J(t,`${F}${n.path}`);e[`${F}ability.path`]={...r,isGridFormat:!0,gridRows:n.gridRows,gridCols:n.gridCols}}catch(r){console.error(r)}else await Promise.all(Array.from({length:n.frameCount}).map(async(r,a)=>{const o=`${a.toString().padStart(4,"0")}.png`,f=`${F}${n.path}/${o}`;try{const d=await J(t,f);e[f]=d}catch(d){console.error(d)}}));return e}function k(t,e=1,n=0){const r=new Audio(t);r.playbackRate=e,r.currentTime=n,r.play()}function K(t,e,n=1,r=0){setTimeout(()=>{const a=new Audio(t);a.playbackRate=n,a.play()},e)}const Vt=600,pt=300,qt=600,Jt=350;function Kt(t,e,n){const r=e.x-t.x,a=e.y-t.y,o=Math.atan2(a,r),f=X.find(d=>d.name===n);return{currentFrame:0,duration:Vt,lastTime:0,startX:t.x,startY:t.y,endX:e.x,endY:e.y,abilityFolder:f,texturePath:f.isGridFormat?f.path:`/abilities/${n}/0000.png`,x:t.x-.12,y:t.y,scale:1,draw:!0,zIndex:3,angle:o}}function Qt(t,e){const n=X.find(r=>r.name===e);return{currentFrame:0,duration:pt,lastTime:0,startX:t.x,startY:t.y,endX:t.x,endY:t.y,abilityFolder:n,texturePath:n.isGridFormat?n.path:`/abilities/${e}/0000.png`,x:t.x,y:t.y,scale:.7,draw:!0,zIndex:2,angle:0}}function Zt(t,e,n){const r=e.x-t.x,a=e.y-t.y,o=Math.atan2(a,r),f=X.find(d=>d.name===n);return{currentFrame:0,duration:qt,lastTime:0,startX:t.x,startY:t.y,endX:e.x,endY:e.y,abilityFolder:f,texturePath:f.isGridFormat?f.path:`/abilities/${n}/0000.png`,x:t.x-.12,y:t.y,scale:.5,draw:!0,zIndex:3,angle:o}}function te(t,e){const n=X.find(r=>r.name===e);return{currentFrame:0,duration:Jt,lastTime:0,startX:t.x+30,startY:t.y+35,endX:t.x,endY:t.y,abilityFolder:n,texturePath:n.isGridFormat?n.path:`/abilities/${e}/0000.png`,x:t.x+30,y:t.y+35,scale:1.2,draw:!0,zIndex:2,angle:Math.PI/2}}const xt=500,ee=300;function re(t,e,n){const r=e.x-t.x,a=e.y-t.y,o=Math.atan2(a,r),f=X.find(s=>s.name===n),d=400,m=200;return{currentFrame:0,duration:xt,lastTime:0,startX:t.x+d,startY:t.y+m,endX:e.x-d,endY:e.y+m,abilityFolder:f,texturePath:f.path,x:t.x+d,y:t.y+m,scale:1,draw:!0,zIndex:3,angle:o}}function ne(t,e){const n=X.find(o=>o.name===e),r=40,a=-20;return{currentFrame:0,duration:ee,lastTime:0,startX:t.x+r,startY:t.y+a,endX:t.x+r,endY:t.y+a,abilityFolder:n,texturePath:n.path,x:t.x+a,y:t.y+a,scale:.7,draw:!0,zIndex:2,angle:0}}function ae(t,e){const n=X.find(a=>a.name===e),r=100;return{currentFrame:0,duration:pt,lastTime:0,startX:t.x+r,startY:t.y,endX:t.x+r,endY:t.y,abilityFolder:n,texturePath:n.isGridFormat?n.path:`/abilities/${e}/0000.png`,x:t.x+r,y:t.y,scale:.75,draw:!0,zIndex:2,angle:Math.PI/4}}function ut(t,e){var w;const n=[],r=e.canvas.width,a=e.canvas.height,o=.15,f=.8,d=f-.3,m=.55,s=m-.45,p=m-.45*2,T=[[-f,m],[-d,m],[d,m],[f,m],[-f,s-o],[-d,s-o],[d,s-o],[f,s-o],[-f,p-o*2],[-d,p-o*2],[d,p-o*2],[f,p-o*2]],_=[0,1,4,5,8,9,2,3,6,7,10,11];for(let A=0;A<t.slots.length;A++){const x=t.slots[A],R=((w=x.creature)==null?void 0:w.playerId)||1,O=x.creature?`/monster/${x.creature.img}`:"",v=_[A],[E,L]=T[v],B=(E+1)/2*r,U=(1-L)/2*a,S=.66;n.push({slotIndex:A,playerId:R,texturePath:O,x:B,y:U,scale:S,zIndex:A==1?1:0,isHovered:!1,originalX:B,originalY:U})}return n}function ie(t,e){const a=10*Math.sin(e*.003);return{...t,y:t.originalY-a,scale:.8}}function oe(t){let e;return{c(){e=Rt("canvas"),this.h()},l(n){e=Ft(n,"CANVAS",{class:!0}),_t(e).forEach(it),this.h()},h(){vt(e,"class","svelte-q52jml")},m(n,r){Et(n,e,r),t[1](e)},p:H,i:H,o:H,d(n){n&&it(e),t[1](null)}}}const C=1,se=300,ce=60,ue=200;function fe(t,e,n){let r,a,o,f,d={},m=[],s=[],p,T=[],_=[],w=null;const A=-20,x={Q:6,W:7,E:8,A:9,S:10,D:11};let R="lightning";async function O(){const c=St(r);c&&({gl:a,shaderProgram:o,buffers:f}=c,d=await Ht(a),Nt(a,o),s=ut(Y,a),v(),p=requestAnimationFrame(L))}function v(){if(r&&a){const c=window.devicePixelRatio||1,i=window.innerWidth,u=window.innerHeight;n(0,r.width=i*c,r),n(0,r.height=u*c,r),n(0,r.style.width=`${i}px`,r),n(0,r.style.height=`${u}px`,r),a.viewport(0,0,r.width,r.height),s=ut(Y,a)}}function E(){a&&Object.values(d).forEach(({texture:c})=>a.deleteTexture(c)),d={}}function L(c){B(c),U(c),S(c),$(c),b(c),jt(Y,s,a,o,d,m),p=requestAnimationFrame(L)}function B(c){m.forEach(i=>{i.startTime||(i.startTime=c);const u=c-i.startTime,l=Math.min(u/i.duration,1);if(i.abilityFolder.isGridFormat){const h=i.abilityFolder.frameCount;i.currentFrame=Math.floor(l*(h-1))}else{const h=i.abilityFolder.frameCount;i.currentFrame=Math.floor(l*(h-1)),i.texturePath=`${F}/abilities/${i.abilityFolder.name}/${i.currentFrame.toString().padStart(4,"0")}.png`}if(l>.3){const h=(l-.3)/.7;i.x=i.startX+(i.endX-i.startX)*h,i.y=i.startY+(i.endY-i.startY)*h}l>=1&&(i.draw=!1)}),m=m.filter(i=>i.draw)}function U(c){if(_.length===0){const i=Y.activeCreature;if(i){const u=Y.slots.findIndex(l=>{var h;return((h=l.creature)==null?void 0:h.bcId)===i.bcId});u!==-1&&s[u]&&(s[u]=ie(s[u],c))}}}function S(c){if(w&&s[C]){const i=c-w,u=Math.min(i/ue,1),l=Math.sin(u*Math.PI);s[C].x=s[C].originalX+A*l,u>=1&&(s[C].x=s[C].originalX,w=null)}}function $(c){T=T.filter(i=>{const{targetSlotIndex:u,startTime:l}=i,h=s[u];if(!h)return!1;const W=c-l,g=Math.min(W/se,1),M=Math.sin(g*Math.PI);return h.x=h.originalX+ce*M,h.whiteFlash=.9*(1-g),g>=1?(h.x=h.originalX,h.whiteFlash=0,!1):!0})}function b(c){const i=u=>u*u*u;_=_.filter(u=>{const{slotIndex:l,targetSlotIndex:h,startTime:W,duration:g,startX:M,startY:G,targetX:j,targetY:z,jumpHeight:yt,phase:at}=u,y=s[l];if(!y)return!1;const Tt=c-W,N=Math.min(Tt/g,1),q=i(N);if(at==="jump")if(y.x=M+(j-M)*q,y.y=G+(z-G)*q-yt*Math.sin(q*Math.PI),N>=1){k("/mp3/punch2.mp3",1,0);const wt=s[h],bt=ae(wt,"slash3");return m.push(bt),T.push({targetSlotIndex:h,startTime:performance.now()}),u.startTime=c,u.duration=g/1.2,u.phase="return",u.startX=y.x,u.startY=y.y,u.targetX=y.originalX,u.targetY=y.originalY,!0}else return!0;else if(at==="return")return y.x=M+(j-M)*N,y.y=G+(z-G)*N,N>=1?(y.x=y.originalX,y.y=y.originalY,y.isHovered=!0,!1):!0})}function I(c){const i=s[C],u=s[c];k("/mp3/fireball.mp3",1,0);const l=Kt(i,u,"flame10");m.push(l),w=performance.now(),K("/mp3/blast.mp3",350,1.1),setTimeout(()=>{const h=Qt(u,"flame2");m.push(h),T.push({targetSlotIndex:c,startTime:performance.now()})},500)}function P(c){const i=s[C],u=s[c];k("/mp3/water/22.mp3",1,0);const l=Zt(i,u,"water8");m.push(l),w=performance.now(),K("/mp3/water/46.mp3",350,1.1),setTimeout(()=>{const h=te(u,"water10");m.push(h),T.push({targetSlotIndex:c,startTime:performance.now()})},500)}function D(c){const i=s[C],u=s[c],l=re(i,u,"lightnings1_0003");m.push(l),k("/mp3/lightning/16.mp3",1.3,0),K("/mp3/lightning/06.mp3",300,1),setTimeout(()=>{const h=ne(u,"lightnings1_0000");m.push(h),T.push({targetSlotIndex:c,startTime:performance.now()})},xt)}function V(c){const i=s[C],u=s[c],l=300,h=150,W=330,g=i.originalX,M=i.originalY,G=u.x-W*Math.sign(u.x-i.x),j=u.y;i.x=g,i.y=M,i.isHovered=!1;const z={slotIndex:C,targetSlotIndex:c,startTime:performance.now(),duration:l,startX:g,startY:M,targetX:G,targetY:j,jumpHeight:h,phase:"jump"};_.push(z)}function nt(c){const i=c.key.toUpperCase();i==="1"?R="fireball":i==="2"?R="waterball":i==="3"?R="lightning":i==="4"?R="jumpAttack":x[i]!==void 0&&(R==="lightning"?D(x[i]):R==="fireball"?I(x[i]):R==="waterball"?P(x[i]):R==="jumpAttack"&&V(x[i]))}It(()=>{Lt(Y),Y.activeCreature=Y.slots[1].creature,O(),window.addEventListener("keydown",nt),window.addEventListener("resize",v),v()}),Pt(()=>{window.cancelAnimationFrame(p),E(),a&&o&&f&&(a.deleteProgram(o),a.deleteBuffer(f.positionBuffer),a.deleteBuffer(f.textureCoordBuffer)),window.removeEventListener("keydown",nt),window.removeEventListener("resize",v)});function At(c){Ct[c?"unshift":"push"](()=>{r=c,n(0,r)})}return[r,At]}class de extends dt{constructor(e){super(),mt(this,e,fe,oe,ft,{})}}function me(t){let e,n;return e=new de({}),{c(){gt(e.$$.fragment)},l(r){Mt(e.$$.fragment,r)},m(r,a){Dt(e,r,a),n=!0},p:H,i(r){n||(Yt(e.$$.fragment,r),n=!0)},o(r){Xt(e.$$.fragment,r),n=!1},d(r){Ut(e,r)}}}class Ae extends dt{constructor(e){super(),mt(this,e,null,me,ft,{})}}export{Ae as component};
