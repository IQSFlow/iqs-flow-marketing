// Static ATL (Hartsfield-Jackson Atlanta) amenity data for map overlays.
// Concourses run NORTH-SOUTH, arranged WEST→EAST: T, A, B, C, D, E, F
// Coordinates from OSM Overpass API building outlines (verified 2025).

import { Amenity } from "./clt-amenities";

// Restrooms placed near train stations (south end), mid-concourse, and far end (north)
export const ATL_RESTROOMS: Amenity[] = [
  // ── Concourse T (lon ~-84.4421) ──
  { id: "r-atl-t-south", label: "Restroom – Concourse T (south)", lat: 33.6392, lon: -84.4421, detail: "Near train station" },
  { id: "r-atl-t-mid",   label: "Restroom – Concourse T (mid)",   lat: 33.6405, lon: -84.4420 },
  { id: "r-atl-t-north", label: "Restroom – Concourse T (north)", lat: 33.6415, lon: -84.4419, detail: "Wheelchair accessible" },

  // ── Concourse A (lon ~-84.4395) ──
  { id: "r-atl-a-south", label: "Restroom – Concourse A (south)", lat: 33.6380, lon: -84.4395, detail: "Near train station" },
  { id: "r-atl-a-mid",   label: "Restroom – Concourse A (mid)",   lat: 33.6407, lon: -84.4394 },
  { id: "r-atl-a-north", label: "Restroom – Concourse A (north)", lat: 33.6432, lon: -84.4393, detail: "Wheelchair accessible" },

  // ── Concourse B (lon ~-84.4356) ──
  { id: "r-atl-b-south", label: "Restroom – Concourse B (south)", lat: 33.6380, lon: -84.4356, detail: "Near train station" },
  { id: "r-atl-b-mid",   label: "Restroom – Concourse B (mid)",   lat: 33.6407, lon: -84.4355 },
  { id: "r-atl-b-north", label: "Restroom – Concourse B (north)", lat: 33.6432, lon: -84.4354, detail: "Wheelchair accessible" },

  // ── Concourse C (lon ~-84.4323) ──
  { id: "r-atl-c-south", label: "Restroom – Concourse C (south)", lat: 33.6381, lon: -84.4323, detail: "Near train station" },
  { id: "r-atl-c-mid1",  label: "Restroom – Concourse C (mid-south)", lat: 33.6400, lon: -84.4322 },
  { id: "r-atl-c-mid2",  label: "Restroom – Concourse C (mid-north)", lat: 33.6418, lon: -84.4321 },
  { id: "r-atl-c-north", label: "Restroom – Concourse C (north)", lat: 33.6432, lon: -84.4321, detail: "Wheelchair accessible" },

  // ── Concourse D (lon ~-84.4290) ──
  { id: "r-atl-d-south", label: "Restroom – Concourse D (south)", lat: 33.6381, lon: -84.4290, detail: "Near train station" },
  { id: "r-atl-d-mid",   label: "Restroom – Concourse D (mid)",   lat: 33.6407, lon: -84.4289 },
  { id: "r-atl-d-north", label: "Restroom – Concourse D (north)", lat: 33.6431, lon: -84.4288, detail: "Wheelchair accessible" },

  // ── Concourse E (lon ~-84.4255) ──
  { id: "r-atl-e-south", label: "Restroom – Concourse E (south)", lat: 33.6379, lon: -84.4255, detail: "Near train station" },
  { id: "r-atl-e-mid",   label: "Restroom – Concourse E (mid)",   lat: 33.6407, lon: -84.4253 },
  { id: "r-atl-e-north", label: "Restroom – Concourse E (north)", lat: 33.6434, lon: -84.4251, detail: "Wheelchair accessible" },

  // ── Concourse F (lon ~-84.4192) ──
  { id: "r-atl-f-south", label: "Restroom – Concourse F (south)", lat: 33.6391, lon: -84.4192, detail: "Near train station" },
  { id: "r-atl-f-north", label: "Restroom – Concourse F (north)", lat: 33.6408, lon: -84.4191 },
];

// Delta Sky Clubs and independent lounges at ATL
export const ATL_LOUNGES: Amenity[] = [
  { id: "l-atl-skyclub-t", label: "Delta Sky Club – Concourse T",  lat: 33.6408, lon: -84.4420, detail: "Delta Air Lines - near gate T7" },
  { id: "l-atl-skyclub-a", label: "Delta Sky Club – Concourse A",  lat: 33.6412, lon: -84.4394, detail: "Delta Air Lines - near gate A17" },
  { id: "l-atl-skyclub-b", label: "Delta Sky Club – Concourse B",  lat: 33.6412, lon: -84.4355, detail: "Delta Air Lines - flagship location near gate B18" },
  { id: "l-atl-skyclub-e", label: "Delta Sky Club – Concourse E",  lat: 33.6412, lon: -84.4253, detail: "Delta Air Lines - international concourse" },
  { id: "l-atl-skyclub-f", label: "Delta Sky Club – Concourse F",  lat: 33.6398, lon: -84.4191, detail: "Delta Air Lines - international concourse" },
  { id: "l-atl-club-f",    label: "The Club ATL – Concourse F",    lat: 33.6403, lon: -84.4191, detail: "Independent lounge - Concourse F" },
];
