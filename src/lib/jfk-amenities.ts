// JFK (John F. Kennedy International) airport amenity data.
// Coordinates placed inside terminal buildings based on OSM building outlines.
// Terminal outlines verified via Overpass API (2025).

import type { Amenity } from "./clt-amenities";

// ── Restrooms ─────────────────────────────────────────────────────────────────
// 3–5 per terminal, near entries, mid-concourse, and far ends.

export const JFK_RESTROOMS: Amenity[] = [
  // Terminal 1 (C-shaped concourse — gates along inside arc)
  { id: "r-jfk-t1-entry",  label: "Restroom — T1 near Gate 1",     lat: 40.6439, lon: -73.7921, detail: "Near terminal entrance (NW)" },
  { id: "r-jfk-t1-mid",    label: "Restroom — T1 mid-concourse",   lat: 40.6425, lon: -73.7908, detail: "Between gates 5-6" },
  { id: "r-jfk-t1-end",    label: "Restroom — T1 near Gate 11",    lat: 40.6412, lon: -73.7926, detail: "Far end of concourse (S)" },

  // Terminal 4 (B-pier extending SSE from main hall)
  { id: "r-jfk-t4-main",   label: "Restroom — T4 main hall",       lat: 40.6452, lon: -73.7797, detail: "Near check-in / security" },
  { id: "r-jfk-t4-b20s",   label: "Restroom — T4 near B22",       lat: 40.6442, lon: -73.7801, detail: "B-pier north end" },
  { id: "r-jfk-t4-b30s",   label: "Restroom — T4 near B30",       lat: 40.6420, lon: -73.7806, detail: "B-pier mid-section" },
  { id: "r-jfk-t4-b38",    label: "Restroom — T4 near B38",       lat: 40.6398, lon: -73.7810, detail: "B-pier south section" },
  { id: "r-jfk-t4-b47",    label: "Restroom — T4 near B47",       lat: 40.6372, lon: -73.7814, detail: "B-pier far end" },

  // Terminal 5 (two piers extending ENE from TWA building)
  { id: "r-jfk-t5-entry",  label: "Restroom — T5 TWA lobby",      lat: 40.6463, lon: -73.7784, detail: "Historic TWA terminal area" },
  { id: "r-jfk-t5-p1-mid", label: "Restroom — T5 Pier 1 mid",     lat: 40.6453, lon: -73.7756, detail: "South pier, near gates 7-8" },
  { id: "r-jfk-t5-p2-mid", label: "Restroom — T5 Pier 2 mid",     lat: 40.6474, lon: -73.7756, detail: "North pier, near gates 20-21" },
  { id: "r-jfk-t5-p1-end", label: "Restroom — T5 Pier 1 far end", lat: 40.6451, lon: -73.7731, detail: "Near gates 13-14" },

  // Terminal 7 (demolished — historical position between T1 and T8)
  { id: "r-jfk-t7-entry",  label: "Restroom — T7 near Gate 1",    lat: 40.6481, lon: -73.7883, detail: "Near terminal entrance" },
  { id: "r-jfk-t7-mid",    label: "Restroom — T7 mid-concourse",  lat: 40.6473, lon: -73.7889, detail: "Between gates 6-7" },
  { id: "r-jfk-t7-end",    label: "Restroom — T7 near Gate 12",   lat: 40.6464, lon: -73.7895, detail: "Far end of concourse" },

  // Terminal 8 (diagonal SSW→NNE concourse)
  { id: "r-jfk-t8-entry",  label: "Restroom — T8 south entrance", lat: 40.6465, lon: -73.7946, detail: "Near gate 1-3 area" },
  { id: "r-jfk-t8-gate10", label: "Restroom — T8 near Gate 10",   lat: 40.6472, lon: -73.7940, detail: "South-mid section" },
  { id: "r-jfk-t8-gate25", label: "Restroom — T8 near Gate 25",   lat: 40.6486, lon: -73.7927, detail: "Mid-concourse" },
  { id: "r-jfk-t8-gate37", label: "Restroom — T8 near Gate 37",   lat: 40.6498, lon: -73.7917, detail: "North-mid section" },
  { id: "r-jfk-t8-gate49", label: "Restroom — T8 near Gate 49",   lat: 40.6508, lon: -73.7907, detail: "Far north end" },
];

// ── Lounges ───────────────────────────────────────────────────────────────────
// Real airline lounges at JFK, positioned near actual terminal locations.

export const JFK_LOUNGES: Amenity[] = [
  // Terminal 1
  { id: "l-jfk-t1-turkish",   label: "Turkish Airlines Lounge — T1",   lat: 40.6434, lon: -73.7912, detail: "Turkish Airlines — near gates 4-5" },
  { id: "l-jfk-t1-airfrance",  label: "Air France Lounge — T1",        lat: 40.6420, lon: -73.7907, detail: "Air France — near gates 7-8" },

  // Terminal 4
  { id: "l-jfk-t4-skyclub-a",  label: "Delta Sky Club — T4 (north)",   lat: 40.6442, lon: -73.7804, detail: "Delta — near B20-B23" },
  { id: "l-jfk-t4-skyclub-b",  label: "Delta Sky Club — T4 (south)",   lat: 40.6400, lon: -73.7809, detail: "Delta — near B33-B35" },

  // Terminal 5
  { id: "l-jfk-t5-mint",       label: "JetBlue Mint Lounge — T5",      lat: 40.6463, lon: -73.7785, detail: "JetBlue — near terminal center" },

  // Terminal 7
  { id: "l-jfk-t7-galleries",  label: "British Airways Galleries — T7", lat: 40.6476, lon: -73.7888, detail: "British Airways — near gates 3-4" },

  // Terminal 8
  { id: "l-jfk-t8-admirals",   label: "Admirals Club — T8",            lat: 40.6475, lon: -73.7937, detail: "American Airlines — near gates 8-12" },
  { id: "l-jfk-t8-flagship",   label: "Flagship Lounge — T8",          lat: 40.6490, lon: -73.7925, detail: "American Airlines — near gates 27-30" },
];
