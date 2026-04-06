/**
 * Corridor waypoint system for airport walking paths.
 *
 * Instead of drawing straight lines between gates (which cut through
 * terminal buildings), this module defines walkable corridor centerlines
 * and provides path-finding that follows the hallways.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

type LatLon = [number, number];

interface CorridorGraph {
  /** Named corridor segments (each an ordered polyline of waypoints) */
  corridors: { name: string; points: LatLon[] }[];
  /** Hub waypoint(s) where corridors connect */
  hub: LatLon;
  /** Maps gate code → { corridorIndex, nearest waypoint index on that corridor } */
  gateMap: Record<string, { corridor: number; wpIndex: number }>;
}

// ─── CLT (Charlotte Douglas) corridor data ───────────────────────────────────
// Corridor centerlines derived from the midpoints of opposing gate positions.
// CLT layout: central atrium with 5 concourse "fingers" radiating outward.

const CLT_HUB: LatLon = [35.2205, -80.9440];

// Concourse A — 3 sub-segments radiating west from the hub
// A south wing (A1–A13): runs west from hub
const A_SOUTH: LatLon[] = [
  [35.2205, -80.9455],  // junction near hub
  [35.2203, -80.9467],  // near A1/A2
  [35.2203, -80.9471],  // near A3/A4
  [35.2203, -80.9476],  // near A5/A6
  [35.2202, -80.9480],  // near A7/A8
  [35.2202, -80.9484],  // near A9/A10
  [35.2202, -80.9486],  // near A11/A12/A13
];

// A north wing (A21–A29): runs west from hub, north side
const A_NORTH: LatLon[] = [
  [35.2215, -80.9455],  // junction near hub (north side of A)
  [35.2226, -80.9469],  // near A21/A22
  [35.2226, -80.9475],  // near A23/A24
  [35.2226, -80.9479],  // near A25/A26
  [35.2226, -80.9482],  // near A27/A28/A29
];

// A extension (A30–A39): further north/west
const A_EXT: LatLon[] = [
  [35.2240, -80.9465],  // connector from A-north
  [35.2250, -80.9470],  // near A30/A31
  [35.2250, -80.9477],  // near A32/A33
  [35.2250, -80.9480],  // near A34/A35
  [35.2250, -80.9483],  // near A36/A37/A38/A39
];

// Concourse B — runs south from hub
const B_CORRIDOR: LatLon[] = [
  [35.2205, -80.9447],  // junction near hub
  [35.2199, -80.9450],  // near B1/B2
  [35.2196, -80.9451],  // near B3/B4
  [35.2192, -80.9452],  // near B5/B6
  [35.2189, -80.9453],  // near B7/B8
  [35.2183, -80.9453],  // near B9/B10
  [35.2180, -80.9454],  // near B11/B12
  [35.2178, -80.9454],  // near B13/B14/B15/B16
];

// Concourse C — runs south-southeast from hub
const C_CORRIDOR: LatLon[] = [
  [35.2205, -80.9432],  // junction near hub
  [35.2200, -80.9425],  // near C1/C2
  [35.2198, -80.9428],  // near C3
  [35.2196, -80.9428],  // near C4/C5
  [35.2193, -80.9426],  // near C6/C7
  [35.2189, -80.9425],  // near C8/C9
  [35.2186, -80.9423],  // near C10/C11
  [35.2182, -80.9422],  // near C12/C13
  [35.2180, -80.9422],  // near C14/C15
  [35.2178, -80.9422],  // near C16/C17/C18/C19
];

// Concourse D — runs east from hub
const D_CORRIDOR: LatLon[] = [
  [35.2205, -80.9425],  // junction near hub
  [35.2204, -80.9414],  // near D1/D2
  [35.2206, -80.9405],  // near D3/D4
  [35.2206, -80.9402],  // near D5/D6
  [35.2207, -80.9398],  // near D7/D8
  [35.2207, -80.9395],  // near D9/D10
  [35.2207, -80.9393],  // near D11/D12/D13
];

// Concourse E — runs northeast from hub, has south wing (E1-E19) + north wing (E20-E42)
const E_SOUTH: LatLon[] = [
  [35.2210, -80.9420],  // junction near hub
  [35.2219, -80.9416],  // near E1/E2/E3
  [35.2226, -80.9412],  // near E4/E5/E6
  [35.2228, -80.9409],  // near E7/E8
  [35.2229, -80.9405],  // near E9
  [35.2230, -80.9399],  // near E10/E11
  [35.2230, -80.9394],  // near E12/E13
  [35.2230, -80.9392],  // near E15/E16/E17/E18/E19
  [35.2237, -80.9391],  // near E14A/E14B/E16A
];

// E north wing (E20-E42): runs further north
const E_NORTH: LatLon[] = [
  [35.2230, -80.9405],  // junction (shared with E-south near E9/E10)
  [35.2233, -80.9406],  // near E20
  [35.2236, -80.9405],  // near E21/E22
  [35.2239, -80.9405],  // near E23/E24
  [35.2241, -80.9405],  // near E25/E26
  [35.2244, -80.9406],  // near E27/E28
  [35.2247, -80.9406],  // near E29/E30
  [35.2250, -80.9406],  // near E31/E32
  [35.2253, -80.9408],  // near E36/E37
  [35.2256, -80.9406],  // near E38/E39/E40/E41/E42
];

const CLT_CORRIDORS = [
  { name: "A-south",  points: A_SOUTH },    // 0
  { name: "A-north",  points: A_NORTH },    // 1
  { name: "A-ext",    points: A_EXT },      // 2
  { name: "B",        points: B_CORRIDOR }, // 3
  { name: "C",        points: C_CORRIDOR }, // 4
  { name: "D",        points: D_CORRIDOR }, // 5
  { name: "E-south",  points: E_SOUTH },    // 6
  { name: "E-north",  points: E_NORTH },    // 7
];

// Gate → corridor mapping. For each gate, we record which corridor it's on
// and the index of the nearest waypoint on that corridor.
function buildCLTGateMap(): Record<string, { corridor: number; wpIndex: number }> {
  const m: Record<string, { corridor: number; wpIndex: number }> = {};

  // A south wing (corridor 0)
  for (const [code, wp] of Object.entries({
    A1: 1, A2: 1, A3: 2, A4: 2, A5: 3, A6: 3,
    A7: 4, A8: 4, A9: 5, A10: 5, A11: 6, A12: 6, A13: 6,
  })) m[code] = { corridor: 0, wpIndex: wp };

  // A north wing (corridor 1)
  for (const [code, wp] of Object.entries({
    A21: 1, A22: 1, A23: 2, A24: 2, A25: 3, A26: 3,
    A27: 4, A28: 4, A29: 4,
  })) m[code] = { corridor: 1, wpIndex: wp };

  // A extension (corridor 2)
  for (const [code, wp] of Object.entries({
    A30: 1, A31: 1, A32: 2, A33: 2, A34: 3, A35: 3,
    A36: 4, A37: 4, A38: 4, A39: 4,
  })) m[code] = { corridor: 2, wpIndex: wp };

  // B (corridor 3)
  for (const [code, wp] of Object.entries({
    B1: 1, B2: 1, B3: 2, B4: 2, B5: 3, B6: 3,
    B7: 4, B8: 4, B9: 5, B10: 5, B11: 6, B12: 6,
    B13: 7, B14: 7, B15: 7, B16: 7,
  })) m[code] = { corridor: 3, wpIndex: wp };

  // C (corridor 4)
  for (const [code, wp] of Object.entries({
    C1: 1, C2: 1, C3: 2, C4: 3, C5: 3,
    C6: 4, C7: 4, C8: 5, C9: 5, C10: 6, C11: 6,
    C12: 7, C13: 7, C14: 8, C15: 8, C16: 9, C17: 9,
    C18: 9, C19: 9,
  })) m[code] = { corridor: 4, wpIndex: wp };

  // D (corridor 5)
  for (const [code, wp] of Object.entries({
    D1: 1, D2: 1, D3: 2, D4: 2, D5: 3, D6: 3,
    D7: 4, D8: 4, D9: 5, D10: 5, D11: 6, D12: 6, D13: 6,
  })) m[code] = { corridor: 5, wpIndex: wp };

  // E south (corridor 6)
  for (const [code, wp] of Object.entries({
    E1: 1, E2: 1, E3: 1, E4: 2, E5: 2, E6: 2,
    E7: 3, E8: 3, E9: 4, E10: 5, E11: 5,
    E12: 6, E13: 6, E15: 7, E16: 7, E17: 7, E18: 7, E19: 7,
    E14A: 8, E14B: 8, E16A: 8,
  })) m[code] = { corridor: 6, wpIndex: wp };

  // E north (corridor 7)
  for (const [code, wp] of Object.entries({
    E20: 1, E21: 2, E22: 2, E23: 3, E24: 3,
    E25: 4, E26: 4, E27: 5, E28: 5, E29: 6, E30: 6,
    E31: 7, E32: 7, E36: 8, E37: 8,
    E38: 9, E39: 9, E40: 9, E41: 9, E42: 9,
  })) m[code] = { corridor: 7, wpIndex: wp };

  return m;
}

const CLT_GATE_MAP = buildCLTGateMap();

// Which corridors share a junction (and at which waypoint index on each).
// Format: [corridorA, wpIndexA, corridorB, wpIndexB]
// The hub connects them: corridor waypoint 0 is always the hub-side junction.
const CLT_JUNCTIONS: [number, number, number, number][] = [
  // A-north wp[4] connects to A-ext wp[0]
  [1, 4, 2, 0],
  // E-south wp[4] connects to E-north wp[0]
  [6, 4, 7, 0],
];

// ─── ATL (Hartsfield-Jackson Atlanta) corridor data ──────────────────────────
// ATL has 7 parallel concourses running NORTH-SOUTH, arranged WEST→EAST.
// The Plane Train connects them at the SOUTH end of each concourse.
// Coordinates from OSM Overpass API building outlines (verified 2025).

const ATL_HUB: LatLon = [33.6376, -84.4310];

// Each corridor is the centerline of a concourse, south (train station) → north.
// Coordinates adjusted to match refined concourse specs with slight N-tilt.
const ATL_T: LatLon[] = [
  [33.6390, -84.4421],  // south (train station)
  [33.6403, -84.4420],  // near T5/T6
  [33.6411, -84.4419],  // near T9/T10
  [33.6418, -84.4419],  // north end (T13/T14)
];

const ATL_A: LatLon[] = [
  [33.6378, -84.4395],  // south (train station)
  [33.6390, -84.4395],  // near A5/A6
  [33.6402, -84.4394],  // near A13/A14
  [33.6414, -84.4394],  // near A21/A22
  [33.6426, -84.4393],  // near A29/A30
  [33.6438, -84.4393],  // north end (A33/A34)
];

const ATL_B: LatLon[] = [
  [33.6378, -84.4356],  // south (train station)
  [33.6390, -84.4356],  // near B5/B6
  [33.6402, -84.4355],  // near B13/B14
  [33.6414, -84.4355],  // near B21/B22
  [33.6426, -84.4354],  // near B29/B30
  [33.6438, -84.4354],  // north end (B35/B36)
];

const ATL_C: LatLon[] = [
  [33.6379, -84.4323],  // south (train station)
  [33.6390, -84.4323],  // near C5/C6
  [33.6400, -84.4322],  // near C13/C14
  [33.6410, -84.4322],  // near C21/C22
  [33.6418, -84.4321],  // near C29/C30
  [33.6428, -84.4321],  // near C37/C38
  [33.6436, -84.4321],  // north end (C47/C48)
];

const ATL_D: LatLon[] = [
  [33.6379, -84.4290],  // south (train station)
  [33.6390, -84.4290],  // near D5/D6
  [33.6401, -84.4289],  // near D13/D14
  [33.6412, -84.4289],  // near D21/D22
  [33.6423, -84.4288],  // near D29/D30
  [33.6437, -84.4288],  // north end (D41/D42)
];

const ATL_E: LatLon[] = [
  [33.6377, -84.4255],  // south (train station)
  [33.6390, -84.4254],  // near E5/E6
  [33.6402, -84.4253],  // near E13/E14
  [33.6414, -84.4252],  // near E21/E22
  [33.6426, -84.4251],  // near E29/E30
  [33.6440, -84.4251],  // north end (E35/E36)
];

const ATL_F: LatLon[] = [
  [33.6389, -84.4192],  // south (train station)
  [33.6396, -84.4192],  // near F5/F6
  [33.6403, -84.4191],  // near F9/F10
  [33.6412, -84.4191],  // north end (F13/F14)
];

const ATL_CORRIDORS = [
  { name: "T", points: ATL_T },   // 0
  { name: "A", points: ATL_A },   // 1
  { name: "B", points: ATL_B },   // 2
  { name: "C", points: ATL_C },   // 3
  { name: "D", points: ATL_D },   // 4
  { name: "E", points: ATL_E },   // 5
  { name: "F", points: ATL_F },   // 6
];

function buildATLGateMap(): Record<string, { corridor: number; wpIndex: number }> {
  const m: Record<string, { corridor: number; wpIndex: number }> = {};

  // T (corridor 0) — 14 gates, 4 waypoints
  for (const [code, wp] of Object.entries({
    T1: 0, T2: 0, T3: 0, T4: 0,
    T5: 1, T6: 1, T7: 1, T8: 1,
    T9: 2, T10: 2, T11: 2, T12: 2,
    T13: 3, T14: 3,
  })) m[code] = { corridor: 0, wpIndex: wp };

  // A (corridor 1) — 34 gates, 6 waypoints
  for (const [code, wp] of Object.entries({
    A1: 0, A2: 0, A3: 0, A4: 0, A5: 1, A6: 1, A7: 1, A8: 1,
    A9: 1, A10: 1, A11: 2, A12: 2, A13: 2, A14: 2, A15: 2, A16: 2,
    A17: 3, A18: 3, A19: 3, A20: 3, A21: 3, A22: 3,
    A23: 4, A24: 4, A25: 4, A26: 4, A27: 4, A28: 4, A29: 4, A30: 4,
    A31: 5, A32: 5, A33: 5, A34: 5,
  })) m[code] = { corridor: 1, wpIndex: wp };

  // B (corridor 2) — 36 gates, 6 waypoints
  for (const [code, wp] of Object.entries({
    B1: 0, B2: 0, B3: 0, B4: 0, B5: 1, B6: 1, B7: 1, B8: 1,
    B9: 1, B10: 1, B11: 1, B12: 1,
    B13: 2, B14: 2, B15: 2, B16: 2, B17: 2, B18: 2,
    B19: 3, B20: 3, B21: 3, B22: 3, B23: 3, B24: 3,
    B25: 4, B26: 4, B27: 4, B28: 4, B29: 4, B30: 4,
    B31: 5, B32: 5, B33: 5, B34: 5, B35: 5, B36: 5,
  })) m[code] = { corridor: 2, wpIndex: wp };

  // C (corridor 3) — 48 gates, 7 waypoints
  for (const [code, wp] of Object.entries({
    C1: 0, C2: 0, C3: 0, C4: 0, C5: 1, C6: 1, C7: 1, C8: 1,
    C9: 1, C10: 1, C11: 1, C12: 1,
    C13: 2, C14: 2, C15: 2, C16: 2, C17: 2, C18: 2,
    C19: 3, C20: 3, C21: 3, C22: 3, C23: 3, C24: 3,
    C25: 3, C26: 3,
    C27: 4, C28: 4, C29: 4, C30: 4, C31: 4, C32: 4,
    C33: 4, C34: 4,
    C35: 5, C36: 5, C37: 5, C38: 5, C39: 5, C40: 5,
    C41: 6, C42: 6, C43: 6, C44: 6, C45: 6, C46: 6,
    C47: 6, C48: 6,
  })) m[code] = { corridor: 3, wpIndex: wp };

  // D (corridor 4) — 42 gates, 6 waypoints
  for (const [code, wp] of Object.entries({
    D1: 0, D2: 0, D3: 0, D4: 0, D5: 1, D6: 1, D7: 1, D8: 1,
    D9: 1, D10: 1, D11: 1, D12: 1,
    D13: 2, D14: 2, D15: 2, D16: 2, D17: 2, D18: 2,
    D19: 3, D20: 3, D21: 3, D22: 3, D23: 3, D24: 3,
    D25: 3, D26: 3,
    D27: 4, D28: 4, D29: 4, D30: 4, D31: 4, D32: 4,
    D33: 4, D34: 4,
    D35: 5, D36: 5, D37: 5, D38: 5, D39: 5, D40: 5,
    D41: 5, D42: 5,
  })) m[code] = { corridor: 4, wpIndex: wp };

  // E (corridor 5) — 36 gates, 6 waypoints
  for (const [code, wp] of Object.entries({
    E1: 0, E2: 0, E3: 0, E4: 0, E5: 1, E6: 1, E7: 1, E8: 1,
    E9: 1, E10: 1, E11: 1, E12: 1,
    E13: 2, E14: 2, E15: 2, E16: 2, E17: 2, E18: 2,
    E19: 3, E20: 3, E21: 3, E22: 3, E23: 3, E24: 3,
    E25: 4, E26: 4, E27: 4, E28: 4, E29: 4, E30: 4,
    E31: 5, E32: 5, E33: 5, E34: 5, E35: 5, E36: 5,
  })) m[code] = { corridor: 5, wpIndex: wp };

  // F (corridor 6) — 14 gates, 4 waypoints
  for (const [code, wp] of Object.entries({
    F1: 0, F2: 0, F3: 0, F4: 0,
    F5: 1, F6: 1, F7: 1, F8: 1,
    F9: 2, F10: 2, F11: 2, F12: 2,
    F13: 3, F14: 3,
  })) m[code] = { corridor: 6, wpIndex: wp };

  return m;
}

// ─── JFK (John F. Kennedy International) corridor data ───────────────────────
// JFK has separate terminal buildings. Each terminal is its own corridor.
// There's no shared hub — cross-terminal routing isn't walkable (AirTrain only).
// Coordinates from OSM Overpass API building outlines + parking positions (2025).

const JFK_HUB: LatLon = [40.6455, -73.7870]; // approximate center of terminal complex

// T1: C-shaped arc (OSM: lat 40.641–44, lon -73.793 to -73.789)
const JFK_T1: LatLon[] = [
  [40.6440, -73.7922],  // gate 1 (NW)
  [40.6435, -73.7914],  // near gate 3
  [40.6428, -73.7908],  // near gate 5
  [40.6420, -73.7907],  // near gate 7 (east bend)
  [40.6413, -73.7915],  // near gate 9
  [40.6411, -73.7927],  // gate 11 (S)
];

// T4 B-concourse: straight pier running SSE from main hall
const JFK_T4: LatLon[] = [
  [40.6450, -73.7798],  // B20 (north, near main hall)
  [40.6440, -73.7800],  // near B24
  [40.6430, -73.7802],  // near B27
  [40.6420, -73.7805],  // near B30
  [40.6410, -73.7807],  // near B33
  [40.6400, -73.7809],  // near B37
  [40.6390, -73.7811],  // near B41
  [40.6380, -73.7813],  // near B45
  [40.6370, -73.7815],  // B47 (far south)
];

// T5 Pier 1 (south): ENE from TWA building, slight southward drift
const JFK_T5_P1: LatLon[] = [
  [40.6455, -73.7782],  // entrance (west)
  [40.6454, -73.7768],  // near gate 5
  [40.6452, -73.7755],  // near gate 9
  [40.6451, -73.7741],  // near gate 12
  [40.6450, -73.7728],  // gate 14 (east end)
];

// T5 Pier 2 (north): ENE from TWA building, slight northward drift
const JFK_T5_P2: LatLon[] = [
  [40.6470, -73.7782],  // entrance (west)
  [40.6472, -73.7768],  // near gate 19
  [40.6474, -73.7755],  // near gate 23
  [40.6476, -73.7741],  // near gate 27
  [40.6478, -73.7728],  // gate 29 (east end)
];

// T7: compact NNW→SSE (demolished, historical position between T1 and T8)
const JFK_T7: LatLon[] = [
  [40.6482, -73.7882],  // gate 1 (north)
  [40.6478, -73.7885],  // near gate 3
  [40.6474, -73.7888],  // near gate 6
  [40.6470, -73.7891],  // near gate 8
  [40.6466, -73.7893],  // near gate 10
  [40.6462, -73.7896],  // gate 12 (south)
];

// T8: diagonal pier SSW→NNE (OSM: lat 40.646–51, lon -73.795 to -73.790)
const JFK_T8: LatLon[] = [
  [40.6462, -73.7948],  // gate 1 (SSW)
  [40.6467, -73.7944],  // near gate 5
  [40.6472, -73.7939],  // near gate 10
  [40.6476, -73.7935],  // near gate 15
  [40.6481, -73.7931],  // near gate 20
  [40.6486, -73.7926],  // near gate 25
  [40.6491, -73.7922],  // near gate 30
  [40.6496, -73.7918],  // near gate 35
  [40.6500, -73.7913],  // near gate 40
  [40.6505, -73.7909],  // near gate 45
  [40.6510, -73.7905],  // gate 50 (NNE)
];

const JFK_CORRIDORS = [
  { name: "T1",    points: JFK_T1 },    // 0
  { name: "T4",    points: JFK_T4 },    // 1
  { name: "T5-P1", points: JFK_T5_P1 }, // 2
  { name: "T5-P2", points: JFK_T5_P2 }, // 3
  { name: "T7",    points: JFK_T7 },    // 4
  { name: "T8",    points: JFK_T8 },    // 5
];

function buildJFKGateMap(): Record<string, { corridor: number; wpIndex: number }> {
  const m: Record<string, { corridor: number; wpIndex: number }> = {};

  // T1 (corridor 0) — 11 gates along 6 waypoints
  for (const [code, wp] of Object.entries({
    "1": 0, "2": 0, "3": 1, "4": 1, "5": 2, "6": 2,
    "7": 3, "8": 3, "9": 4, "10": 4, "11": 5,
  })) m[`T1-${code}`] = { corridor: 0, wpIndex: wp };

  // T4 (corridor 1) — 28 B-gates along 9 waypoints
  for (const [code, wp] of Object.entries({
    "B20": 0, "B21": 0, "B22": 0,
    "B23": 1, "B24": 1, "B25": 1,
    "B26": 2, "B27": 2, "B28": 2,
    "B29": 3, "B30": 3, "B31": 3,
    "B32": 4, "B33": 4, "B34": 4,
    "B35": 5, "B36": 5, "B37": 5,
    "B38": 6, "B39": 6, "B40": 6, "B41": 6,
    "B42": 7, "B43": 7, "B44": 7, "B45": 7,
    "B46": 8, "B47": 8,
  })) m[`T4-${code}`] = { corridor: 1, wpIndex: wp };

  // T5 Pier 1 (corridor 2) — gates 1-14 along 5 waypoints
  for (const [code, wp] of Object.entries({
    "1": 0, "2": 0, "3": 0,
    "4": 1, "5": 1, "6": 1,
    "7": 2, "8": 2, "9": 2, "10": 2,
    "11": 3, "12": 3,
    "13": 4, "14": 4,
  })) m[`T5-${code}`] = { corridor: 2, wpIndex: wp };

  // T5 Pier 2 (corridor 3) — gates 15-29 along 5 waypoints
  for (const [code, wp] of Object.entries({
    "15": 0, "16": 0, "17": 0,
    "18": 1, "19": 1, "20": 1,
    "21": 2, "22": 2, "23": 2,
    "24": 3, "25": 3, "26": 3,
    "27": 4, "28": 4, "29": 4,
  })) m[`T5-${code}`] = { corridor: 3, wpIndex: wp };

  // T7 (corridor 4) — 12 gates along 6 waypoints
  for (const [code, wp] of Object.entries({
    "1": 0, "2": 0, "3": 1, "4": 1,
    "5": 2, "6": 2, "7": 3, "8": 3,
    "9": 4, "10": 4, "11": 5, "12": 5,
  })) m[`T7-${code}`] = { corridor: 4, wpIndex: wp };

  // T8 (corridor 5) — 50 gates along 11 waypoints
  for (const [code, wp] of Object.entries({
    "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
    "6": 1, "7": 1, "8": 1, "9": 1, "10": 1,
    "11": 2, "12": 2, "13": 2, "14": 2, "15": 2,
    "16": 3, "17": 3, "18": 3, "19": 3, "20": 3,
    "21": 4, "22": 4, "23": 4, "24": 4, "25": 4,
    "26": 5, "27": 5, "28": 5, "29": 5, "30": 5,
    "31": 6, "32": 6, "33": 6, "34": 6, "35": 6,
    "36": 7, "37": 7, "38": 7, "39": 7, "40": 7,
    "41": 8, "42": 8, "43": 8, "44": 8, "45": 8,
    "46": 9, "47": 9, "48": 9, "49": 9, "50": 10,
  })) m[`T8-${code}`] = { corridor: 5, wpIndex: wp };

  return m;
}

const ATL_GATE_MAP = buildATLGateMap();
const JFK_GATE_MAP = buildJFKGateMap();

// T5 piers share an entrance junction
const JFK_JUNCTIONS: [number, number, number, number][] = [
  // T5-P1 wp[0] connects to T5-P2 wp[0] (shared entrance)
  [2, 0, 3, 0],
];

// ─── Graph for all airports ──────────────────────────────────────────────────

const AIRPORT_GRAPHS: Record<string, CorridorGraph> = {
  CLT: {
    corridors: CLT_CORRIDORS,
    hub: CLT_HUB,
    gateMap: CLT_GATE_MAP,
  },
  ATL: {
    corridors: ATL_CORRIDORS,
    hub: ATL_HUB,
    gateMap: ATL_GATE_MAP,
  },
  JFK: {
    corridors: JFK_CORRIDORS,
    hub: JFK_HUB,
    gateMap: JFK_GATE_MAP,
  },
};

// ─── Path-finding ────────────────────────────────────────────────────────────

function sliceCorridor(points: LatLon[], from: number, to: number): LatLon[] {
  if (from <= to) return points.slice(from, to + 1);
  return points.slice(to, from + 1).reverse();
}

/**
 * Get a walking path between two gates at the same airport.
 * Returns an array of [lat, lon] waypoints following corridor centerlines.
 * Falls back to a direct line if the airport has no corridor data.
 */
export function getWalkingPath(
  airportIata: string,
  fromGateCode: string,
  toGateCode: string,
): LatLon[] {
  const graph = AIRPORT_GRAPHS[airportIata];
  if (!graph) return []; // no data — caller should fall back to straight line

  const from = graph.gateMap[fromGateCode];
  const to = graph.gateMap[toGateCode];
  if (!from || !to) return []; // unknown gates

  // Same corridor — just walk along it
  if (from.corridor === to.corridor) {
    return sliceCorridor(graph.corridors[from.corridor].points, from.wpIndex, to.wpIndex);
  }

  // Check direct junctions (e.g. A-north ↔ A-ext, E-south ↔ E-north, T5-P1 ↔ T5-P2)
  const junctions = airportIata === "JFK" ? JFK_JUNCTIONS : CLT_JUNCTIONS;
  for (const [cA, wpA, cB, wpB] of junctions) {
    if (from.corridor === cA && to.corridor === cB) {
      const seg1 = sliceCorridor(graph.corridors[cA].points, from.wpIndex, wpA);
      const seg2 = sliceCorridor(graph.corridors[cB].points, wpB, to.wpIndex);
      return [...seg1, ...seg2.slice(1)]; // skip duplicate junction point
    }
    if (from.corridor === cB && to.corridor === cA) {
      const seg1 = sliceCorridor(graph.corridors[cB].points, from.wpIndex, wpB);
      const seg2 = sliceCorridor(graph.corridors[cA].points, wpA, to.wpIndex);
      return [...seg1, ...seg2.slice(1)];
    }
  }

  // Different corridors — route through hub
  const fromCorridor = graph.corridors[from.corridor].points;
  const toCorridor = graph.corridors[to.corridor].points;

  // Walk from gate to corridor start (hub junction), through hub, to destination
  const seg1 = sliceCorridor(fromCorridor, from.wpIndex, 0); // walk toward hub
  const seg2 = sliceCorridor(toCorridor, 0, to.wpIndex);     // walk from hub

  return [...seg1, graph.hub, ...seg2];
}

/**
 * Build a multi-segment walking path through a list of gates in order.
 * Returns a single polyline of waypoints.
 */
export function getMultiGateWalkingPath(
  airportIata: string,
  gateCodes: string[],
): LatLon[] {
  if (gateCodes.length < 2) return [];

  const result: LatLon[] = [];
  for (let i = 0; i < gateCodes.length - 1; i++) {
    const segment = getWalkingPath(airportIata, gateCodes[i], gateCodes[i + 1]);
    if (segment.length === 0) continue; // no data for this pair
    if (result.length > 0) {
      // skip first point of segment to avoid duplicate at junction
      result.push(...segment.slice(1));
    } else {
      result.push(...segment);
    }
  }
  return result;
}

/**
 * Snap a GPS point to the nearest corridor waypoint for a given airport.
 * Returns the snapped point, or the original if no corridor data exists.
 */
export function snapToNearestCorridor(
  airportIata: string,
  lat: number,
  lon: number,
): LatLon {
  const graph = AIRPORT_GRAPHS[airportIata];
  if (!graph) return [lat, lon];

  let bestDist = Infinity;
  let bestPoint: LatLon = [lat, lon];

  for (const corridor of graph.corridors) {
    for (let i = 0; i < corridor.points.length - 1; i++) {
      const snapped = snapToSegment(
        [lat, lon],
        corridor.points[i],
        corridor.points[i + 1],
      );
      const d = dist2(snapped, [lat, lon]);
      if (d < bestDist) {
        bestDist = d;
        bestPoint = snapped;
      }
    }
  }

  return bestPoint;
}

/**
 * For a given point, find which corridor and waypoint index it's closest to.
 */
function locateOnCorridor(
  graph: CorridorGraph,
  lat: number,
  lon: number,
): { corridor: number; wpIndex: number; snapped: LatLon } {
  let bestDist = Infinity;
  let bestCorridor = 0;
  let bestWpIndex = 0;
  let bestSnapped: LatLon = [lat, lon];

  for (let c = 0; c < graph.corridors.length; c++) {
    const pts = graph.corridors[c].points;
    for (let i = 0; i < pts.length; i++) {
      const d = dist2([lat, lon], pts[i]);
      if (d < bestDist) {
        bestDist = d;
        bestCorridor = c;
        bestWpIndex = i;
        bestSnapped = pts[i];
      }
    }
  }

  return { corridor: bestCorridor, wpIndex: bestWpIndex, snapped: bestSnapped };
}

/**
 * Snap a trail of GPS points to corridor centerlines and route between
 * consecutive points along corridor paths (through the hub if needed).
 * This prevents straight lines cutting through terminal buildings.
 */
export function snapTrailToCorridor(
  airportIata: string,
  points: { lat: number; lon: number }[],
): LatLon[] {
  const graph = AIRPORT_GRAPHS[airportIata];
  if (!graph) return points.map((p) => [p.lat, p.lon]);
  if (points.length === 0) return [];

  // Locate each point on the corridor graph
  const located = points.map((p) => locateOnCorridor(graph, p.lat, p.lon));

  // Build path: for each consecutive pair, route along corridors
  const result: LatLon[] = [located[0].snapped];

  // Determine junctions for this airport
  const junctions = airportIata === "JFK" ? JFK_JUNCTIONS : CLT_JUNCTIONS;

  for (let i = 1; i < located.length; i++) {
    const from = located[i - 1];
    const to = located[i];

    if (from.corridor === to.corridor) {
      // Same corridor — walk along it
      const seg = sliceCorridor(graph.corridors[from.corridor].points, from.wpIndex, to.wpIndex);
      // Skip first point (already in result)
      for (let j = 1; j < seg.length; j++) result.push(seg[j]);
    } else {
      // Check for direct junction
      let routed = false;
      for (const [cA, wpA, cB, wpB] of junctions) {
        if (from.corridor === cA && to.corridor === cB) {
          const seg1 = sliceCorridor(graph.corridors[cA].points, from.wpIndex, wpA);
          const seg2 = sliceCorridor(graph.corridors[cB].points, wpB, to.wpIndex);
          for (let j = 1; j < seg1.length; j++) result.push(seg1[j]);
          for (let j = 1; j < seg2.length; j++) result.push(seg2[j]);
          routed = true;
          break;
        }
        if (from.corridor === cB && to.corridor === cA) {
          const seg1 = sliceCorridor(graph.corridors[cB].points, from.wpIndex, wpB);
          const seg2 = sliceCorridor(graph.corridors[cA].points, wpA, to.wpIndex);
          for (let j = 1; j < seg1.length; j++) result.push(seg1[j]);
          for (let j = 1; j < seg2.length; j++) result.push(seg2[j]);
          routed = true;
          break;
        }
      }

      if (!routed) {
        // Different corridors — route through hub
        const seg1 = sliceCorridor(graph.corridors[from.corridor].points, from.wpIndex, 0);
        const seg2 = sliceCorridor(graph.corridors[to.corridor].points, 0, to.wpIndex);
        for (let j = 1; j < seg1.length; j++) result.push(seg1[j]);
        result.push(graph.hub);
        for (let j = 0; j < seg2.length; j++) result.push(seg2[j]);
      }
    }
  }

  return result;
}

/**
 * Check whether an airport has corridor data defined.
 */
export function hasCorridorData(airportIata: string): boolean {
  return airportIata in AIRPORT_GRAPHS;
}

/**
 * Detect which airport a set of coordinates is near.
 * Uses a simple distance check against known airport centers.
 */
export function detectAirport(lat: number, lon: number): string | null {
  const AIRPORT_CENTERS: Record<string, LatLon> = {
    CLT: [35.2140, -80.9431],
    ATL: [33.6405, -84.4310],
    JFK: [40.6450, -73.7870],
  };
  for (const [iata, center] of Object.entries(AIRPORT_CENTERS)) {
    const dlat = lat - center[0];
    const dlon = lon - center[1];
    // ~0.02 degrees ≈ 2km — well within any airport's footprint
    if (dlat * dlat + dlon * dlon < 0.02 * 0.02) return iata;
  }
  return null;
}

// ─── Geometry helpers ────────────────────────────────────────────────────────

/** Squared distance between two lat/lon points (good enough for comparisons) */
function dist2(a: LatLon, b: LatLon): number {
  const dlat = a[0] - b[0];
  const dlon = a[1] - b[1];
  return dlat * dlat + dlon * dlon;
}

/** Project point P onto line segment AB, returning the closest point on AB */
function snapToSegment(p: LatLon, a: LatLon, b: LatLon): LatLon {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return a; // degenerate segment

  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return [a[0] + t * dx, a[1] + t * dy];
}
