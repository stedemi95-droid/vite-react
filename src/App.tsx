import { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

/* ── palette (UNCHANGED) ── */
const C = {
  bg: "#F4EFE6",
  paper: "#FAF7F2",
  ink: "#1A1612",
  inkMid: "#6B5E52",
  inkLight: "#B5A99A",
  terra: "#C44B2B",
  terraLight: "#F2E0DA",
  gold: "#B88A3D",
  sage: "#4A7C6F",
  sageLight: "#DDF0EB",
  blue: "#2B5AA0",
  danger: "#B33030",
  dangerLight: "#F5DADA",
};

/* ── utils SAFE ── */
const e = (n: any, s?: any) => {
  const v = parseFloat(n) || 0;
  if (s && Math.abs(v) >= 1000) return `€${(v / 1000).toFixed(1)}k`;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(v);
};

const n = (v: any) => parseFloat(v) || 0;

/* ── STORAGE SAFE (NO TS ERRORS) ── */
async function ld() {
  try {
    const storage = (window as any).storage;
    const r = await storage?.get?.("fin8", null);
    return r ? JSON.parse(r.value) : null;
  } catch {
    return null;
  }
}

async function sv(s: any) {
  try {
    const storage = (window as any).storage;
    await storage?.set?.("fin8", JSON.stringify(s), null);
  } catch {}
}

/* ── CARD ── */
const Card = ({ children, style = {}, accent }: any) => (
  <div
    style={{
      background: C.paper,
      padding: 16,
      borderRadius: 12,
      borderLeft: accent ? `3px solid ${accent}` : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

/* ── INPUT ── */
const NumInput = ({ value, onChange, big = false }: any) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      fontSize: big ? 24 : 14,
      border: "none",
      borderBottom: "1px solid #ccc",
      background: "transparent",
      width: "100%",
    }}
  />
);

/* ── MAIN ── */
export default function App() {
  const [st, setSt] = useState<any>({
    stip: "2215",
    spese: [],
    fisse: [],
    conti: [],
    hist: [],
    budSv: "1200",
    budTot: "1800",
    insIdx: 0,
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    ld().then((d) => {
      if (d) setSt(d);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) sv(st);
  }, [st, ready]);

  const upd = (p: any) => setSt((x: any) => ({ ...x, ...p }));

  const stip = n(st.stip);
  const totV = (st.spese || []).reduce((a: number, s: any) => a + n(s.costo), 0);
  const totF = (st.fisse || []).reduce((a: number, s: any) => a + n(s.costo), 0);
  const disp = stip - totV - totF;

  const areaD = (st.hist || []).slice(-12).map((m: any) => ({
    name: m.m,
    Spese: n(m.tot),
    Risparmio: Math.max(n(m.stip) - n(m.tot), 0),
  }));

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", background: C.bg }}>
      
      <Card accent={C.terra}>
        <h2>Finanze</h2>
        <div>Disponibile: {e(disp)}</div>

        <NumInput
          value={st.stip}
          onChange={(v: any) => upd({ stip: v })}
          big
        />
      </Card>

      <Card>
        <h3>Spese</h3>
        {(st.spese || []).map((s: any) => (
          <div key={s.id}>
            {s.nome} - {e(s.costo)}
          </div>
        ))}
      </Card>

      <Card>
        <h3>Fisse</h3>
        {(st.fisse || []).map((s: any) => (
          <div key={s.id}>
            {s.nome} - {e(s.costo)}
          </div>
        ))}
      </Card>

      <Card>
        <h3>Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={areaD}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area dataKey="Spese" stroke={C.blue} fill={C.blue} />
            <Area dataKey="Risparmio" stroke={C.sage} fill={C.sage} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

    </div>
  );
}
