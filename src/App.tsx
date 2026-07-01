import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  sage: "#4A7C6F",
  sageLight: "#DDF0EB",
  blue: "#2B5AA0",
};

/* ── utils ── */
const e = (n: any, short = false) => {
  const v = parseFloat(n) || 0;
  if (short && Math.abs(v) >= 1000) return `€${(v / 1000).toFixed(1)}k`;
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(v);
};

const n = (v: any) => parseFloat(v) || 0;

/* ── storage SAFE (no TS errors) ── */
async function load() {
  try {
    const r = await (window as any).storage?.get?.("fin8", null);
    return r ? JSON.parse(r.value) : null;
  } catch {
    return null;
  }
}

async function save(s: any) {
  try {
    await (window as any).storage?.set?.("fin8", JSON.stringify(s), null);
  } catch {}
}

/* ── UI COMPONENTS ── */
const Card = ({ children, accent }: any) => (
  <div
    style={{
      background: C.paper,
      padding: 16,
      borderRadius: 12,
      borderLeft: accent ? `4px solid ${accent}` : undefined,
      marginBottom: 12,
    }}
  >
    {children}
  </div>
);

const Input = ({ value, onChange }: any) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{
      width: "100%",
      fontSize: 18,
      padding: 6,
      border: "none",
      borderBottom: "1px solid #ccc",
      background: "transparent",
    }}
  />
);

/* ── APP ── */
export default function App() {
  const [st, setSt] = useState<any>({
    stip: "2215",
    spese: [],
    fisse: [],
    hist: [],
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    load().then((d) => {
      if (d) setSt(d);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) save(st);
  }, [st, ready]);

  const upd = (p: any) => setSt((x: any) => ({ ...x, ...p }));

  const stip = n(st.stip);
  const totSpese = (st.spese || []).reduce((a: number, s: any) => a + n(s.costo), 0);
  const totFisse = (st.fisse || []).reduce((a: number, s: any) => a + n(s.costo), 0);
  const disp = stip - totSpese - totFisse;

  const chart = (st.hist || []).slice(-12).map((m: any) => ({
    name: m.m,
    spese: n(m.tot),
    risparmio: Math.max(n(m.stip) - n(m.tot), 0),
  }));

  return (
    <div style={{ padding: 20, background: C.bg, minHeight: "100vh" }}>
      <Card accent={C.terra}>
        <h2>Finanze</h2>
        <div style={{ marginBottom: 10 }}>Disponibile: {e(disp)}</div>

        <Input value={st.stip} onChange={(v: any) => upd({ stip: v })} />
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
          <AreaChart data={chart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area dataKey="spese" stroke={C.blue} fill={C.blue} />
            <Area dataKey="risparmio" stroke={C.sage} fill={C.sage} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
