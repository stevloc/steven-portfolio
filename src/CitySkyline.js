import React, { createContext, useContext } from 'react';

/*
 * Landmark skylines for the hero "Locations" panel.
 *
 * Canvas: 480×170. Everything is tinted with the active city's --accent through
 * depth classes (see redesign.css → .skyline): far (hazy) → mid (city fabric) →
 * landmarks → near (foreground). Water scenes mirror the city into the water.
 * Key landmarks stay between x≈80 and x≈400 so narrow screens only crop scenery.
 */

const SceneId = createContext('sky');

// Deterministic PRNG so the generated city fabric is identical on every render.
const rng = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const quad = (p0, p1, p2, t) => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
];
// Vertical hangers from a quadratic cable down to a deck.
const hangers = (p0, p1, p2, deck, n) => Array.from({ length: n }, (_, i) => {
  const [x, y] = quad(p0, p1, p2, (i + 1) / (n + 1));
  return `M${x.toFixed(1)} ${y.toFixed(1)} V${deck}`;
}).join(' ');

/* ---------- primitives ---------- */

const R = ({ x, y, w, h, c = 'sk-mid', rx }) => <rect className={c} x={x} y={y} width={w} height={h} rx={rx} />;
const P = ({ d, c = 'sk-mid', evenOdd }) => <path className={c} d={d} fillRule={evenOdd ? 'evenodd' : undefined} />;
const S = ({ d, w = 1.2, c = 'sk-cable' }) => <path className={c} d={d} strokeWidth={w} />;
const C = ({ x, y, r, c = 'sk-mid' }) => <circle className={c} cx={x} cy={y} r={r} />;

// Window grid overlay (lit windows) for a rectangular facade.
function Win({ x, y, w, h, dense }) {
  const id = useContext(SceneId);
  if (w < 4 || h < 4) return null;
  return <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-${dense ? 'wd' : 'w'})`} />;
}

// A tower with lit windows.
const Tower = ({ x, y, w, h, c = 'sk-mid', dense, inset = 1.6 }) => (
  <>
    <R x={x} y={y} w={w} h={h} c={c} />
    <Win x={x + inset} y={y + 3} w={w - inset * 2} h={h - 5} dense={dense} />
  </>
);

// Procedurally generated city fabric between two x positions.
function Fabric({ seed, from, to, base, min, max, wMin = 8, wMax = 18, c = 'sk-mid2', windows = false }) {
  const r = rng(seed);
  const out = [];
  let x = from;
  let i = 0;
  while (x < to) {
    const w = wMin + r() * (wMax - wMin);
    const h = min + r() * (max - min);
    const step = r() < 0.3;
    const mast = r() < 0.12;
    out.push(
      <g key={i++}>
        <R x={x} y={base - h} w={w} h={h} c={c} />
        {step && <R x={x + w * 0.2} y={base - h - 4} w={w * 0.6} h={4} c={c} />}
        {mast && <R x={x + w / 2 - 0.4} y={base - h - 10} w={0.8} h={10} c={c} />}
        {windows && <Win x={x + 1.5} y={base - h + 3} w={w - 3} h={h - 5} />}
      </g>,
    );
    x += w + (r() < 0.25 ? 1.5 : 0);
  }
  return <>{out}</>;
}

const Cloud = ({ x, y, s = 1 }) => (
  <g className="sk-cloud" transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={16} ry={4} />
    <ellipse cx={-6} cy={-3} rx={8} ry={4.5} />
    <ellipse cx={5} cy={-4.5} rx={9} ry={5.5} />
  </g>
);

// Fades the bottom of a far layer into atmospheric haze.
function Haze({ y, h }) {
  const id = useContext(SceneId);
  return <rect x={0} y={y} width={480} height={h} fill={`url(#${id}-haze)`} />;
}

// Water with a mirrored reflection of everything inside #<id>-city.
function Water({ y, boats }) {
  const id = useContext(SceneId);
  return (
    <g>
      <clipPath id={`${id}-below`}><rect x={0} y={y} width={480} height={170 - y} /></clipPath>
      <rect className="sk-water" x={0} y={y} width={480} height={170 - y} />
      <g clipPath={`url(#${id}-below)`}>
        <use href={`#${id}-city`} className="sk-reflect" transform={`matrix(1 0 0 -1 0 ${2 * y})`} />
      </g>
      <rect x={0} y={y} width={480} height={170 - y} fill={`url(#${id}-fade)`} />
      <S c="sk-ripple" w={1} d={`M30 ${y + 7}h40 M120 ${y + 13}h26 M196 ${y + 6}h52 M290 ${y + 16}h32 M372 ${y + 9}h44 M60 ${y + 22}h30 M240 ${y + 26}h40`} />
      {boats}
    </g>
  );
}

function Fir({ x, b, h, w }) {
  const tiers = [0, 1, 2, 3].map((i) => {
    const apex = b - h + i * h * 0.19;
    const base = b - h + h * 0.34 + i * h * 0.2;
    const half = w * (0.26 + 0.16 * i);
    return `M${x} ${apex} L${x + half} ${base} L${x - half} ${base} Z`;
  }).join(' ');
  return (
    <>
      <P c="sk-near" d={tiers} />
      <R c="sk-near" x={x - 0.8} y={b - h * 0.2} w={1.6} h={h * 0.2} />
    </>
  );
}

/* ---------- scenes ---------- */

function NewYork() {
  const id = useContext(SceneId);
  const H = 136;
  const deck = 124;
  return (
    <>
      <Cloud x={70} y={34} s={1.1} /><Cloud x={420} y={26} s={0.9} />
      <g id={`${id}-city`}>
        <Fabric seed={11} from={-6} to={486} base={H} min={14} max={42} wMin={9} wMax={20} c="sk-far" />
        <Haze y={96} h={40} />
        <Fabric seed={23} from={84} to={480} base={H} min={12} max={40} wMin={8} wMax={16} windows />
        {/* Empire State Building */}
        <Tower x={140} y={114} w={50} h={22} />
        <Tower x={150} y={64} w={30} h={50} />
        <R x={155} y={56} w={20} h={8} /><R x={159} y={50} w={12} h={6} />
        <R x={161.5} y={44} w={7} h={6} /><P d="M162.5 44 H167.5 L166 36 H164 Z" /><R x={164.6} y={18} w={0.8} h={18} />
        {/* Chrysler Building */}
        <Tower x={233} y={74} w={24} h={62} />
        <R x={236} y={66} w={18} h={8} />
        <P d="M236 66 Q245 49 254 66 Z M238.6 58 Q245 43 251.4 58 Z M241 50 Q245 37 249 50 Z" />
        <P c="sk-window" d="M239.2 64 l1.1 -3 l1.1 3 Z M243.9 64 l1.1 -3.4 l1.1 3.4 Z M248.6 64 l1.1 -3 l1.1 3 Z M241.4 56 l1 -2.6 l1 2.6 Z M246.6 56 l1 -2.6 l1 2.6 Z M244 48.5 l1 -2.4 l1 2.4 Z" />
        <P d="M244.2 41 H245.8 L245 24 Z" />
        {/* 432 Park Avenue */}
        <Tower x={282} y={40} w={10} h={96} dense inset={1.2} />
        {/* One World Trade Center */}
        <R x={316} y={118} w={28} h={18} />
        <P d="M317 118 H343 L337 46 H323 Z" />
        <S c="sk-detail" w={0.7} d="M317 118 L337 46 M343 118 L323 46 M330 118 V46" />
        <R x={322} y={43} w={16} h={3} /><R x={329.6} y={4} w={0.8} h={39} />
        {/* Brooklyn Bridge */}
        <P c="sk-near" evenOdd d="M52 80 H72 V128 H52 Z M55 96 Q57.5 88 60 96 V112 H55 Z M64 96 Q66.5 88 69 96 V112 H64 Z" />
        <R c="sk-near" x={50} y={77} w={24} h={4} />
        <R c="sk-near" x={0} y={deck} w={132} h={3} />
        <S w={1.4} d="M-12 112 Q24 126 52 82 M72 82 Q104 118 132 124" />
        <S c="sk-cable-soft" w={0.9} d="M-12 115 Q26 127 52 85 M72 85 Q106 119 132 125.5" />
        <S c="sk-cable-soft" w={0.5} d={`${hangers([72, 82], [104, 118], [132, 124], deck, 9)} ${hangers([-12, 112], [24, 126], [52, 82], deck, 5)}`} />
        <S c="sk-cable-soft" w={0.5} d="M72 84 L88 124 M72 84 L102 124 M72 84 L118 124 M52 84 L36 124 M52 84 L22 124" />
        {/* Rooftop water tanks */}
        {[[142, 114], [183, 114]].map(([x, y]) => (
          <g key={x}>
            <S c="sk-cable" w={0.6} d={`M${x + 0.6} ${y} V${y - 3} M${x + 4.4} ${y} V${y - 3}`} />
            <R x={x} y={y - 8} w={5} h={5} /><P d={`M${x - 0.5} ${y - 8} L${x + 2.5} ${y - 11} L${x + 5.5} ${y - 8} Z`} />
          </g>
        ))}
        {/* Statue of Liberty on Liberty Island */}
        <g transform="translate(-28 0)">
        <ellipse className="sk-near" cx={420} cy={135} rx={17} ry={2.5} />
        <P c="sk-near" d="M407 135 L410.5 128 H429.5 L433 135 Z" />
        <R c="sk-near" x={413.5} y={113} w={13} h={1.6} /><R c="sk-near" x={414.5} y={114} w={11} h={14} />
        <P c="sk-near" d="M417.4 113 L418.6 102 Q420 99.4 421.6 102 L422.8 113 Z" />
        <C c="sk-near" x={420.2} y={99.2} r={1.6} />
        <S w={0.5} d="M418.6 98.6 l-1.3 -1.2 M420.2 97.8 v-1.7 M421.8 98.6 l1.3 -1.2" />
        <S w={1.4} d="M421.4 102.4 L423.6 91.4" /><R c="sk-near" x={422.6} y={89.8} w={2} h={1.6} /><C c="sk-near" x={423.6} y={88.4} r={1.1} />
        <R c="sk-near" x={416.4} y={103.6} w={1.6} h={3.2} />
        </g>
      </g>
      <Water y={H} boats={<P c="sk-near" d="M226 150 H260 L254 155 H232 Z M236 146 H248 V150 H236 Z" />} />
    </>
  );
}

function Shanghai() {
  const id = useContext(SceneId);
  const B = 128;
  const jinMao = [26, 16, 12, 9, 7, 6, 5, 4];
  let jy = B;
  return (
    <>
      <Cloud x={110} y={28} /><Cloud x={440} y={40} s={0.8} />
      <g id={`${id}-city`}>
        <Fabric seed={7} from={120} to={486} base={B} min={16} max={48} wMin={9} wMax={20} c="sk-far" />
        <Haze y={84} h={44} />
        <Fabric seed={31} from={130} to={480} base={B} min={10} max={36} wMin={8} wMax={15} windows />
        {/* Oriental Pearl Tower */}
        <R x={156} y={124} w={32} h={4} />
        <P d="M156 128 H161 L170 100 L168 97 Z M188 128 H183 L174 100 L176 97 Z" />
        <R x={168.6} y={56} w={1.6} h={72} /><R x={171.2} y={56} w={1.6} h={72} /><R x={173.8} y={56} w={1.6} h={72} />
        <C x={172} y={98} r={13} />
        <C x={172} y={82} r={2.4} /><C x={172} y={76} r={2.4} /><C x={172} y={70} r={2.4} />
        <C x={172} y={58} r={8.5} />
        <R x={170.8} y={36} w={2.4} h={22} /><C x={172} y={36} r={3.2} /><R x={171.6} y={6} w={0.8} h={30} />
        <S c="sk-detail" w={0.7} d="M159.5 98 H184.5 M161.5 91 H182.5 M161.5 105 H182.5 M164 58 H180 M165 54 H179" />
        {/* Jin Mao Tower */}
        {jinMao.map((th, i) => {
          const w = 22 - i * 2.2;
          jy -= th;
          return <Tower key={i} x={300 - w / 2} y={jy} w={w} h={th} inset={1.2} />;
        })}
        <P d={`M298.6 ${jy} H301.4 L300 ${jy - 22} Z`} />
        {/* Shanghai Tower */}
        <P d="M331 128 C330 92 334 54 340 20 L353 14 C357 52 360 92 358 128 Z" />
        <S c="sk-detail" w={0.7} d="M336 126 C337 94 340 60 343 24 M346 127 C347 96 349 62 350 20" />
        {/* Shanghai World Financial Center */}
        <P evenOdd d="M368 128 L373 30 H391 L396 128 Z M375.5 33 H388.5 L387 47 H377 Z" />
        <S c="sk-detail" w={0.6} d="M376 128 L379 48 M382 128 V48 M388 128 L385 48" />
      </g>
      <Water y={B} boats={<P c="sk-near" d="M250 146 H290 L284 151 H256 Z M260 141 H280 V146 H260 Z M266 137 H274 V141 H266 Z" />} />
      {/* The Bund (near bank): Customs House clock tower and the HSBC dome */}
      <P c="sk-near-soft" d="M0 152 H136 Q146 152 152 160 V170 H0 Z" />
      <Tower c="sk-near" x={18} y={126} w={62} h={26} />
      <R c="sk-near" x={41} y={100} w={16} h={26} /><C c="sk-light" x={49} y={108} r={4.2} />
      <R c="sk-near" x={43} y={94} w={12} h={6} /><P c="sk-near" d="M43 94 H55 L51 86 H47 Z" /><R c="sk-near" x={48.6} y={76} w={0.8} h={10} />
      <Tower c="sk-near" x={84} y={130} w={46} h={22} />
      <R c="sk-near" x={97} y={124} w={20} h={6} /><P c="sk-near" d="M97 124 A10 9 0 0 1 117 124 Z" /><R c="sk-near" x={105.5} y={110} w={3} h={6} />
    </>
  );
}

function Austin() {
  const id = useContext(SceneId);
  const H = 136;
  const archHoles = Array.from({ length: 13 }, (_, i) => `M${i * 38 + 3} 136 Q${i * 38 + 19} 126 ${i * 38 + 35} 136 Z`).join(' ');
  return (
    <>
      <C c="sk-glow" x={404} y={64} r={34} /><C c="sk-light" x={404} y={64} r={19} />
      <S c="sk-cable-soft" w={0.9} d="M128 46 q2.4 -2.4 4.8 0 q2.4 -2.4 4.8 0 M146 38 q2 -2 4 0 q2 -2 4 0 M162 50 q2 -2 4 0 q2 -2 4 0 M178 34 q1.8 -1.8 3.6 0 q1.8 -1.8 3.6 0 M196 44 q2 -2 4 0 q2 -2 4 0 M114 56 q1.6 -1.6 3.2 0 q1.6 -1.6 3.2 0" />
      <g id={`${id}-city`}>
        <Fabric seed={5} from={130} to={486} base={H} min={14} max={44} wMin={10} wMax={22} c="sk-far" />
        <Haze y={94} h={42} />
        <Fabric seed={19} from={136} to={470} base={H} min={10} max={34} wMin={9} wMax={16} windows />
        {/* UT Tower (Main Building) */}
        <g transform="translate(40 0)">
        <Tower c="sk-mid2" x={0} y={114} w={34} h={22} />
        <Tower c="sk-mid2" x={11} y={58} w={12} h={56} inset={1.4} />
        <C c="sk-light" x={17} y={66} r={2.3} />
        <R c="sk-mid2" x={9.5} y={50} w={15} h={8} />
        <S c="sk-detail" w={0.6} d="M11.5 51 V57 M14.5 51 V57 M17.5 51 V57 M20.5 51 V57 M23 51 V57" />
        <R c="sk-mid2" x={13} y={45} w={8} h={5} /><P c="sk-mid2" d="M13 45 Q17 38 21 45 Z" /><R c="sk-mid2" x={16.6} y={33} w={0.8} h={7} />
        </g>
        {/* Moonlight tower */}
        <S w={0.8} d="M192 136 L195.4 78 M200 136 L196.6 78 M192.6 122 H199.4 M193.4 108 H198.6 M194.3 93 H197.7 M192.6 122 L198.6 108 M199.4 122 L193.4 108 M193.4 108 L197.7 93 M198.6 108 L194.3 93 M194.3 93 L196.6 80 M197.7 93 L195.4 80" />
        <R x={192.6} y={74.4} w={6.8} h={1.6} /><R x={195.6} y={64} w={0.8} h={10.4} />
        <C c="sk-near" x={193.4} y={73.6} r={1} /><C c="sk-near" x={196} y={73} r={1} /><C c="sk-near" x={198.6} y={73.6} r={1} />
        {/* Texas State Capitol */}
        {/* Wings with end pavilions */}
        <Tower x={36} y={119} w={88} h={17} />
        <R x={36} y={114} w={14} h={22} /><P d="M35 114 L43 110 L51 114 Z" />
        <R x={110} y={114} w={14} h={22} /><P d="M109 114 L117 110 L125 114 Z" />
        {/* Central block, attic and colonnaded drum */}
        <Tower x={62} y={108} w={36} h={28} inset={2} />
        <R x={66} y={97} w={28} h={11} />
        <R x={69} y={84} w={22} h={13} />
        <S c="sk-detail" w={0.6} d="M71.5 85.5 V96 M74.5 85.5 V96 M77.5 85.5 V96 M80 85.5 V96 M82.5 85.5 V96 M85.5 85.5 V96 M88.5 85.5 V96" />
        <R x={67.5} y={82} w={25} h={2.2} />
        {/* Dome: taller than wide, slightly pointed, with ribs */}
        <P d="M70 82 C70 66 75.5 55 80 52.5 C84.5 55 90 66 90 82 Z" />
        <S c="sk-detail" w={0.6} d="M75 82 C75 69 77.4 60 80 55 M85 82 C85 69 82.6 60 80 55 M80 82 V55" />
        {/* Portico pediment */}
        <P d="M59.5 108 L80 99 L100.5 108 Z" />
        {/* Lantern and the Goddess of Liberty */}
        <R x={77.6} y={45} w={4.8} h={8} /><R x={77} y={44} w={6} h={1.2} /><P d="M77.6 44 Q80 39.5 82.4 44 Z" />
        <R x={79.5} y={34.5} w={1} h={5.5} /><C x={80} y={33.6} r={1} /><S w={0.6} d="M80.4 36 L82.2 32.6" />
        {/* Frost Bank Tower */}
        <Tower x={244} y={64} w={22} h={72} />
        <P d="M244 64 L248 56 L252 52 L255 28 L258 52 L262 56 L266 64 Z" />
        <S c="sk-detail" w={0.6} d="M252 60 L255 34 L258 60 M249 62 L252 54 M261 62 L258 54" />
        {/* The Independent ("Jenga" tower) */}
        {[0, 2, -2, 1, -1, 2, 0, -2].map((dx, i) => <Tower key={i} x={290 + dx} y={136 - 12 * (i + 1)} w={18} h={12} inset={1.2} />)}
        {/* The Austonian */}
        <Tower x={322} y={34} w={14} h={102} dense inset={1.4} /><R x={325} y={28} w={8} h={6} />
        {/* 360 Condominiums */}
        <P d="M352 136 V68 Q360 58 370 66 V136 Z" /><Win x={354} y={70} w={14} h={62} />
        {/* Congress Avenue Bridge */}
        <P c="sk-near" evenOdd d={`M0 124 H480 V136 H0 Z ${archHoles}`} />
        <S c="sk-detail" w={0.6} d="M0 125.6 H480" />
      </g>
      <Water y={H} />
      {/* Kayakers on Lady Bird Lake */}
      <P c="sk-near" d="M112 154 h18 l-2.4 1.8 h-13.2 Z M206 162 h16 l-2 1.6 h-12 Z" />
      <C c="sk-near" x={121} y={151.6} r={1.5} /><C c="sk-near" x={214} y={159.8} r={1.3} />
      <S w={0.7} d="M114 149 L128 156 M208 157.4 L220 163.6" />
    </>
  );
}

function Hanoi() {
  const id = useContext(SceneId);
  const H = 134;
  const houses = [[100, 10, 30], [110, 9, 38], [119, 11, 26], [130, 9, 34], [139, 10, 40], [149, 9, 28], [158, 11, 36], [169, 10, 31], [179, 9, 42], [188, 10, 27], [198, 11, 33], [209, 9, 38], [218, 10, 29], [228, 11, 35]];
  return (
    <>
      <Cloud x={160} y={30} s={1.2} /><Cloud x={380} y={22} s={0.9} />
      <g id={`${id}-city`}>
        {/* Keangnam twin towers and Lotte Center in the haze */}
        <R c="sk-far" x={378} y={67} w={9} h={67} /><R c="sk-far" x={390} y={77} w={9} h={57} />
        <P c="sk-far" d="M420 134 V59 L426 55 L432 59 V134 Z M424 55 L426 47 L428 55 Z" />
        <Fabric seed={41} from={330} to={486} base={H} min={10} max={30} wMin={8} wMax={16} c="sk-far" />
        <Haze y={96} h={38} />
        {/* Tube houses with balconies */}
        {houses.map(([x, w, h]) => (
          <g key={x}>
            <R c="sk-mid2" x={x} y={H - h} w={w} h={h} />
            <P c="sk-mid2" d={`M${x - 0.5} ${H - h} L${x + w / 2} ${H - h - 4} L${x + w + 0.5} ${H - h} Z`} />
            <S c="sk-detail" w={0.6} d={`M${x + 1} ${H - h + 9} H${x + w - 1} M${x + 1} ${H - h + 18} H${x + w - 1}`} />
            <Win x={x + 1.5} y={H - h + 2} w={w - 3} h={h - 4} />
          </g>
        ))}
        {/* Banyan canopies */}
        <g className="sk-mid-soft">
          {[[18, 116, 15], [36, 110, 18], [58, 118, 13], [272, 112, 15], [452, 114, 16], [470, 108, 14]].map(([x, y, r]) => (
            <g key={x}><ellipse cx={x} cy={y} rx={r} ry={r * 0.75} /><rect x={x - 0.8} y={y} width={1.6} height={134 - y} /></g>
          ))}
        </g>
        {/* St Joseph's Cathedral */}
        <P c="sk-mid2" d="M232 134 V98 H237 V86 L240 80 L243 86 V98 H249 V86 L252 80 L255 86 V98 H260 V134 Z" />
        {/* Ngoc Son Temple gate and The Huc Bridge */}
        <R c="sk-near" x={64} y={116} w={30} h={18} />
        <P c="sk-near" d="M58 118 Q62 116 65 112 H93 Q96 116 100 118 Z M66 112 Q69 110 71 106 H87 Q89 110 92 112 Z" />
        <R c="sk-near" x={78.4} y={100} w={1.2} h={6} />
        <S c="sk-bridge" w={4} d="M94 134 Q150 104 210 134" />
        <S c="sk-bridge" w={1.2} d="M98 126 Q150 98 206 126" />
        <S c="sk-bridge" w={0.8} d="M110 123 V129 M122 117 V124 M134 113 V120 M146 111 V118 M158 111 V118 M170 113 V120 M182 116 V123 M194 121 V128" />
        {/* Turtle Tower on its islet */}
        <C c="sk-near" x={270} y={128} r={6} /><C c="sk-near" x={331} y={129} r={5} />
        <P c="sk-near" evenOdd d="M280 133 V116 H320 V133 Z M287 133 V125 Q290 120 293 125 V133 Z M296.5 133 V124 Q300 118 303.5 124 V133 Z M307 133 V125 Q310 120 313 125 V133 Z" />
        <P c="sk-near" evenOdd d="M286 116 V103 H314 V116 Z M297 114 V108 Q300 104 303 108 V114 Z" />
        <P c="sk-near" evenOdd d="M291 103 V93 H309 V103 Z M300 95.4 A2.6 2.6 0 1 0 300 100.6 A2.6 2.6 0 1 0 300 95.4 Z" />
        <P c="sk-near" d="M282 117 L286 114 H314 L318 117 Z M284 104 L288 101 H312 L316 104 Z" />
        <P c="sk-near" d="M284 94 Q290 92 293 87 H307 Q310 92 316 94 Z" /><R c="sk-near" x={299.4} y={80} w={1.2} h={7} /><C c="sk-near" x={300} y={80} r={1.4} />
        <ellipse className="sk-near" cx={300} cy={134} rx={42} ry={3.5} />
      </g>
      <Water y={H} />
      {/* Willow at the lake's edge */}
      <ellipse className="sk-mid-soft" cx={24} cy={132} rx={22} ry={12} />
      <S c="sk-trunk" w={2.4} d="M30 170 Q32 146 24 124" />
      <S c="sk-cable" w={0.8} d="M24 124 Q12 132 10 156 M24 124 Q18 136 18 160 M24 124 Q26 138 24 158 M24 124 Q34 134 36 154 M24 124 Q42 130 46 148 M24 124 Q6 128 2 146" />
    </>
  );
}

function Seattle() {
  const id = useContext(SceneId);
  const H = 136;
  const wheel = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [210 + Math.cos(a) * 16, 112 + Math.sin(a) * 16];
  });
  return (
    <>
      <Cloud x={60} y={30} /><Cloud x={420} y={24} s={1.1} />
      <g id={`${id}-city`}>
        {/* Mount Rainier */}
        <P c="sk-far" d="M110 136 L214 74 L238 60 L254 56 L268 62 L286 58 L306 72 L420 136 Z" />
        <P c="sk-light" d="M226 68 L238 60 L254 56 L268 62 L286 58 L300 68 L292 72 L284 66 L276 74 L266 68 L256 78 L248 70 L238 76 L232 72 Z" />
        <Haze y={92} h={44} />
        <Fabric seed={13} from={240} to={440} base={H} min={12} max={40} wMin={9} wMax={18} c="sk-far" />
        <Fabric seed={29} from={250} to={430} base={H} min={10} max={36} wMin={8} wMax={15} windows />
        {/* Columbia Center */}
        <P d="M322 136 V84 L326 80 V66 L330 62 V48 L334 45 H346 L350 48 V62 L354 66 V80 L358 84 V136 Z" />
        <Win x={324} y={86} w={32} h={48} /><Win x={328} y={68} w={24} h={11} /><Win x={332} y={50} w={16} h={11} />
        {/* Two Union Square */}
        <P d="M370 136 V66 Q378 58 386 66 V136 Z" /><Win x={372} y={70} w={12} h={62} />
        {/* Space Needle */}
        <P d="M106 136 Q118 116 118 106 Q118 92 113 79 H116.5 Q120.5 94 120 106 Q120 118 110 136 Z M134 136 Q122 116 122 106 Q122 92 127 79 H123.5 Q119.5 94 120 106 Q120 118 130 136 Z" />
        <R x={114} y={104} w={12} h={2} />
        <R x={118.6} y={76} w={2.8} h={6} />
        <P d="M100 74 Q120 70 140 74 L136 78.5 Q120 76.5 104 78.5 Z" />
        <P d="M106 74 H134 L128 66 H112 Z" /><R x={116} y={62} w={8} h={4} /><R x={119.6} y={34} w={0.8} h={28} />
        {/* Seattle Great Wheel */}
        <circle className="sk-ring" cx={210} cy={112} r={16} strokeWidth={1.4} />
        <S c="sk-cable-soft" w={0.5} d={wheel.map(([x, y]) => `M210 112 L${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')} />
        {wheel.map(([x, y], i) => <C key={i} x={x} y={y} r={1.3} />)}
        <P d="M204 136 L210 112 L216 136 H213 L210 120 L207 136 Z" />
        <R c="sk-near" x={186} y={133} w={56} h={3} />
      </g>
      <Water y={H} boats={<P c="sk-near" d="M236 152 H290 L284 158 H242 Z M244 146 H282 V152 H244 Z M252 141 H274 V146 H252 Z M262 136 H266 V141 H262 Z" />} />
      {[[6, 46, 15], [20, 58, 18], [36, 50, 16], [52, 40, 13], [66, 30, 11], [438, 34, 12], [452, 50, 16], [468, 58, 18]].map(([x, h, w]) => <Fir key={x} x={x} b={146} h={h} w={w} />)}
      <P c="sk-near" d="M-4 170 V146 Q30 141 64 144 Q78 146 86 152 Q70 160 60 170 Z M484 170 V145 Q456 141 434 145 Q424 150 422 158 Q430 166 436 170 Z" />
    </>
  );
}

function Pittsburgh() {
  const id = useContext(SceneId);
  const H = 134;
  const deck = 127;
  return (
    <>
      <Cloud x={300} y={24} /><Cloud x={110} y={34} s={0.9} />
      <g id={`${id}-city`}>
        {/* Mount Washington with houses along the ridge and the Duquesne Incline */}
        <P c="sk-mid-soft" d="M-4 134 V84 Q50 70 110 80 Q150 88 190 134 Z" />
        {[[6, 83], [16, 80], [27, 78], [40, 76], [54, 75], [66, 75], [80, 76], [94, 78], [106, 81]].map(([x, y]) => (
          <g key={x}>
            <P c="sk-mid2" d={`M${x} ${y} V${y - 5} L${x + 3.5} ${y - 8} L${x + 7} ${y - 5} V${y} Z`} />
            <rect className="sk-window" x={x + 2.4} y={y - 4} width={2.2} height={2} />
          </g>
        ))}
        <S w={2} d="M34 134 L84 80" />
        <P c="sk-near" d="M47 118 H57 V112 L52 109 H47 Z" />
        <P c="sk-near" d="M70 96 H80 V90 L75 87 H70 Z" />
        <Fabric seed={17} from={200} to={486} base={H} min={14} max={44} wMin={10} wMax={20} c="sk-far" />
        <Haze y={92} h={42} />
        <Fabric seed={37} from={206} to={480} base={H} min={10} max={34} wMin={8} wMax={15} windows />
        {/* Cathedral of Learning (Oakland) in the distance */}
        <P c="sk-far" d="M432 134 V96 L434 90 V82 L436.5 76 L440 66 L443.5 76 L446 82 V90 L448 96 V134 Z" />
        <S c="sk-detail" w={0.5} d="M435 134 V94 M440 134 V78 M445 134 V94" />
        {/* Gulf Tower with its stepped pyramid */}
        <Tower x={214} y={60} w={18} h={74} />
        <R x={216} y={54} w={14} h={6} /><R x={218} y={49} w={10} h={5} /><R x={220} y={45} w={6} h={4} /><R x={222.6} y={36} w={0.8} h={9} />
        {/* BNY Mellon Center */}
        <Tower x={246} y={58} w={22} h={76} /><P d="M246 58 L250 52 H264 L268 58 Z" />
        {/* U.S. Steel Tower */}
        <P d="M282 134 V42 L287 37 H303 L308 42 V134 Z" />
        <S c="sk-detail" w={0.8} d="M286 134 V41 M295 134 V37 M304 134 V41" />
        {/* PPG Place */}
        <P d="M330 134 V74 L333 66 L336 74 V70 L339 60 L342 70 V66 L345 52 L348 66 V70 L351 60 L354 70 V74 L357 66 L360 74 V134 Z" />
        <S c="sk-detail" w={0.5} d="M334 134 V76 M338 134 V72 M342 134 V70 M345 134 V68 M348 134 V70 M352 134 V72 M356 134 V76" />
        <P d="M318 134 V98 L321 92 L324 98 L327 92 L330 98 V134 Z M360 134 V98 L363 92 L366 98 L369 92 L372 98 V134 Z" />
        {/* Fifth Avenue Place */}
        <Tower x={378} y={74} w={16} h={60} /><P d="M380 74 L386 46 L392 74 Z" />
        {/* Point State Park fountain */}
        <P c="sk-mid-soft" d="M150 134 L198 127 L214 134 Z" />
        <P c="sk-light" d="M196 130 Q193 116 196 104 Q199 116 196 130 Z" />
        <S c="sk-ripple" w={0.7} d="M196 107 Q191 112 190 120 M196 107 Q201 112 202 120" />
        {/* Fort Pitt Bridge: double-deck bowstring arch from the tunnel under Mount Washington */}
        <R c="sk-near" x={88} y={119} w={84} h={2} /><R c="sk-near" x={88} y={124} w={84} h={2} />
        <S w={1.6} d="M92 119 Q130 90 168 119" />
        <S c="sk-cable-soft" w={0.6} d={`${hangers([92, 119], [130, 90], [168, 119], 126, 7)}`} />
        <R c="sk-near" x={91} y={126} w={2} h={8} /><R c="sk-near" x={167} y={126} w={2} h={8} />
        {/* Roberto Clemente-style self-anchored suspension bridge (one of the yellow "Sisters") */}
        <R c="sk-mid-soft" x={196} y={121} w={284} h={2} />
        <R c="sk-near" x={180} y={deck} w={300} h={3} />
        <R c="sk-near" x={236} y={112} w={3} h={15} /><R c="sk-near" x={374} y={112} w={3} h={15} />
        <S w={1.6} d="M180 127 Q214 124 237 112 M238 112 Q306 132 375 112 M376 112 Q430 124 480 127" />
        <S c="sk-cable-soft" w={0.6} d={`${hangers([238, 112], [306, 132], [375, 112], deck, 11)} ${hangers([180, 127], [214, 124], [237, 112], deck, 3)} ${hangers([376, 112], [430, 124], [480, 127], deck, 3)}`} />
      </g>
      <Water y={H} boats={(
        <>
          <P c="sk-near" d="M250 148 H300 L294 154 H256 Z M256 143 H294 V148 H256 Z M261 139 H289 V143 H261 Z M274 134 H276 V139 H274 Z" />
          <R c="sk-light" x={258} y={144.6} w={34} h={1.2} /><R c="sk-light" x={263} y={140.4} w={24} h={1} />
        </>
      )} />
    </>
  );
}

function SanJose() {
  const id = useContext(SceneId);
  return (
    <>
      <Cloud x={120} y={34} s={1.3} /><Cloud x={360} y={26} s={1} />
      {/* Cordillera Central: Barva (left) and Irazú's broad massif (right), clouds clinging to the ridges */}
      <P c="sk-far" d="M-4 112 Q30 92 66 82 Q96 74 128 86 Q160 98 196 96 Q236 94 270 76 Q300 60 336 56 Q372 54 404 70 Q440 86 484 92 V170 H-4 Z" />
      <g className="sk-cloud-soft">
        <ellipse cx={100} cy={84} rx={36} ry={5} /><ellipse cx={330} cy={64} rx={44} ry={5} /><ellipse cx={420} cy={80} rx={30} ry={4} />
      </g>
      {/* Escazú hills, the nearer ridge */}
      <P c="sk-mid-soft" d="M-4 126 Q40 108 90 114 Q140 120 180 112 Q230 102 280 112 Q340 124 400 112 Q440 104 484 112 V170 H-4 Z" />
      <g className="sk-light-soft">
        {[[20, 121], [34, 117], [48, 118], [62, 115], [118, 119], [132, 118], [150, 116], [212, 108], [226, 107], [240, 106], [300, 116], [318, 119], [346, 121], [420, 110], [436, 108], [452, 109], [466, 111]].map(([x, y]) => <rect key={x} x={x} y={y} width={1.8} height={1.3} />)}
      </g>
      <S c="sk-cable-soft" w={0.8} d="M196 42 q2 -2 4 0 q2 -2 4 0 M212 35 q1.6 -1.6 3.2 0 q1.6 -1.6 3.2 0 M224 46 q1.8 -1.8 3.6 0 q1.8 -1.8 3.6 0" />
      {/* Low-rise downtown sprawl with a few mid-rise towers */}
      <Fabric seed={53} from={-4} to={486} base={134} min={5} max={15} wMin={7} wMax={14} windows />
      <Tower x={262} y={74} w={18} h={60} />{/* Banco Central */}
      <Tower x={286} y={90} w={12} h={44} dense inset={1.2} />
      <g transform="translate(8 0)">
      {/* Estadio Nacional in La Sabana: oval bowl under two sweeping roof shells */}
      <P d="M190 134 V124 Q217 119 244 124 V134 Z" />
      <Win x={193} y={126} w={48} h={7} dense />
      <P c="sk-near-soft" d="M185 125 Q195 101 217 107 Q239 101 249 125 H243.5 Q234 110 217 113.5 Q200 110 190.5 125 Z" />
      <S c="sk-detail" w={0.5} d="M195 117 L198.5 124 M203 110.5 L205.5 123 M211 108 L212.5 122 M223 108 L221.5 122 M231 110.5 L228.5 123 M239 117 L235.5 124" />
      </g>
      <Tower x={372} y={92} w={12} h={42} dense inset={1.2} />
      <Tower x={412} y={102} w={10} h={32} dense inset={1.2} />
      {/* Plaza */}
      <R c="sk-mid-soft" x={-4} y={140} w={488} h={30} />
      <rect x={-4} y={140} width={488} height={30} fill={`url(#${id}-fade)`} />
      <S c="sk-detail" w={0.6} d="M0 150 H480 M0 160 H480" />
      {/* Catedral Metropolitana */}
      <R c="sk-near" x={146} y={114} w={44} h={26} />
      <P c="sk-near" d="M143 114 L168 100 L193 114 Z" />
      <R c="sk-near" x={161} y={96} w={14} h={6} /><P c="sk-near" d="M159 96 A9 8 0 0 1 177 96 Z" /><R c="sk-near" x={167.4} y={78} w={1.2} h={10} /><R c="sk-near" x={164.5} y={81} w={7} h={1.2} />
      <S c="sk-detail" w={0.8} d="M151 117 V140 M157 117 V140 M163 117 V140 M173 117 V140 M179 117 V140 M185 117 V140" />
      <P c="sk-window" d="M165.5 140 V130 Q168 126 170.5 130 V140 Z" />
      {/* Teatro Nacional */}
      <R c="sk-near" x={300} y={116} w={64} h={24} />
      <R c="sk-near" x={316} y={104} w={32} h={12} />
      <P c="sk-near" d="M314 105 L332 96 L350 105 Z" />
      <R c="sk-near" x={298} y={114} w={68} h={2.5} />
      <P c="sk-window" d="M309 140 V130 Q312 125 315 130 V140 Z M328.5 140 V128 Q332 122 335.5 128 V140 Z M349 140 V130 Q352 125 355 130 V140 Z" />
      <S c="sk-detail" w={0.8} d="M304 118 V140 M320 118 V140 M325 118 V140 M339 118 V140 M344 118 V140 M360 118 V140" />
      <R c="sk-near" x={302} y={109} w={2} h={5} /><C c="sk-near" x={303} y={108} r={1.3} />
      <R c="sk-near" x={360} y={109} w={2} h={5} /><C c="sk-near" x={361} y={108} r={1.3} />
      <R c="sk-near" x={331} y={90} w={2} h={6} /><C c="sk-near" x={332} y={89} r={1.4} />
      {/* Guanacaste tree, Costa Rica's national tree */}
      <S c="sk-trunk" w={3.2} d="M70 170 Q68 150 72 132 M72 140 Q60 134 52 128 M72 138 Q86 132 94 126" />
      <g className="sk-near">
        <ellipse cx={72} cy={124} rx={36} ry={7} /><ellipse cx={52} cy={127} rx={18} ry={5.5} /><ellipse cx={94} cy={126} rx={20} ry={5.5} />
        <ellipse cx={70} cy={119} rx={22} ry={6} />
      </g>
      {/* Costa Rican flag */}
      <g transform="translate(10 0)">
      <R c="sk-near" x={383.4} y={98} w={1.2} h={42} />
      <R c="sk-near" x={384.6} y={98} w={18} h={11} />
      <R c="sk-light" x={384.6} y={99.8} w={18} h={1.8} /><R c="sk-mid" x={384.6} y={101.6} w={18} h={3.8} /><R c="sk-light" x={384.6} y={105.4} w={18} h={1.8} />
      </g>
      {/* Carreta: the hand-painted oxcart */}
      <P c="sk-near" d="M112 146 L114 137 H150 L148 146 Z" />
      <S c="sk-detail" w={0.6} d="M116 140 H146 M115.4 143 H147" />
      <S c="sk-trunk" w={1.6} d="M148 145 L176 150 M174 145.5 V154" />
      <circle className="sk-ring" cx={126} cy={150} r={11} strokeWidth={1.6} />
      <circle className="sk-ring" cx={126} cy={150} r={5.5} strokeWidth={0.8} />
      <S c="sk-cable" w={0.6} d="M126 139 V161 M115 150 H137 M118.2 142.2 L133.8 157.8 M133.8 142.2 L118.2 157.8" />
      <C c="sk-near" x={126} y={150} r={1.8} />
      {/* Street lamps */}
      <S w={1} d="M226 152 V134 M236 152 V134 M400 152 V134 M412 152 V134" />
      <C c="sk-near" x={226} y={134} r={1.6} /><C c="sk-near" x={236} y={134} r={1.6} /><C c="sk-near" x={400} y={134} r={1.6} /><C c="sk-near" x={412} y={134} r={1.6} />
    </>
  );
}

const scenes = { nyc: NewYork, shanghai: Shanghai, austin: Austin, hanoi: Hanoi, seattle: Seattle, pittsburgh: Pittsburgh, sanjose: SanJose };

export default function CitySkyline({ city }) {
  const Scene = scenes[city] || NewYork;
  const id = `sky-${city}`;
  return (
    <SceneId.Provider value={id}>
      <svg key={city} className="skyline" viewBox="0 0 480 170" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
        <defs>
          <pattern id={`${id}-w`} width="4.6" height="6" patternUnits="userSpaceOnUse">
            <rect className="sk-window" x="1.1" y="1.4" width="2.2" height="2.8" />
          </pattern>
          <pattern id={`${id}-wd`} width="3.4" height="4.4" patternUnits="userSpaceOnUse">
            <rect className="sk-window" x="0.7" y="0.9" width="2" height="2.4" />
          </pattern>
          <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <Scene />
      </svg>
    </SceneId.Provider>
  );
}
