import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
 
/* ── palette ── */
const C = {
  bg: "#F4EFE6",
  paper: "#FAF7F2",
  ink: "#1A1612",
  inkMid: "#6B5E52",
  inkLight: "#B5A99A",
  terra: "#C44B2B",
  terraLight: "#F2E0DA",
  gold: "#B88A3D",
  goldLight: "#F5EDDB",
  sage: "#4A7C6F",
  sageLight: "#DDF0EB",
  blue: "#2B5AA0",
  blueLight: "#DAE4F5",
  danger: "#B33030",
  dangerLight: "#F5DADA",
};
 
/* ── utils ── */
const e = (n, s) => {
  const v = parseFloat(n) || 0;
  if (s && Math.abs(v) >= 1000) return `€${(v / 1000).toFixed(1)}k`;
  return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(v);
};
const n = v => parseFloat(v) || 0;
const uid = () => Math.random().toString(36).slice(2, 9);
 
/* ── DATA ── */
const HIST = [
  {m:"Set",a:2024,stip:900,sv:487,tot:1302},{m:"Ott",a:2024,stip:950,sv:594,tot:1445},
  {m:"Nov",a:2024,stip:850,sv:590,tot:1526},{m:"Dic",a:2024,stip:950,sv:1347,tot:1913},
  {m:"Gen",a:2025,stip:1000,sv:702,tot:1467},{m:"Feb",a:2025,stip:900,sv:798,tot:1577},
  {m:"Mar",a:2025,stip:1000,sv:636,tot:1758},{m:"Apr",a:2025,stip:1000,sv:741,tot:1141},
  {m:"Mag",a:2025,stip:1100,sv:675,tot:1253},{m:"Giu",a:2025,stip:1100,sv:850,tot:1788},
  {m:"Lug",a:2025,stip:1100,sv:825,tot:1482},{m:"Ago",a:2025,stip:1100,sv:1212,tot:1785},
  {m:"Set",a:2025,stip:1100,sv:3137,tot:3621},{m:"Ott",a:2025,stip:2140,sv:949,tot:1658},
  {m:"Nov",a:2025,stip:2140,sv:908,tot:1846},{m:"Dic",a:2025,stip:2140,sv:1166,tot:1836},
  {m:"Gen",a:2026,stip:2140,sv:1034,tot:2534},{m:"Feb",a:2026,stip:2137,sv:645,tot:1746},
  {m:"Mar",a:2026,stip:2115,sv:805,tot:1949},{m:"Apr",a:2026,stip:2131,sv:1081,tot:2079},
  {m:"Mag",a:2026,stip:2215,sv:527,tot:1517},{m:"Giu",a:2026,stip:2215,sv:652,tot:1654},
];
 
const SPESE_GIU = [
  {id:"g01",nome:"Wind Telefono",costo:16.99,svago:false,cat:"utenze"},
  {id:"g02",nome:"Cina",costo:161.78,svago:true,cat:"svago"},
  {id:"g03",nome:"Dazn",costo:20,svago:false,cat:"abbonamenti"},
  {id:"g04",nome:"Piano Induzione",costo:57,svago:false,cat:"casa"},
  {id:"g05",nome:"Ass. iPhone",costo:14.99,svago:false,cat:"abbonamenti"},
  {id:"g06",nome:"Bollo Auto",costo:279.51,svago:false,cat:"auto"},
  {id:"g07",nome:"Cina extra",costo:40,svago:true,cat:"svago"},
  {id:"g08",nome:"CAF",costo:123,svago:false,cat:"servizi"},
  {id:"g09",nome:"Regalo Mamma",costo:24.5,svago:false,cat:"regali"},
  {id:"g10",nome:"Spesa",costo:17.1,svago:false,cat:"cibo"},
  {id:"g11",nome:"Colazione",costo:7.3,svago:true,cat:"svago"},
  {id:"g12",nome:"Shopping",costo:48.27,svago:true,cat:"svago"},
  {id:"g13",nome:"Gatto",costo:34.42,svago:false,cat:"animali"},
  {id:"g14",nome:"Cinese",costo:10.9,svago:true,cat:"svago"},
  {id:"g15",nome:"Benzina",costo:30,svago:false,cat:"trasporti"},
  {id:"g16",nome:"Spesa",costo:15,svago:false,cat:"cibo"},
  {id:"g17",nome:"Gatto",costo:115,svago:false,cat:"animali"},
  {id:"g18",nome:"Tabacco",costo:9.6,svago:false,cat:"personale"},
  {id:"g19",nome:"Benzina",costo:30,svago:false,cat:"trasporti"},
  {id:"g20",nome:"Spesa",costo:45.05,svago:false,cat:"cibo"},
  {id:"g21",nome:"Casello Sesto",costo:2.7,svago:false,cat:"trasporti"},
  {id:"g22",nome:"Colazione Firenze",costo:14,svago:true,cat:"svago"},
  {id:"g23",nome:"Caffè",costo:3.4,svago:true,cat:"svago"},
  {id:"g24",nome:"Profumo",costo:110,svago:true,cat:"svago"},
  {id:"g25",nome:"Spritz Firenze",costo:10,svago:true,cat:"svago"},
  {id:"g26",nome:"Trattoria Firenze",costo:59.35,svago:true,cat:"svago"},
  {id:"g27",nome:"Caffè + Cola",costo:8.5,svago:true,cat:"svago"},
  {id:"g28",nome:"Macelleria + We",costo:37.5,svago:false,cat:"cibo"},
  {id:"g29",nome:"Action",costo:8.51,svago:false,cat:"altro"},
  {id:"g30",nome:"Tabacco",costo:10.2,svago:false,cat:"personale"},
  {id:"g31",nome:"Benzina",costo:30,svago:false,cat:"trasporti"},
  {id:"g32",nome:"Parrucchiere",costo:20,svago:false,cat:"personale"},
  {id:"g33",nome:"Gatto",costo:32.5,svago:false,cat:"animali"},
  {id:"g34",nome:"Cinema",costo:14.2,svago:true,cat:"svago"},
  {id:"g35",nome:"Amazon",costo:56.9,svago:false,cat:"altro"},
  {id:"g36",nome:"Casello Bergamo",costo:5.8,svago:false,cat:"trasporti"},
  {id:"g37",nome:"Regalo Mamma Giada",costo:8.06,svago:false,cat:"regali"},
  {id:"g38",nome:"Spesa",costo:122.28,svago:false,cat:"cibo"},
];
 
const FISSE_GIU = [
  {id:"f1",nome:"Tabacco",costo:19.8},
  {id:"f2",nome:"Benzina",costo:90},
  {id:"f3",nome:"Spesa",costo:199.43},
  {id:"f4",nome:"Dazn",costo:20},
  {id:"f5",nome:"Gatto",costo:181.92},
  {id:"f6",nome:"Piano Induzione",costo:57},
];
 
const DEF = {
  stip:"2215", spese:SPESE_GIU, fisse:FISSE_GIU,
  conti:[
    {id:"c1",nome:"Intesa",saldo:"6509.34",col:C.terra},
    {id:"c2",nome:"Conto CA",saldo:"827",col:C.gold},
    {id:"c3",nome:"Scalable",saldo:"1711.15",col:C.sage},
  ],
  hist:HIST, budSv:"1200", budTot:"1800", insIdx:0,
};
 
async function ld(){try{const r=await window.storage.get("fin8");return r?JSON.parse(r.value):null;}catch{return null;}}
async function sv(s){try{await window.storage.set("fin8",JSON.stringify(s));}catch{}}
 
/* ── MINI COMPONENTS ── */
const Divider = () => <div style={{height:1,background:`${C.inkLight}30`,margin:"4px 0"}}/>;
 
const Tag = ({children, col}) => (
  <span style={{
    display:"inline-block", padding:"1px 7px", borderRadius:3,
    fontSize:9, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase",
    background: col+"20", color: col, border:`1px solid ${col}40`,
    fontFamily:"'IBM Plex Mono',monospace",
  }}>{children}</span>
);
 
const Mono = ({children, style}) => (
  <span style={{fontFamily:"'IBM Plex Mono',monospace",...style}}>{children}</span>
);
 
const BarStrip = ({val, max, col}) => {
  const pct = Math.min(val/Math.max(max,1)*100,100);
  const color = pct>85?C.danger:pct>65?C.gold:col;
  return (
    <div style={{height:3, background:`${C.inkLight}30`, borderRadius:99, overflow:"hidden"}}>
      <div style={{height:"100%", width:`${pct}%`, background:color, borderRadius:99,
        transition:"width 1s cubic-bezier(.16,1,.3,1)"}}/>
    </div>
  );
};
 
const ChartTip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:C.paper, border:`1px solid ${C.inkLight}40`, borderRadius:8,
      padding:"8px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
      boxShadow:"0 4px 20px rgba(0,0,0,.12)"}}>
      <div style={{color:C.inkMid, marginBottom:4, fontSize:9}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||C.ink, fontWeight:600}}>{p.name}: {e(p.value)}</div>
      ))}
    </div>
  );
};
 
/* ── INPUT ATOMS ── */
const TextInput = ({value, onChange, placeholder, autoFocus}) => (
  <input type="text" value={value} onChange={e2=>onChange(e2.target.value)}
    placeholder={placeholder} autoFocus={autoFocus}
    style={{
      background:"transparent", border:"none", borderBottom:`1.5px solid ${C.inkLight}`,
      color:C.ink, fontFamily:"'IBM Plex Mono',monospace", fontSize:13,
      padding:"8px 0", width:"100%", outline:"none",
      transition:"border-color .2s",
    }}
    onFocus={e2=>e2.target.style.borderColor=C.terra}
    onBlur={e2=>e2.target.style.borderColor=C.inkLight}
  />
);
 
const NumInput = ({value, onChange, big}) => (
  <div style={{display:"flex",alignItems:"baseline",gap:4}}>
    <span style={{fontFamily:"'IBM Plex Mono',monospace",color:C.inkLight,fontSize:big?18:13}}>€</span>
    <input type="number" min="0" step=".01" value={value} onChange={e2=>onChange(e2.target.value)}
      style={{
        background:"transparent", border:"none", borderBottom:`1.5px solid ${C.inkLight}`,
        color:C.terra, fontFamily:"'Playfair Display',serif",
        fontSize:big?26:16, fontWeight:700, padding:"4px 0",
        width:"100%", outline:"none", transition:"border-color .2s",
      }}
      onFocus={e2=>e2.target.style.borderColor=C.terra}
      onBlur={e2=>e2.target.style.borderColor=C.inkLight}
    />
  </div>
);
 
const Toggle = ({on, onChange}) => (
  <div onClick={()=>onChange(!on)} style={{
    width:34, height:19, borderRadius:99, cursor:"pointer",
    background:on?C.terra:`${C.inkLight}50`,
    position:"relative", transition:"background .2s", flexShrink:0,
  }}>
    <div style={{
      position:"absolute", top:2, left:on?15:2,
      width:15, height:15, borderRadius:"50%", background:"#fff",
      transition:"left .22s cubic-bezier(.16,1,.3,1)",
      boxShadow:"0 1px 4px rgba(0,0,0,.2)",
    }}/>
  </div>
);
 
/* ── CARD ── */
const Card = ({children, style, accent}) => (
  <div style={{
    background:C.paper, borderRadius:16,
    border:`1px solid ${C.inkLight}25`,
    padding:"18px 20px", marginBottom:12,
    borderLeft: accent ? `3px solid ${accent}` : undefined,
    boxShadow:"0 2px 12px rgba(26,22,18,.06)",
    ...style,
  }}>{children}</div>
);
 
const SectionLabel = ({children, col}) => (
  <div style={{
    fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
    letterSpacing:".16em", textTransform:"uppercase",
    color: col||C.inkLight, marginBottom:10,
  }}>{children}</div>
);
 
/* ──────────────────────────────────── MAIN ──────────────────────────────────── */
export default function App() {
  const [st, setSt] = useState(DEF);
  const [view, setView] = useState("home");
  const [ready, setReady] = useState(false);
  const [ns, setNs] = useState({nome:"",costo:"",svago:false,cat:"altro"});
  const [nf, setNf] = useState({nome:"",costo:""});
  const [editS, setEditS] = useState(null);
  const [editF, setEditF] = useState(null);
  const [toast, setToast] = useState(null);
  const [histDet, setHistDet] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const tickerRef = useRef(null);
 
  useEffect(()=>{ld().then(d=>{if(d)setSt(d);setReady(true)});},[]);
  useEffect(()=>{if(ready)sv(st);},[st,ready]);
 
  const upd = p => setSt(x=>({...x,...p}));
  const pop = (msg,err) => {setToast({msg,err}); setTimeout(()=>setToast(null),2400);};
 
  /* derived */
  const stip = n(st.stip);
  const totV = st.spese.reduce((a,s)=>a+n(s.costo),0);
  const totF = st.fisse.reduce((a,s)=>a+n(s.costo),0);
  const totSv = st.spese.filter(s=>s.svago).reduce((a,s)=>a+n(s.costo),0);
  const disp = stip - totV - totF;
  const patr = st.conti.reduce((a,c)=>a+n(c.saldo),0);
  const budSv = n(st.budSv), budTot = n(st.budTot);
 
  const allM = [...st.hist, {sv:totSv,fix:totF,stip,tot:totV}];
  const medSv = allM.reduce((a,m)=>a+n(m.sv),0)/allM.length;
  const medF = allM.reduce((a,m)=>a+n(m.fix||0),0)/allM.length;
  const rispMed = stip - medSv - medF;
 
  const score = Math.round(Math.min(100,Math.max(0,
    (disp>0?30:0)+(rispMed>200?25:rispMed>0?15:0)+
    (totSv<budSv?25:totSv<budSv*1.2?10:0)+
    ((totV+totF)<stip*.85?20:(totV+totF)<stip?10:0)
  )));
  const scoreCol = score>=70?C.sage:score>=40?C.gold:C.danger;
 
  const day=new Date().getDate(), days=30;
  const forecast=(totV/Math.max(day,1))*days+totF;
  const fSav=stip-forecast;
 
  /* area data */
  const areaD = st.hist.slice(-12).map(m=>({
    name:m.m, Spese:n(m.tot), Risparmio:Math.max(n(m.stip)-n(m.tot),0)
  }));
 
  /* insights */
  const ins = (()=>{
    const l=[];
    const svPct=budSv>0?(totSv/budSv)*100:0;
    const top=[...st.spese].sort((a,b)=>n(b.costo)-n(a.costo))[0];
    const rossi=st.hist.filter(m=>n(m.tot)>n(m.stip)).length;
    if(svPct>100) l.push({ic:"⚠",col:C.danger,t:"Svago sforato",d:`Speso ${e(totSv)} su ${e(budSv)} (+${(svPct-100).toFixed(0)}%). Riduci le uscite.`});
    else if(svPct>75) l.push({ic:"◐",col:C.gold,t:"Svago quasi al limite",d:`Al ${svPct.toFixed(0)}% del budget (${e(totSv)}/${e(budSv)}). Attenzione.`});
    else l.push({ic:"✓",col:C.sage,t:"Svago sotto controllo",d:`Solo ${e(totSv)} su ${e(budSv)} usati (${svPct.toFixed(0)}%). Restano ${e(budSv-totSv)}.`});
    if(disp<0) l.push({ic:"!",col:C.danger,t:"Spese oltre lo stipendio",d:`Le spese superano lo stipendio di ${e(Math.abs(disp))}. Rivedi le voci più alte.`});
    else if(rispMed>300) l.push({ic:"↑",col:C.sage,t:"Risparmio ottimo",d:`Media ${e(rispMed)}/mese → circa ${e(rispMed*12)}/anno. Considera un investimento automatico.`});
    else l.push({ic:"→",col:C.gold,t:"Margine di risparmio ridotto",d:`Risparmio medio: ${e(rispMed)}/mese. Tagliare lo svago del 20% vale +${e(medSv*.2)}/mese.`});
    if(top) l.push({ic:"◉",col:C.blue,t:"Top spesa del mese",d:`"${top.nome}" — ${e(top.costo)}, il ${((n(top.costo)/Math.max(totV,1))*100).toFixed(0)}% delle variabili.`});
    l.push({ic:"◈",col:C.terra,t:"Proiezione patrimonio",d:`Con ${e(Math.max(disp,0))}/mese risparmiati, a fine anno: ${e(patr+Math.max(disp,0)*12)}.`});
    if(rossi>3) l.push({ic:"▲",col:C.danger,t:"Attenzione mesi in rosso",d:`${rossi} mesi su ${st.hist.length} in deficit. Rivedi le fisse (oggi: ${e(totF)}).`});
    else l.push({ic:"◆",col:C.sage,t:"Bilancio storico solido",d:`Solo ${rossi} mesi in rosso su ${st.hist.length}. Gestione finanziaria sana.`});
    return l;
  })();
  const curIns = ins[n(st.insIdx)%ins.length];
 
  /* actions */
  const addV=()=>{
    if(!ns.nome.trim()||n(ns.costo)<=0){pop("Dati incompleti",1);return;}
    upd({spese:[{id:uid(),...ns,costo:n(ns.costo)},...st.spese]});
    setNs({nome:"",costo:"",svago:false,cat:"altro"});
    setAddOpen(false); pop("Spesa aggiunta");
  };
  const addF=()=>{
    if(!nf.nome.trim()||n(nf.costo)<=0){pop("Dati incompleti",1);return;}
    upd({fisse:[{id:uid(),...nf,costo:n(nf.costo)},...st.fisse]});
    setNf({nome:"",costo:""}); pop("Spesa fissa aggiunta");
  };
  const archive=()=>{
    const d=new Date(); const SH=["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
    upd({hist:[...st.hist,{m:SH[d.getMonth()],a:d.getFullYear(),stip,sv:Math.round(totSv),tot:Math.round(totV)}],spese:[],fisse:[]});
    pop("Mese archiviato"); setView("home");
  };
 
  const TABS=[
    {id:"home",lbl:"Home",ico:"◉"},
    {id:"spese",lbl:"Spese",ico:"＋"},
    {id:"saldo",lbl:"Saldo",ico:"◈"},
    {id:"analisi",lbl:"Analisi",ico:"∿"},
    {id:"storico",lbl:"Storico",ico:"▤"},
  ];
 
  /* ── global styles ── */
  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.ink,fontFamily:"'Lora',serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Lora:wght@400;500;600&family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input::placeholder{color:${C.inkLight}}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-thumb{background:${C.inkLight}60;border-radius:99px}
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
        .su{animation:slideUp .32s cubic-bezier(.16,1,.3,1) forwards}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .ticker-inner{display:flex;gap:0;animation:ticker 28s linear infinite}
        .ticker-inner:hover{animation-play-state:paused}
        .row-item:hover{background:${C.bg}!important}
        .tab-btn:hover{background:${C.terraLight}!important}
        .press:active{transform:scale(.97)}
        select option{background:${C.paper};color:${C.ink}}
      `}</style>
 
      {/* ── TICKER HEADER ── */}
      <div style={{background:C.ink, overflow:"hidden", padding:"8px 0", position:"sticky", top:0, zIndex:50}}>
        <div className="ticker-inner">
          {[...HIST,...HIST].map((m,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:16,padding:"0 28px",flexShrink:0}}>
              <Mono style={{fontSize:10,color:C.inkLight,letterSpacing:".08em"}}>{m.m} {String(m.a).slice(2)}</Mono>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:n(m.stip)>n(m.tot)?C.sage:C.terra,fontWeight:700}}>{e(m.tot,1)}</span>
              <div style={{width:1,height:12,background:`${C.inkLight}40`}}/>
            </div>
          ))}
        </div>
      </div>
 
      {/* ── PAGE HEADER ── */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"20px 20px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:4}}>
          <div>
            <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,letterSpacing:".16em",textTransform:"uppercase",marginBottom:6}}>Giugno 2026</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,fontStyle:"italic",lineHeight:1,color:C.ink}}>Le Mie Finanze</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginBottom:3}}>STIPENDIO</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.terra}}>{e(stip)}</div>
          </div>
        </div>
        <div style={{height:1,background:`${C.ink}15`,marginTop:14,marginBottom:0}}/>
      </div>
 
      {/* ── CONTENT ── */}
      <div style={{maxWidth:500,margin:"0 auto",padding:"16px 20px 90px"}}>
 
        {/* ════════════════ HOME */}
        {view==="home" && (
          <div className="su">
 
            {/* SCORE + QUICK STATS */}
            <Card style={{padding:"22px 20px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                <div>
                  <SectionLabel>Salute finanziaria</SectionLabel>
                  <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                    <span style={{fontFamily:"'Playfair Display',serif",fontSize:56,fontWeight:800,color:scoreCol,lineHeight:1}}>{score}</span>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:14,color:C.inkLight}}>/100</span>
                  </div>
                  <Tag col={scoreCol}>{score>=70?"Ottima":score>=40?"Discreta":"Attenzione"}</Tag>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginBottom:8}}>QUESTO MESE</div>
                  {[
                    {l:"Disponibile",v:e(disp,1),c:disp>=0?C.sage:C.danger},
                    {l:"Spese var.",v:e(totV,1),c:C.blue},
                    {l:"Svago",v:e(totSv,1),c:C.gold},
                  ].map(r=>(
                    <div key={r.l} style={{marginBottom:5,display:"flex",gap:8,justifyContent:"flex-end",alignItems:"center"}}>
                      <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight}}>{r.l}</span>
                      <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:600,color:r.c}}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Score bar */}
              <BarStrip val={score} max={100} col={scoreCol}/>
            </Card>
 
            {/* TOTALE */}
            <Card>
              <SectionLabel>Totale costi</SectionLabel>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:12}}>
                {[
                  {l:"Variabili",v:totV,c:C.blue},{l:"Fisse",v:totF,c:C.sage},
                  {l:"Svago",v:totSv,c:C.gold},{l:"Complessivo",v:totV+totF,c:C.terra},
                ].map(r=>(
                  <div key={r.l}>
                    <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:C.inkLight,letterSpacing:".1em",textTransform:"uppercase",marginBottom:3}}>{r.l}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:r.c}}>{e(r.v,1)}</div>
                  </div>
                ))}
              </div>
              <Divider/>
              <div style={{marginTop:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight}}>STIPENDIO</span>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:600,color:C.ink}}>{e(stip)}</span>
                </div>
                <NumInput value={st.stip} onChange={v=>upd({stip:v})} big/>
              </div>
            </Card>
 
            {/* BUDGET */}
            <Card>
              <SectionLabel>Budget mensile</SectionLabel>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {[
                  {l:"Svago",cur:totSv,max:budSv,col:C.gold,key:"budSv"},
                  {l:"Spese totali",cur:totV+totF,max:budTot,col:C.blue,key:"budTot"},
                ].map(r=>(
                  <div key={r.l}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:C.inkMid}}>{r.l}</span>
                      <Mono style={{fontSize:11,color:r.cur>r.max?C.danger:C.sage,fontWeight:600}}>{e(r.cur,1)} <span style={{color:C.inkLight,fontWeight:400}}>/ {e(r.max,1)}</span></Mono>
                    </div>
                    <BarStrip val={r.cur} max={r.max} col={r.col}/>
                    <div style={{marginTop:8}}>
                      <NumInput value={st[r.key]} onChange={v=>upd({[r.key]:v})}/>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
 
            {/* PREVISIONE */}
            <Card accent={C.gold}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div>
                  <SectionLabel col={C.gold}>🔮 Previsione fine mese</SectionLabel>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:C.gold}}>{e(forecast)}</div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:C.inkMid,marginTop:4}}>
                    Risparmio atteso <span style={{color:fSav>=0?C.sage:C.danger,fontWeight:600}}>{e(fSav)}</span>
                  </div>
                </div>
                <div style={{textAlign:"right",paddingTop:4}}>
                  <Mono style={{fontSize:9,color:C.inkLight}}>giorno {day}/{days}</Mono><br/>
                  <Mono style={{fontSize:12,color:C.inkMid,marginTop:3}}>{e(totV/Math.max(day,1),1)}/die</Mono>
                </div>
              </div>
              <BarStrip val={day} max={days} col={C.gold}/>
            </Card>
 
            {/* INSIGHTS */}
            <Card accent={curIns.col}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <SectionLabel>Smart Insights — {n(st.insIdx)%ins.length+1}/{ins.length}</SectionLabel>
                <button onClick={()=>upd({insIdx:(n(st.insIdx)+1)%ins.length})} className="press"
                  style={{background:"transparent",border:`1px solid ${C.inkLight}40`,borderRadius:6,
                  padding:"4px 10px",fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:C.inkMid,cursor:"pointer"}}>
                  prossimo →
                </button>
              </div>
              <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:20,color:curIns.col,lineHeight:1,flexShrink:0,width:24,textAlign:"center"}}>{curIns.ic}</span>
                <div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:curIns.col,marginBottom:4}}>{curIns.t}</div>
                  <div style={{fontSize:13,color:C.inkMid,lineHeight:1.65}}>{curIns.d}</div>
                </div>
              </div>
              {/* dots */}
              <div style={{display:"flex",gap:5,marginTop:14,justifyContent:"center"}}>
                {ins.map((_,i)=>(
                  <div key={i} onClick={()=>upd({insIdx:i})} style={{
                    width:n(st.insIdx)%ins.length===i?16:4, height:4, borderRadius:99,
                    background:n(st.insIdx)%ins.length===i?curIns.col:`${C.inkLight}50`,
                    cursor:"pointer", transition:"all .25s",
                  }}/>
                ))}
              </div>
            </Card>
 
            {/* ARCHIVIA */}
            <button onClick={archive} className="press" style={{
              width:"100%",background:"transparent",border:`1.5px dashed ${C.inkLight}60`,
              borderRadius:12,padding:"12px",color:C.inkMid,
              fontFamily:"'IBM Plex Mono',monospace",fontSize:11,letterSpacing:".06em",cursor:"pointer",
            }}>↓ Archivia Giugno · inizia Luglio</button>
          </div>
        )}
 
        {/* ════════════════ SPESE */}
        {view==="spese" && (
          <div className="su">
            {/* quick totals */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
              {[
                {l:"Variabili",v:totV,c:C.blue},
                {l:"Svago",v:totSv,c:C.gold},
                {l:"Fisse",v:totF,c:C.sage},
              ].map(r=>(
                <Card key={r.l} style={{marginBottom:0,padding:"14px 12px",textAlign:"center"}}>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:C.inkLight,letterSpacing:".1em",marginBottom:5}}>{r.l.toUpperCase()}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:r.c}}>{e(r.v,1)}</div>
                </Card>
              ))}
            </div>
 
            {/* ADD */}
            {!addOpen ? (
              <button onClick={()=>setAddOpen(true)} className="press" style={{
                width:"100%",background:C.terra,color:"#fff",border:"none",borderRadius:12,
                padding:"13px",fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:600,
                letterSpacing:".04em",cursor:"pointer",marginBottom:12,
                boxShadow:`0 4px 16px ${C.terra}40`,
              }}>+ Aggiungi spesa</button>
            ):(
              <Card style={{border:`1.5px solid ${C.terra}40`,marginBottom:12}}>
                <SectionLabel col={C.terra}>Nuova spesa</SectionLabel>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <TextInput value={ns.nome} onChange={v=>setNs(p=>({...p,nome:v}))} placeholder="Nome spesa..." autoFocus/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div>
                      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginBottom:6}}>IMPORTO</div>
                      <NumInput value={ns.costo} onChange={v=>setNs(p=>({...p,costo:v}))}/>
                    </div>
                    <div>
                      <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginBottom:6}}>CATEGORIA</div>
                      <select value={ns.cat} onChange={e2=>setNs(p=>({...p,cat:e2.target.value}))} style={{
                        background:"transparent",border:"none",borderBottom:`1.5px solid ${C.inkLight}`,
                        color:C.ink,fontFamily:"'IBM Plex Mono',monospace",fontSize:12,
                        padding:"8px 0",width:"100%",outline:"none",
                      }}>
                        {["svago","cibo","trasporti","casa","animali","abbonamenti","personale","auto","regali","utenze","servizi","finanza","altro"].map(c=><option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <Toggle on={ns.svago} onChange={v=>setNs(p=>({...p,svago:v}))}/>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:ns.svago?C.terra:C.inkMid}}>Conta come Svago</span>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button onClick={addV} className="press" style={{flex:1,background:C.terra,color:"#fff",border:"none",borderRadius:10,padding:"11px",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,fontWeight:600,cursor:"pointer"}}>Aggiungi</button>
                    <button onClick={()=>setAddOpen(false)} className="press" style={{background:"transparent",border:`1px solid ${C.inkLight}40`,borderRadius:10,padding:"11px 16px",fontFamily:"'IBM Plex Mono',monospace",fontSize:12,color:C.inkMid,cursor:"pointer"}}>✕</button>
                  </div>
                </div>
              </Card>
            )}
 
            {/* LIST */}
            {st.spese.length>0&&(
              <Card>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <SectionLabel>Spese variabili</SectionLabel>
                  <Mono style={{fontSize:9,color:C.inkLight}}>{st.spese.length} voci · {e(totV,1)}</Mono>
                </div>
                {st.spese.map(s=>{
                  if(editS===s.id) return (
                    <div key={s.id} style={{padding:"12px",background:C.bg,borderRadius:10,marginBottom:6}}>
                      <TextInput value={s.nome} onChange={v=>upd({spese:st.spese.map(x=>x.id===s.id?{...x,nome:v}:x)})}/>
                      <div style={{marginTop:10}}><NumInput value={s.costo} onChange={v=>upd({spese:st.spese.map(x=>x.id===s.id?{...x,costo:v}:x)})}/></div>
                      <div style={{display:"flex",gap:8,marginTop:12}}>
                        <button onClick={()=>setEditS(null)} className="press" style={{flex:1,background:C.terra,color:"#fff",border:"none",borderRadius:8,padding:"9px",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,fontWeight:600,cursor:"pointer"}}>✓ Salva</button>
                        <button onClick={()=>upd({spese:st.spese.filter(x=>x.id!==s.id)})} className="press" style={{background:C.dangerLight,color:C.danger,border:`1px solid ${C.danger}30`,borderRadius:8,padding:"9px 14px",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,cursor:"pointer"}}>✕</button>
                      </div>
                    </div>
                  );
                  return (
                    <div key={s.id} className="row-item" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 6px",borderBottom:`1px solid ${C.inkLight}20`,borderRadius:6,transition:"background .15s"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
                        <div style={{width:6,height:6,borderRadius:"50%",background:s.svago?C.gold:C.blue,flexShrink:0}}/>
                        <div style={{minWidth:0}}>
                          <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.nome}</div>
                          <div style={{display:"flex",gap:4,marginTop:2}}>
                            <Tag col={s.svago?C.gold:C.blue}>{s.cat||"altro"}</Tag>
                            {s.svago&&<Tag col={C.terra}>svago</Tag>}
                          </div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginLeft:8}}>
                        <Mono style={{fontSize:13,fontWeight:600,color:C.ink}}>{e(s.costo)}</Mono>
                        <button onClick={()=>upd({spese:st.spese.map(x=>x.id===s.id?{...x,svago:!x.svago}:x)})} style={{background:"none",border:"none",color:s.svago?C.gold:C.inkLight,fontSize:12,cursor:"pointer",padding:2}}>⬡</button>
                        <button onClick={()=>setEditS(s.id)} style={{background:"none",border:"none",color:C.inkLight,fontSize:13,cursor:"pointer",padding:2}}>✎</button>
                        <button onClick={()=>upd({spese:st.spese.filter(x=>x.id!==s.id)})} style={{background:"none",border:"none",color:C.inkLight,fontSize:13,cursor:"pointer",padding:2}}>✕</button>
                      </div>
                    </div>
                  );
                })}
              </Card>
            )}
 
            {/* FISSE */}
            <Card accent={C.sage}>
              <SectionLabel col={C.sage}>Spese fisse</SectionLabel>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12}}>
                <TextInput value={nf.nome} onChange={v=>setNf(p=>({...p,nome:v}))} placeholder="Nome spesa fissa..."/>
                <NumInput value={nf.costo} onChange={v=>setNf(p=>({...p,costo:v}))}/>
                <button onClick={addF} className="press" style={{background:"transparent",border:`1.5px solid ${C.sage}`,borderRadius:8,padding:"9px",color:C.sage,fontFamily:"'IBM Plex Mono',monospace",fontSize:11,fontWeight:600,cursor:"pointer"}}>+ Aggiungi</button>
              </div>
              {st.fisse.map(s=>{
                if(editF===s.id) return (
                  <div key={s.id} style={{padding:"12px",background:C.bg,borderRadius:10,marginBottom:6}}>
                    <TextInput value={s.nome} onChange={v=>upd({fisse:st.fisse.map(x=>x.id===s.id?{...x,nome:v}:x)})}/>
                    <div style={{marginTop:10}}><NumInput value={s.costo} onChange={v=>upd({fisse:st.fisse.map(x=>x.id===s.id?{...x,costo:v}:x)})}/></div>
                    <div style={{display:"flex",gap:8,marginTop:12}}>
                      <button onClick={()=>setEditF(null)} className="press" style={{flex:1,background:C.sage,color:"#fff",border:"none",borderRadius:8,padding:"9px",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,fontWeight:600,cursor:"pointer"}}>✓ Salva</button>
                      <button onClick={()=>upd({fisse:st.fisse.filter(x=>x.id!==s.id)})} className="press" style={{background:C.dangerLight,color:C.danger,border:`1px solid ${C.danger}30`,borderRadius:8,padding:"9px 14px",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,cursor:"pointer"}}>✕</button>
                    </div>
                  </div>
                );
                return (
                  <div key={s.id} className="row-item" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 6px",borderBottom:`1px solid ${C.inkLight}20`,borderRadius:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:C.sage}}/>
                      <span style={{fontSize:13,fontWeight:500}}>{s.nome}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <Mono style={{fontSize:13,fontWeight:600,color:C.sage}}>{e(s.costo)}</Mono>
                      <button onClick={()=>setEditF(s.id)} style={{background:"none",border:"none",color:C.inkLight,fontSize:13,cursor:"pointer",padding:2}}>✎</button>
                      <button onClick={()=>upd({fisse:st.fisse.filter(x=>x.id!==s.id)})} style={{background:"none",border:"none",color:C.inkLight,fontSize:13,cursor:"pointer",padding:2}}>✕</button>
                    </div>
                  </div>
                );
              })}
              {st.fisse.length>0&&<div style={{paddingTop:10,textAlign:"right",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:C.sage,fontWeight:600}}>Totale: {e(totF)}</div>}
            </Card>
          </div>
        )}
 
        {/* ════════════════ SALDO */}
        {view==="saldo" && (
          <div className="su">
            {/* patrimonio hero */}
            <Card style={{textAlign:"center",padding:"28px 20px 24px"}}>
              <SectionLabel>Patrimonio totale</SectionLabel>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:46,fontWeight:800,color:C.terra,letterSpacing:"-.02em",lineHeight:1}}>{e(patr)}</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:C.inkLight,marginTop:8}}>
                {st.conti.map(c=>`${c.nome} ${e(n(c.saldo),1)}`).join("  ·  ")}
              </div>
              <div style={{marginTop:16}}><BarStrip val={patr} max={patr*1.2||1} col={C.terra}/></div>
            </Card>
 
            {/* conti */}
            {st.conti.map((c,i)=>(
              <Card key={c.id} accent={c.col}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <input value={c.nome} onChange={ev=>upd({conti:st.conti.map(x=>x.id===c.id?{...x,nome:ev.target.value}:x)})}
                    style={{background:"transparent",border:"none",borderBottom:`1.5px solid ${C.inkLight}`,
                    fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:C.ink,
                    padding:"2px 4px",outline:"none",width:"auto",minWidth:80}}/>
                  <div style={{width:10,height:10,borderRadius:"50%",background:c.col}}/>
                </div>
                <SectionLabel>Saldo</SectionLabel>
                <NumInput value={c.saldo} onChange={v=>upd({conti:st.conti.map(x=>x.id===c.id?{...x,saldo:v}:x)})} big/>
                <div style={{marginTop:14}}>
                  <BarStrip val={n(c.saldo)} max={patr||1} col={c.col}/>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginTop:4,textAlign:"right"}}>
                    {((n(c.saldo)/Math.max(patr,1))*100).toFixed(0)}% del patrimonio
                  </div>
                </div>
              </Card>
            ))}
 
            <Card accent={disp>=0?C.sage:C.danger} style={{background:disp>=0?C.sageLight:C.dangerLight}}>
              <SectionLabel col={disp>=0?C.sage:C.danger}>Disponibile mensile</SectionLabel>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:800,color:disp>=0?C.sage:C.danger}}>{e(disp)}</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:C.inkMid,marginTop:6}}>{e(stip)} − {e(totV)} − {e(totF)}</div>
            </Card>
          </div>
        )}
 
        {/* ════════════════ ANALISI */}
        {view==="analisi" && (
          <div className="su">
            {/* medie */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {[
                {l:"Media Svago",v:medSv,c:C.gold,ic:"🎭"},
                {l:"Media Fisse",v:medF,c:C.blue,ic:"📌"},
                {l:"Risparmio Medio",v:rispMed,c:rispMed>=0?C.sage:C.danger,ic:"💰"},
                {l:"Totale Medie",v:medSv+medF,c:C.terra,ic:"∑"},
              ].map(r=>(
                <Card key={r.l} style={{marginBottom:0,padding:"16px"}}>
                  <div style={{fontSize:20,marginBottom:8}}>{r.ic}</div>
                  <SectionLabel col={r.c}>{r.l}</SectionLabel>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:r.c}}>{e(r.v,1)}</div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginTop:2}}>{allM.length} mesi</div>
                </Card>
              ))}
            </div>
 
            {/* area chart */}
            <Card>
              <SectionLabel>Trend — ultimi 12 mesi</SectionLabel>
              <ResponsiveContainer width="100%" height={170}>
                <AreaChart data={areaD} margin={{top:4,right:4,bottom:0,left:0}}>
                  <defs>
                    <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.blue} stopOpacity={.2}/>
                      <stop offset="95%" stopColor={C.blue} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.sage} stopOpacity={.2}/>
                      <stop offset="95%" stopColor={C.sage} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,fill:C.inkLight}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,fill:C.inkLight}} tickFormatter={v=>e(v,1)} axisLine={false} tickLine={false} width={44}/>
                  <Tooltip content={<ChartTip/>}/>
                  <Area type="monotone" dataKey="Spese" stroke={C.blue} strokeWidth={1.5} fill="url(#gS)" dot={false}/>
                  <Area type="monotone" dataKey="Risparmio" stroke={C.sage} strokeWidth={1.5} fill="url(#gR)" dot={false}/>
                </AreaChart>
              </ResponsiveContainer>
              <div style={{display:"flex",gap:16,marginTop:10,justifyContent:"center"}}>
                {[{c:C.blue,l:"Spese"},{c:C.sage,l:"Risparmio"}].map(r=>(
                  <div key={r.l} style={{display:"flex",alignItems:"center",gap:5}}>
                    <div style={{width:16,height:2,background:r.c,borderRadius:99}}/>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight}}>{r.l}</span>
                  </div>
                ))}
              </div>
            </Card>
 
            {/* svago bar */}
            <Card>
              <SectionLabel col={C.gold}>Svago mensile — storico</SectionLabel>
              <ResponsiveContainer width="100%" height={145}>
                <BarChart data={[...st.hist.slice(-14),{m:"Giu",sv:totSv}].map(m=>({name:m.m,Svago:n(m.sv)}))} margin={{top:4,right:4,bottom:0,left:0}}>
                  <XAxis dataKey="name" tick={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,fill:C.inkLight}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,fill:C.inkLight}} tickFormatter={v=>e(v,1)} axisLine={false} tickLine={false} width={42}/>
                  <Tooltip content={<ChartTip/>}/>
                  <Bar dataKey="Svago" fill={C.gold} radius={[4,4,0,0]} opacity={.85}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
 
            {/* patrimonio bar */}
            <Card>
              <SectionLabel>Conti — distribuzione patrimonio</SectionLabel>
              {st.conti.map((c,i)=>(
                <div key={c.id} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,color:C.inkMid}}>{c.nome}</span>
                    <Mono style={{fontSize:11,fontWeight:600,color:c.col}}>{e(n(c.saldo),1)}</Mono>
                  </div>
                  <BarStrip val={n(c.saldo)} max={patr||1} col={c.col}/>
                </div>
              ))}
              <Divider/>
              <div style={{display:"flex",justifyContent:"space-between",paddingTop:10}}>
                <Mono style={{fontSize:10,color:C.inkLight}}>TOTALE PATRIMONIO</Mono>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:C.terra}}>{e(patr)}</div>
              </div>
            </Card>
          </div>
        )}
 
        {/* ════════════════ STORICO */}
        {view==="storico" && (
          <div className="su">
            {histDet!==null ? (
              <div>
                <button onClick={()=>setHistDet(null)} className="press" style={{
                  background:"transparent",border:`1px solid ${C.inkLight}40`,borderRadius:8,
                  padding:"7px 14px",fontFamily:"'IBM Plex Mono',monospace",fontSize:11,
                  color:C.inkMid,cursor:"pointer",marginBottom:14,
                }}>← Torna alla lista</button>
                {(()=>{const m=st.hist[histDet];const r=n(m.stip)-n(m.tot);return(
                  <>
                    <Card style={{padding:"20px"}}>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:800,fontStyle:"italic"}}>{m.m} {m.a}</div>
                    </Card>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      {[
                        {l:"Stipendio",v:m.stip,c:C.sage},
                        {l:"Spese tot.",v:m.tot,c:C.blue},
                        {l:"Svago",v:m.sv,c:C.gold},
                        {l:"Risparmio",v:r,c:r>=0?C.sage:C.danger},
                      ].map(r2=>(
                        <Card key={r2.l} style={{marginBottom:0,padding:"14px"}} accent={r2.c}>
                          <SectionLabel col={r2.c}>{r2.l}</SectionLabel>
                          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:r2.c}}>{e(r2.v,1)}</div>
                        </Card>
                      ))}
                    </div>
                  </>
                )})()}
              </div>
            ):(
              <div>
                <Card style={{padding:"16px 20px",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <SectionLabel col={C.terra}>Totale storico</SectionLabel>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.terra}}>{e(st.hist.reduce((a,m)=>a+n(m.tot),0),1)}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <SectionLabel>Mesi</SectionLabel>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700}}>{st.hist.length}</div>
                    </div>
                  </div>
                </Card>
 
                {[...st.hist].reverse().map((m,i)=>{
                  const idx=st.hist.length-1-i;
                  const r=n(m.stip)-n(m.tot);
                  return(
                    <div key={i} onClick={()=>setHistDet(idx)} className="row-item" style={{
                      display:"flex",justifyContent:"space-between",alignItems:"center",
                      padding:"14px 10px",borderBottom:`1px solid ${C.inkLight}25`,
                      cursor:"pointer",borderRadius:8,transition:"background .15s",
                    }}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{
                          width:40,height:40,borderRadius:10,
                          background:r>=0?C.sageLight:C.dangerLight,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontFamily:"'IBM Plex Mono',monospace",fontSize:10,
                          color:r>=0?C.sage:C.danger,fontWeight:600,flexShrink:0,
                        }}>{m.m}</div>
                        <div>
                          <div style={{fontSize:14,fontWeight:600}}>{m.m} {m.a}</div>
                          <div style={{display:"flex",gap:5,marginTop:3}}>
                            <Tag col={C.gold}>{e(m.sv,1)}</Tag>
                            <Tag col={r>=0?C.sage:C.danger}>{r>=0?"+":""}{e(r,1)}</Tag>
                          </div>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,color:C.ink}}>{e(m.tot,1)}</div>
                        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:C.inkLight,marginTop:2}}>{e(m.stip,1)} →</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
 
      {/* ── NAVBAR ── */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:100}}>
        <div style={{maxWidth:500,margin:"0 auto",padding:"0 16px 10px"}}>
          <div style={{
            background:C.paper, borderRadius:18,
            border:`1px solid ${C.inkLight}30`,
            display:"flex",justifyContent:"space-around",
            padding:"10px 6px 12px",
            boxShadow:"0 -4px 30px rgba(26,22,18,.12)",
          }}>
            {TABS.map(t=>{
              const act=view===t.id;
              return(
                <button key={t.id} onClick={()=>setView(t.id)} className="tab-btn press" style={{
                  background:act?C.terraLight:"transparent",
                  border:"none",display:"flex",flexDirection:"column",alignItems:"center",gap:3,
                  padding:"6px 14px",borderRadius:12,transition:"background .2s",cursor:"pointer",
                }}>
                  <span style={{fontSize:15,lineHeight:1,color:act?C.terra:C.inkLight}}>{t.ico}</span>
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,letterSpacing:".06em",color:act?C.terra:C.inkLight,fontWeight:act?700:400}}>{t.lbl}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* ── TOAST ── */}
      {toast&&(
        <div style={{
          position:"fixed",bottom:88,left:"50%",transform:"translateX(-50%)",
          background:toast.err?C.danger:C.ink,color:"#fff",
          padding:"10px 22px",borderRadius:99,
          fontFamily:"'IBM Plex Mono',monospace",fontSize:12,
          zIndex:200,whiteSpace:"nowrap",
          boxShadow:"0 4px 20px rgba(0,0,0,.25)",
        }}>{toast.msg}</div>
      )}
    </div>
  );
}
