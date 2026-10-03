
const W=918,H=515,$=id=>document.getElementById(id),R=Math.random;
const GW=230,G=new Uint8Array(GW*129);
const cv=$("c"),g=cv.getContext("2d");
const load=s=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=s});
let SH,UI,TS,TG,TW,TWS,PW,SHORE;
const SPR={blue:[68,77],red:[0,77],green:[68,192],yellow:[68,307],black:[0,307],white:[0,192]};
const WEAP=[{cd:.45},{cd:1.2},{cd:2.2}],ENEMIES=["red","green","yellow","black","white"],S=.55;
const keys={};
addEventListener("keydown",e=>{
  if(e.key.startsWith("Arrow")||e.code==="Space")e.preventDefault();
  if(!e.repeat&&(e.code==="KeyP"||e.code==="Escape"))togglePause();
  if(!e.repeat&&e.code==="KeyM")A.mute();
  keys[e.code]=1});
addEventListener("keyup",e=>keys[e.code]=0);
function fit(){const s=Math.min(innerWidth/W,innerHeight/H);$("stage").style.transform="scale("+s+")";const w=$("wrap");w.style.width=W*s+"px";w.style.height=H*s+"px"}
addEventListener("resize",fit);fit();

function solid(x,y){if(x<0||y<0||x>=W||y>=H)return true;return G[(y>>2)*GW+(x>>2)]===1}
function blocked(x,y,r){if(solid(x,y))return true;for(let i=0;i<8;i++){const a=i*.785;if(solid(x+Math.cos(a)*r,y+Math.sin(a)*r))return true}return false}
function los(a,b){const d=Math.hypot(b.x-a.x,b.y-a.y),n=Math.ceil(d/6);for(let i=1;i<n;i++){if(solid(a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n))return false}return true}
function move(b,dx,dy){let hit=false;
  if(!blocked(b.x+dx,b.y,15))b.x+=dx;else hit=true;
  if(!blocked(b.x,b.y+dy,15))b.y+=dy;else hit=true;return hit}
const NC=12,NW=Math.ceil(W/NC),NH=Math.ceil(H/NC),NAV=new Uint8Array(NW*NH);
function buildNav(){for(let j=0;j<NH;j++)for(let i=0;i<NW;i++)NAV[j*NW+i]=blocked(i*NC+NC/2,j*NC+NC/2,22)?0:1}
function cellOf(x,y){return Math.max(0,Math.min(NH-1,Math.floor(y/NC)))*NW+Math.max(0,Math.min(NW-1,Math.floor(x/NC)))}
function findPath(a,b){const s=cellOf(a.x,a.y),t=cellOf(b.x,b.y);if(!NAV[t])return null;
  const prev=new Int32Array(NW*NH).fill(-2);prev[s]=-1;const q=[s];let h=0;
  while(h<q.length){const c=q[h++];if(c===t)break;const cx=c%NW,cy=(c/NW)|0;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const nx=cx+dx,ny=cy+dy;
      if(nx<0||ny<0||nx>=NW||ny>=NH)continue;const n=ny*NW+nx;if(prev[n]!==-2||!NAV[n])continue;
      if(dx&&dy&&(!NAV[cy*NW+nx]||!NAV[ny*NW+cx]))continue;prev[n]=c;q.push(n)}}
  if(prev[t]===-2)return null;const out=[];
  for(let c=t;c!==-1;c=prev[c])out.push({x:(c%NW)*NC+NC/2,y:((c/NW)|0)*NC+NC/2});
  out.reverse();out.shift();return out}
function clearLine(a,b){const d=Math.hypot(b.x-a.x,b.y-a.y),n=Math.ceil(d/6);
  for(let i=1;i<=n;i++)if(blocked(a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n,18))return false;return true}
function newRoute(e){e.path=[];for(let k=0;k<8;k++){const p=findPath(e,wp());if(p&&p.length>1){e.path=p;return}}}
function wk(b,dt){if(Math.hypot(b.x-(b.lx??b.x),b.y-(b.ly??b.y))>.3){b.wk=(b.wk||0)-dt;if(b.wk<=0){b.wk=.06;WK.push({x:b.x-Math.cos(b.a)*20,y:b.y-Math.sin(b.a)*20,t:0})}}b.lx=b.x;b.ly=b.y}
function smk(b,f,dt){if(f>=.5)return;b.sm=(b.sm||0)-dt;
  if(b.sm<=0){b.sm=f<.25?.05:.11;SM.push({x:b.x+(R()-.5)*12,y:b.y+(R()-.5)*12,t:0,f:f<.25&&R()<.5})}}
function spawnPot(){for(let i=0;i<40;i++){const x=40+R()*(W-80),y=40+R()*(H-80);
  if(!blocked(x,y,28)&&Math.hypot(x-P.x,y-P.y)>80){PO.push({x,y,t:0});return}}}
function drawPot(p){if(p.t>25&&Math.floor(p.t*4)%2)return;
  const pu=.5+.5*Math.sin(t*4);g.save();g.translate(p.x,p.y+Math.sin(t*3+p.x)*2.5);
  g.fillStyle="rgba(255,90,90,"+(.2+.12*pu)+")";g.beginPath();g.arc(0,0,21+3*pu,0,6.283);g.fill();
  g.lineWidth=1.6;g.strokeStyle="#3a2410";g.fillStyle="#dcecf3";
  g.beginPath();g.arc(0,4,10,0,6.283);g.fill();g.stroke();g.fillRect(-3.5,-11,7,11);g.strokeRect(-3.5,-11,7,11);
  g.fillStyle="#d8323a";g.beginPath();g.arc(0,5,7.6,0,6.283);g.fill();
  g.fillStyle="#7a5a2e";g.fillRect(-4.5,-15,9,4.5);g.strokeRect(-4.5,-15,9,4.5);
  g.fillStyle="rgba(255,255,255,.8)";g.beginPath();g.ellipse(-3.5,1,2,3.5,.4,0,6.283);g.fill();
  g.fillStyle="#fff";g.font="800 11px sans-serif";g.textAlign="center";g.fillText("+",0,9.5);g.textAlign="left";g.restore()}
function wp(){for(;;){const x=30+R()*(W-60),y=30+R()*(H-60);if(!blocked(x,y,30))return{x,y}}}
const nang=a=>Math.atan2(Math.sin(a),Math.cos(a));

const A=(()=>{let c,mus,sfx,mas,nb,lpm,on=true,step=0,next=0,sv=.9,mv=1,amb,ml=.35;
const SD_={
 "cannon_broadside": {
  "u": "assets/audio/cannon_broadside.mp3",
  "g": 1.689
 },
 "cannon_fire_1": {
  "u": "assets/audio/cannon_fire_1.mp3",
  "g": 1.443
 },
 "cannon_fire_2": {
  "u": "assets/audio/cannon_fire_2.mp3",
  "g": 1.626
 },
 "cannon_fire_3": {
  "u": "assets/audio/cannon_fire_3.mp3",
  "g": 1.79
 },
 "cannonball_water_hit_1": {
  "u": "assets/audio/cannonball_water_hit_1.mp3",
  "g": 3.0
 },
 "cannonball_water_hit_2": {
  "u": "assets/audio/cannonball_water_hit_2.mp3",
  "g": 3.0
 },
 "game_complete": {
  "u": "assets/audio/game_complete.mp3",
  "g": 1.784
 },
 "game_over": {
  "u": "assets/audio/game_over.mp3",
  "g": 3.0
 },
 "game_pause": {
  "u": "assets/audio/game_pause.mp3",
  "g": 3.0
 },
 "game_resume": {
  "u": "assets/audio/game_resume.mp3",
  "g": 3.0
 },
 "game_start": {
  "u": "assets/audio/game_start.mp3",
  "g": 1.75
 },
 "health_low": {
  "u": "assets/audio/health_low.mp3",
  "g": 3.0
 },
 "ocean": {
  "u": "assets/audio/ocean_ambience_loop.wav",
  "g": 2.456
 },
 "score_point": {
  "u": "assets/audio/score_point.mp3",
  "g": 3.0
 },
 "ship_collision": {
  "u": "assets/audio/ship_collision.mp3",
  "g": 2.253
 },
 "ship_explosion_1": {
  "u": "assets/audio/ship_explosion_1.mp3",
  "g": 1.595
 }
},bufs={},AMB=.6;
const SD=.21,mtof=m=>440*2**((m-69)/12);
const MEL=[[69,72,76,76,74,72],[74,72,69,69,0,0],[71,74,79,79,77,76],[76,74,71,71,0,0],[69,72,76,81,79,76],[77,76,74,72,0,0],[76,80,76,71,68,71],[69,0,72,69,0,0]];
const BAS=[[45,52],[45,52],[43,50],[40,47],[45,52],[45,52],[40,47],[45,52]];
function init(){if(c){c.resume();return}
  c=new(window.AudioContext||window.webkitAudioContext)();
  mas=c.createGain();mas.gain.value=on?1:0;mas.connect(c.destination);
  mus=c.createGain();mus.gain.value=ml*.64*mv;mus.connect(mas);
  sfx=c.createGain();sfx.gain.value=sv;sfx.connect(mas);
  lpm=c.createBiquadFilter();lpm.type="lowpass";lpm.frequency.value=2200;lpm.connect(mus);
  nb=c.createBuffer(1,c.sampleRate,c.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  next=c.currentTime+.1;setInterval(sched,50);loadAll();
  document.addEventListener("visibilitychange",()=>document.hidden?c.suspend():c.resume())}
function tone(type,f,t,d,v,dest){const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(dest);o.start(t);o.stop(t+d+.02)}
function noise(t,d,v,f0,f1,dest){const s=c.createBufferSource();s.buffer=nb;s.loop=true;
  const lp=c.createBiquadFilter();lp.type="lowpass";lp.frequency.setValueAtTime(f0,t);lp.frequency.exponentialRampToValueAtTime(f1,t+d);
  const g=c.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  s.connect(lp);lp.connect(g);g.connect(dest);s.start(t);s.stop(t+d+.02)}
function thump(t,f0,f1,d,v,dest){const o=c.createOscillator(),g=c.createGain();
  o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);
  g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(dest);o.start(t);o.stop(t+d+.02)}
function loadAll(){for(const k in SD_){
    bufs[k]=fetch(SD_[k].u).then(r=>r.arrayBuffer()).then(ab=>new Promise(r=>{try{c.decodeAudioData(ab,r,()=>r(null))}catch(e){r(null)}})).catch(()=>null)}
  bufs.ocean.then(b=>{if(!b)return;const s=c.createBufferSource();s.buffer=b;s.loop=true;amb=c.createGain();
    amb.gain.value=ml*AMB*SD_.ocean.g;s.connect(amb);amb.connect(sfx);s.start()})}
function snd(k,v=1,x=null,rate=1){if(!c||!on||!bufs[k])return;
  bufs[k].then(b=>{if(!b)return;const s=c.createBufferSource(),g=c.createGain();s.buffer=b;s.playbackRate.value=rate;
    g.gain.value=v*SD_[k].g;s.connect(g);g.connect(x==null?sfx:out(x));s.start()})}
function sched(){while(next<c.currentTime+.25){note(step,next);next+=SD;step=(step+1)%48}}
function note(s,t){const bar=Math.floor(s/6),i=s%6,m=MEL[bar][i];
  if(m)tone("square",mtof(m),t,SD*1.7,.06,lpm);
  if(i===0)tone("triangle",mtof(BAS[bar][0]),t,SD*2.6,.3,mus);
  if(i===3)tone("triangle",mtof(BAS[bar][1]),t,SD*2.6,.26,mus);
  if(i===0)thump(t,120,45,.18,.6,mus);
  if(i===3)noise(t,.12,.22,5000,1500,mus);
  noise(t,.04,i%3?.03:.06,9000,6000,mus)}
function out(x){const p=c.createStereoPanner?c.createStereoPanner():null;
  if(!p)return sfx;p.pan.value=Math.max(-1,Math.min(1,(x-P.x)/500));p.connect(sfx);return p}
function ok(){return c&&on}
return{
 init,musVol:()=>mv,setMus(v){mv=v;if(c)mus.gain.setTargetAtTime(ml*.64*mv,c.currentTime,.1)},vol:()=>sv,setSfx(v){sv=v;if(sfx)sfx.gain.value=v},bufs,snd,
 mood(v){ml=v;if(c){mus.gain.setTargetAtTime(v*.64*mv,c.currentTime,.3);if(amb)amb.gain.setTargetAtTime(v*AMB*SD_.ocean.g,c.currentTime,.3)}},
 mute(){on=!on;if(mas)mas.gain.value=on?1:0;$("mui").textContent=on?"🔊":"🔇"},
 shot(k,own,x,d){const r=.96+R()*.08;
   if(own==="p")snd(["cannon_fire_1","cannon_broadside","cannon_fire_3"][k],1,null,r);
   else snd("cannon_fire_2",Math.max(.15,1-d/650)*.7,x,r)},
 hit(x,me){snd("ship_collision",me?1:.65,x,.95+R()*.15)},
 boom(x){snd("ship_explosion_1",1,x)},
 splash(x,d){snd(R()<.5?"cannonball_water_hit_1":"cannonball_water_hit_2",Math.max(.1,1-d/500)*.7,x,.95+R()*.1)}
}})();

let PO=[],potT=0,SM=[],FT=[],WK=[],RG=[],shake=0,lowT=-9,crashT=-9,phase=1,st="menu",P,E=[],B=[],FX=[],t=0,last=0,score=0,clock=0;
function mkIsland(sc){
  const r0=(34+R()*26)*sc,cx=90+R()*(W-180),cy=90+R()*(H-180),asp=.55+R()*.8,rot=R()*6.28;
  const hs=[2,3,4,5].map(k=>({k,a:(.2-.03*k+R()*.08)*(.5+R()),p:R()*6.28}));
  const bay=R()<.5?{t:R()*6.28,w:.35+R()*.3,d:.45+R()*.3}:null;
  const f=th=>{let m=1;for(const h of hs)m+=h.a*Math.sin(h.k*th+h.p);
    if(bay){const d=Math.atan2(Math.sin(th-bay.t),Math.cos(th-bay.t));m*=1-bay.d*Math.exp(-((d/bay.w)**2))}return Math.max(.3,m)};
  const pt=(th,sc)=>{const r=r0*f(th)*sc,x=Math.cos(th)*r,y=Math.sin(th)*r*asp;
    return[cx+x*Math.cos(rot)-y*Math.sin(rot),cy+x*Math.sin(rot)+y*Math.cos(rot)]};
  return{cx,cy,pt,pts:[...Array(48)].map((_,i)=>pt(i/48*6.283,1))}}
function near(a,b){if(Math.hypot(a.cx-b.cx,a.cy-b.cy)<60)return true;
  for(const p of a.pts)for(const q of b.pts)if(Math.hypot(p[0]-q[0],p[1]-q[1])<88)return true;return false}
const PHS=[{n:3,s:1.4},{n:4,s:1.25},{n:5,s:1.1}];
function placeIslands(ph){const out=[],f=PHS[(ph-1)%3],n=f.n;
  for(let k=0;k<n;k++)for(let tr=0;tr<400;tr++){const s=mkIsland(f.s);
    if(s.pts.every(p=>p[0]>72&&p[0]<W-72&&p[1]>72&&p[1]<H-72&&Math.hypot(p[0]-80,p[1]-400)>110)&&out.every(o=>!near(s,o))){out.push(s);break}}
  return out}
function ipath(c,s,sc,ox){const N=64,p=[...Array(N)].map((_,i)=>s.pt(i/N*6.283,sc));
  c.beginPath();c.moveTo((p[0][0]+p[N-1][0])/2+ox,(p[0][1]+p[N-1][1])/2);
  for(let i=0;i<N;i++){const a=p[i],b=p[(i+1)%N];c.quadraticCurveTo(a[0]+ox,a[1],(a[0]+b[0])/2+ox,(a[1]+b[1])/2)}c.closePath()}
function palm(c,x,y,s){c.save();c.translate(x,y);c.rotate(R()*6.28);
  for(let i=0;i<7;i++){c.rotate(6.283/7);c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(s*.5,-s*.2,s,0);c.quadraticCurveTo(s*.5,s*.2,0,0);
    c.fillStyle="#2d8a3e";c.fill();c.strokeStyle="#5fbf5c";c.lineWidth=1.2;c.beginPath();c.moveTo(0,0);c.lineTo(s*.85,0);c.stroke()}
  c.fillStyle="#7a5a2e";c.beginPath();c.arc(0,0,s*.13,0,6.283);c.fill();c.restore()}
function rock(c,x,y,s){c.fillStyle="#7f8d9a";c.beginPath();c.ellipse(x,y,s,s*.75,R()*3,0,6.283);c.fill();
  c.fillStyle="#aebbc6";c.beginPath();c.ellipse(x-s*.2,y-s*.2,s*.5,s*.35,0,0,6.283);c.fill()}
let ISL=[];
function genMap(){
  ISL=placeIslands(phase);
  const cvs=document.createElement("canvas");cvs.width=W;cvs.height=H;const x=cvs.getContext("2d");
  for(const s of ISL){x.save();x.shadowColor="rgba(150,230,242,.95)";x.shadowBlur=30;x.shadowOffsetX=3000;
    x.fillStyle="#000";ipath(x,s,1.05,-3000);x.fill();x.fill();x.restore()}
  for(const s of ISL){
    x.fillStyle=x.createPattern(TS,"repeat");ipath(x,s,1,0);x.fill();x.strokeStyle="rgba(190,160,100,.75)";x.lineWidth=3;x.stroke();
    x.fillStyle=x.createPattern(TG,"repeat");ipath(x,s,.6,0);x.fill();x.strokeStyle="rgba(45,110,50,.5)";x.lineWidth=2;x.stroke();
    for(let i=0,n=2+Math.floor(R()*3);i<n;i++){const p=s.pt(R()*6.283,.12+R()*.3);palm(x,p[0],p[1],13+R()*7)}
    for(let i=0,n=Math.floor(R()*3);i<n;i++){const p=s.pt(R()*6.283,.75+R()*.12);rock(x,p[0],p[1],5+R()*5)}
  }
  SHORE=cvs;
  const sm=document.createElement("canvas");sm.width=GW;sm.height=129;const q=sm.getContext("2d");
  q.setTransform(.25,0,0,.25,0,0);q.fillStyle="#000";for(const s of ISL){ipath(q,s,1,0);q.fill()}
  const d=q.getImageData(0,0,GW,129).data;for(let i=0;i<GW*129;i++)G[i]=d[i*4+3]>80?1:0;buildNav()}

function init(){
  genMap();
  P={x:80,y:400,a:-Math.PI/2,ta:-Math.PI/2,hp:100,wcd:[0,0,0],col:"blue"};
  E=[];for(let i=0,n=Math.min(8,4+phase);i<n;i++){const c=ENEMIES[i%5];let x,y;do{x=30+R()*(W-60);y=30+R()*(H-60)}while(blocked(x,y,30)||Math.hypot(x-P.x,y-P.y)<320);
    E.push({x,y,a:R()*6.28,hp:52+8*phase,mhp:52+8*phase,cd:1+R(),col:c,path:[],px:x,py:y,stt:0,sd:R()<.5?1:-1,sdt:2+R()*3})}
  B=[];FX=[];WK=[];RG=[];SM=[];FT=[];PO=[];potT=0;shake=0;
}
function shoot(b,a,sp,own,life,o={}){B.push({x:b.x+Math.cos(a)*28,y:b.y+Math.sin(a)*28,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,own,life,r:o.r||6,dmg:o.dmg||10,pierce:o.pierce,hit:[],col:o.col||"#2a3239"})}
function boom(x,y,sz){FX.push({x,y,sz,t:0,d:.5})}

function update(dt){
  t+=dt;clock+=dt;
  const dx=(keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0),dy=(keys.ArrowDown?1:0)-(keys.ArrowUp?1:0);
  if(dx||dy){const l=Math.hypot(dx,dy);P.ta=Math.atan2(dy,dx);if(move(P,dx/l*140*dt,dy/l*140*dt)&&clock-crashT>1){crashT=clock;A.snd("ship_collision",.5)}}
  const da=nang(P.ta-P.a);P.a+=Math.max(-7*dt,Math.min(7*dt,da));
  for(let i=0;i<3;i++){P.wcd[i]-=dt;
    if((keys["Digit"+(i+1)]||keys["Numpad"+(i+1)])&&P.wcd[i]<=0){P.wcd[i]=WEAP[i].cd;A.shot(i,"p");
      if(i===0)shoot(P,P.a,430,"p",1.2,{r:7,dmg:20});
      else if(i===1)for(const d of [-.22,0,.22])shoot(P,P.a+d,400,"p",1.1,{r:6,dmg:12,col:"#e08a2e"});
      else shoot(P,P.a,330,"p",1.8,{r:12,dmg:40,pierce:1,col:"#5b3a8c"})}}
  for(const e of E){
    const d=Math.hypot(P.x-e.x,P.y-e.y),spot=d<300&&los(e,P);
    if(spot){
      const ta=Math.atan2(P.y-e.y,P.x-e.x);e.a+=Math.max(-3*dt,Math.min(3*dt,nang(ta-e.a)));
      e.path=[];e.sdt-=dt;if(e.sdt<=0){e.sd=-e.sd;e.sdt=2+R()*3}
      const ux=(P.x-e.x)/d,uy=(P.y-e.y)/d,tx=-uy*e.sd,ty=ux*e.sd;
      let vx,vy;if(d>230){vx=ux*50+tx*25;vy=uy*50+ty*25}else if(d<140){vx=-ux*45+tx*30;vy=-uy*45+ty*30}else{vx=tx*45;vy=ty*45}
      if(move(e,vx*dt,vy*dt)){e.sd=-e.sd;e.sdt=2+R()*3}
      e.cd-=dt;if(e.cd<=0){shoot(e,e.a+(R()-.5)*.3,340,"e",1.1);e.cd=1.5+R()*.6;A.shot(0,"e",e.x,d)}
    }else{
      if(!e.path.length)newRoute(e);
      while(e.path.length>1&&clearLine(e,e.path[1]))e.path.shift();
      const n=e.path[0];
      if(n){const ta=Math.atan2(n.y-e.y,n.x-e.x),da=nang(ta-e.a);
        e.a+=Math.max(-3*dt,Math.min(3*dt,da));
        const sp=65*Math.max(.35,Math.cos(da));
        move(e,Math.cos(e.a)*sp*dt,Math.sin(e.a)*sp*dt);
        if(Math.hypot(n.x-e.x,n.y-e.y)<14)e.path.shift()}
      e.stt+=dt;if(e.stt>1.2){if(Math.hypot(e.x-e.px,e.y-e.py)<14)e.path=[];e.px=e.x;e.py=e.y;e.stt=0}
    }
  }
  potT+=dt;if(potT>=15){potT=0;spawnPot()}
  for(const p of PO){p.t+=dt;if(P.hp<100&&P.hp>0&&Math.hypot(p.x-P.x,p.y-P.y)<26){P.hp=Math.min(100,P.hp+10);p.t=99;
    FT.push({x:P.x,y:P.y-30,s:"+10 HP",c:"#7dff9a",t:0});RG.push({x:p.x,y:p.y,t:0});A.snd("score_point",.7)}}
  PO=PO.filter(p=>p.t<30);
  wk(P,dt);for(const e of E)wk(e,dt);smk(P,P.hp/100,dt);for(const e of E)smk(e,e.hp/e.mhp,dt);
  for(const b of B){
    b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;if(b.life<=0)b.exp=1;
    if(solid(b.x,b.y)){b.life=0;b.exp=1}
    if(b.own==="p"){for(const e of E)if(e.hp>0&&!b.hit.includes(e)&&Math.hypot(b.x-e.x,b.y-e.y)<22+b.r){b.hit.push(e);e.hp-=b.dmg;FT.push({x:e.x+(R()-.5)*14,y:e.y-26,s:"-"+b.dmg,c:"#fff3b0",t:0});if(!b.pierce)b.life=0;score+=1;boom(b.x,b.y,.55);A.hit(b.x);if(e.hp<=0){boom(e.x,e.y,1.3);score+=10;FT.push({x:e.x,y:e.y-34,s:"+10",c:"#f2c14e",t:0});A.boom(e.x);shake=Math.max(shake,.35);A.snd("score_point",.6)}}}
    else if(Math.hypot(b.x-P.x,b.y-P.y)<22+b.r){P.hp-=b.dmg;FT.push({x:P.x+(R()-.5)*14,y:P.y-26,s:"-"+b.dmg,c:"#ff8a70",t:0});b.life=0;boom(b.x,b.y,.55);A.hit(b.x,1);shake=Math.max(shake,.45);if(P.hp<=30&&P.hp>0&&clock-lowT>3){lowT=clock;A.snd("health_low",.7)}}
  }
  for(const b of B)if(b.life<=0&&b.exp){A.splash(b.x,Math.hypot(b.x-P.x,b.y-P.y));RG.push({x:b.x,y:b.y,t:0})}
  for(const w of WK)w.t+=dt;WK=WK.filter(w=>w.t<.9);for(const r of RG)r.t+=dt;RG=RG.filter(r=>r.t<.6);
  for(const s of SM){s.t+=dt;s.y-=(s.f?10:18)*dt}SM=SM.filter(s=>s.t<(s.f?.5:1.2));for(const f of FT){f.t+=dt;f.y-=34*dt}FT=FT.filter(f=>f.t<.9);
  B=B.filter(b=>b.life>0);E=E.filter(e=>e.hp>0);
  for(const f of FX)f.t+=dt;FX=FX.filter(f=>f.t<f.d);
  if(P.hp<=0){boom(P.x,P.y,1.4);A.boom(P.x);shake=.9;finish(false)}else if(!E.length)finish(true);
}

function drawShip(b){
  const [sx,sy]=SPR[b.col];g.save();g.translate(b.x,b.y);g.rotate(b.a+Math.PI/2);
  g.drawImage(SH,sx,sy,66,113,-66*S/2,-113*S/2,66*S,113*S);g.restore()}
function smallBar(x,y,w,v,max,sx){
  g.fillStyle="#0a1c28";g.fillRect(x-1,y-1,w+2,7);
  g.drawImage(UI,sx,699,196*Math.max(0,v/max),20,x,y,w*Math.max(0,v/max),5)}

function draw(){
  g.save();if(shake>0)g.translate((R()-.5)*shake*14,(R()-.5)*shake*14);
  g.fillStyle="#34c2e0";g.fillRect(-20,-20,W+40,H+40);
  for(const [al,sc,vx,vy] of [[.55,1,14,7],[.35,1.4,-10,8]]){const m=TWS*sc;g.save();g.globalAlpha=al;
    g.translate((t*vx)%m,(t*vy)%m);g.scale(sc,sc);g.fillStyle=PW;g.fillRect(-2*TWS,-2*TWS,W/sc+4*TWS,H/sc+4*TWS);g.restore()}
  g.drawImage(SHORE,0,0);
  if(!P){g.restore();return}
  for(const w of WK){const k=w.t/.9;g.fillStyle="rgba(255,255,255,"+.4*(1-k)+")";g.beginPath();g.arc(w.x,w.y,3+7*k,0,6.283);g.fill()}
  for(const r of RG){const k=r.t/.6;g.strokeStyle="rgba(255,255,255,"+.8*(1-k)+")";g.lineWidth=2;g.beginPath();g.arc(r.x,r.y,4+24*k,0,6.283);g.stroke()}
  for(const p of PO)drawPot(p);
  for(const b of B){
    g.strokeStyle="rgba(255,255,255,.55)";g.lineWidth=2;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x-b.vx*.05,b.y-b.vy*.05);g.stroke();
    g.fillStyle=b.col;g.beginPath();g.arc(b.x,b.y,b.r,0,6.283);g.fill();if(b.r>9){g.strokeStyle="#ffcf6b";g.lineWidth=2.5;g.stroke()}}
  for(const e of E){drawShip(e);smallBar(e.x-20,e.y-42,40,e.hp,e.mhp,730)}
  if(P.hp>0)drawShip(P);
  for(const s of SM){if(s.f){const k=s.t/.5;g.globalCompositeOperation="lighter";g.fillStyle="rgba(255,140,30,"+.7*(1-k)+")";g.beginPath();g.arc(s.x,s.y,6*(1-k)+2,0,6.283);g.fill();
      g.fillStyle="rgba(255,230,120,"+.8*(1-k)+")";g.beginPath();g.arc(s.x,s.y,3*(1-k)+1,0,6.283);g.fill();g.globalCompositeOperation="source-over"}
    else{const k=s.t/1.2;g.fillStyle="rgba(45,48,55,"+.5*(1-k)+")";g.beginPath();g.arc(s.x,s.y,4+11*k,0,6.283);g.fill()}}
  for(const f of FX){const k=f.t/f.d;g.globalAlpha=1-k*k;const s=f.sz*(.6+k*.5);
    g.drawImage(SH,0,0,74,75,f.x-37*s,f.y-37*s,74*s,75*s)}
  g.globalAlpha=1;
  g.font="800 16px 'Trebuchet MS',sans-serif";g.textAlign="center";g.lineWidth=3;g.strokeStyle="rgba(0,0,0,.65)";
  for(const f of FT){g.globalAlpha=Math.min(1,(1-f.t/.9)*1.6);g.fillStyle=f.c;g.strokeText(f.s,f.x,f.y);g.fillText(f.s,f.x,f.y)}
  g.globalAlpha=1;g.textAlign="left";
  $("hpf").style.width=196*Math.max(0,P.hp)/100+"px";
  $("hpt").textContent=Math.max(0,P.hp)+" / 100";
  $("sct").textContent=score;$("ph").textContent="Fase "+phase+" · inimigos: "+E.length;
  for(let i=0;i<3;i++)$("cd"+i).style.background="conic-gradient(rgba(5,20,30,.72) "+Math.max(0,P.wcd[i])/WEAP[i].cd*360+"deg,transparent 0)";
  const m=Math.floor(clock/60),s=Math.floor(clock%60);
  $("tmt").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  g.restore();
}

function sfxInput(){const i=document.createElement("input");i.type="range";i.min=0;i.max=100;i.className="sfxr";i.value=Math.round(A.vol()*100);i.setAttribute("aria-label","Volume dos efeitos");
  i.oninput=()=>{A.setSfx(i.value/100);document.querySelectorAll(".sfxr").forEach(o=>o.value=i.value)};i.onchange=()=>{i.blur();A.shot(0,"p")};return i}
function musInput(){const i=document.createElement("input");i.type="range";i.min=0;i.max=100;i.className="musr";i.value=Math.round(A.musVol()*100);i.setAttribute("aria-label","Volume da música");
  i.oninput=()=>A.setMus(i.value/100);i.onchange=()=>i.blur();return i}
function panel({logo,title,sub,big,btns,sfx}){
  const p=$("pn");p.innerHTML=(logo?'<div class="sp logo"></div>':"")+(title?"<h2>"+title+"</h2>":"")
    +(big!=null?'<div class="big">'+big+"</div>":"")+(sub?'<div class="sub">'+sub+"</div>":"");
  if(sfx){const d=document.createElement("div");d.className="vol";d.textContent="Volume da música";d.appendChild(musInput());p.appendChild(d);const e=document.createElement("div");e.className="vol";e.textContent="Volume dos efeitos";e.appendChild(sfxInput());p.appendChild(e)}
  btns.forEach(([l,fn,dark])=>{const b=document.createElement("button");b.className="btn"+(dark?" dark":"");b.textContent=l;b.onclick=()=>{A.init();fn()};p.appendChild(b)});
  $("ov").classList.add("on");$("svp").classList.remove("on");const f=p.querySelector("button");f&&f.focus()}
function hide(){$("ov").classList.remove("on");document.activeElement&&document.activeElement.blur()}
function menuPanel(){panel({logo:1,sub:"Setas para navegar, teclas 1, 2 e 3 para atirar. Pegue as poções vermelhas para curar 10 de HP. M liga ou desliga o som.",btns:[["JOGAR",play],["OPÇÕES",()=>options(menuPanel),1]]})}
function pausePanel(){panel({title:"PAUSADO",sub:"Pronto quando você estiver.",btns:[["RETOMAR",togglePause],["OPÇÕES",()=>options(pausePanel),1],["MENU PRINCIPAL",menu,1]]})}
function options(back){panel({title:"OPÇÕES",sfx:1,btns:[["VOLTAR",back]]})}
function menu(){st="menu";phase=1;A.mood(.35);init();$("hud").classList.remove("on");menuPanel()}
function play(){A.snd("game_start",.8);lowT=-9;crashT=-9;phase=1;init();score=0;clock=0;st="play";A.mood(.55);hide();$("hud").classList.add("on")}
function togglePause(){
  if(st==="play"){st="pause";A.snd("game_pause",.6);A.mood(.18);pausePanel()}
  else if(st==="pause"){st="play";A.snd("game_resume",.6);A.mood(.55);hide()}}
$("pz").onclick=togglePause;$("mu").onclick=A.mute;$("sb").onclick=()=>$("svp").classList.toggle("on");
function next(){A.snd("game_start",.8);phase++;init();st="play";A.mood(.55);hide();$("hud").classList.add("on")}
function finish(win){st="over";A.mood(.3);A.snd(win?"game_complete":"game_over",.9);
  setTimeout(()=>panel({title:win?"FASE "+phase+" COMPLETA!":"NAVIO AFUNDADO",big:score,
    sub:"PONTOS · "+$("tmt").textContent+(win?" · próxima fase: mais inimigos e novo mapa":" · você chegou à fase "+phase),
    btns:[win?["PRÓXIMA FASE",next]:["JOGAR DE NOVO",play],["MENU PRINCIPAL",menu,1]]}),700)}

function loop(ts){
  const dt=Math.min(.05,(ts-last)/1000||0);last=ts;
  shake=Math.max(0,shake-dt*1.6);if(st==="play")update(dt);
  else if(st==="menu"||st==="over"){t+=dt;if(st==="over"){for(const f of FX)f.t+=dt;FX=FX.filter(f=>f.t<f.d)}}
  draw();requestAnimationFrame(loop)}
Promise.all([load("assets/images/ships_miscellaneous_sheet.png"),load("assets/images/ui_sheet.png"),load("assets/images/tile_sand.png"),load("assets/images/tile_grass.png"),load("assets/images/tile_water.png")]).then(([a,b,c,d,w])=>{SH=a;UI=b;TS=c;TG=d;TW=w;TWS=w.width;PW=g.createPattern(w,"repeat");$("svp").appendChild(sfxInput());menu();requestAnimationFrame(loop)});
