// Shared static CLT airport amenity data used by both the Client Portal and Manager maps.

export interface Amenity {
  id: string;
  label: string;
  lat: number;
  lon: number;
  detail?: string;
}

// Real OSM toilet nodes (Overpass API, amenity=toilets, CLT bounding box, verified 2024)
export const CLT_RESTROOMS: Amenity[] = [
  { id: "r-3062268418",  label: "Restroom – Concourse E (north)",     lat: 35.2240872, lon: -80.9406660, detail: "Wheelchair accessible" },
  { id: "r-3062268419",  label: "Restroom – Concourse E",             lat: 35.2240945, lon: -80.9404139, detail: "Wheelchair accessible" },
  { id: "r-3062290777",  label: "Restroom – Concourse E (mid)",       lat: 35.2233373, lon: -80.9405756 },
  { id: "r-3062290784",  label: "Restroom – Concourse E (south)",     lat: 35.2229717, lon: -80.9395459, detail: "Wheelchair accessible · No fee" },
  { id: "r-3062293717",  label: "Restroom – Concourse E (entry)",     lat: 35.2225072, lon: -80.9411749 },
  { id: "r-3062293719",  label: "Restroom – Concourse E/D connector", lat: 35.2220704, lon: -80.9414729, detail: "Wheelchair accessible · No fee" },
  { id: "r-4406083990",  label: "Restroom – Concourse C (south)",     lat: 35.2192312, lon: -80.9427299, detail: "Wheelchair accessible" },
  { id: "r-4406156491",  label: "Restroom – Concourse C/D connector", lat: 35.2205456, lon: -80.9430729 },
  { id: "r-4406156889",  label: "Restroom – Concourse C (far south)", lat: 35.2184333, lon: -80.9421797, detail: "Wheelchair accessible" },
  { id: "r-4406161591",  label: "Restroom – B/C connector",           lat: 35.2204878, lon: -80.9439994, detail: "Wheelchair accessible" },
  { id: "r-5141557929",  label: "Restroom – Concourse B (south)",     lat: 35.2186600, lon: -80.9454115 },
  { id: "r-5141604624",  label: "Restroom – Concourse A (mid)",       lat: 35.2201830, lon: -80.9473872 },
  { id: "r-5141604823",  label: "Restroom – Concourse B (entry)",     lat: 35.2194986, lon: -80.9449342 },
  { id: "r-5141629921",  label: "Restroom – Concourse A (entry)",     lat: 35.2201824, lon: -80.9470604 },
  { id: "r-5141630022",  label: "Restroom – Concourse A (north)",     lat: 35.2203177, lon: -80.9479382 },
  { id: "r-5141630024",  label: "Restroom – A/B connector",           lat: 35.2204508, lon: -80.9447626 },
  { id: "r-5141641647",  label: "Restroom – Concourse D (south)",     lat: 35.2204868, lon: -80.9400302 },
  { id: "r-6174054686",  label: "Restroom – Concourse A (extension)", lat: 35.2224712, lon: -80.9473210 },
  { id: "r-12454390182", label: "Restroom – Concourse A far north (M)", lat: 35.2249011, lon: -80.9474032, detail: "Male · Wheelchair accessible" },
  { id: "r-12454390183", label: "Restroom – Concourse A far north (F)", lat: 35.2248879, lon: -80.9475479, detail: "Female · Wheelchair accessible" },
  { id: "r-12454390187", label: "Restroom – Concourse A extension",   lat: 35.2238237, lon: -80.9468031 },
];

export const CLT_LOUNGES: Amenity[] = [
  { id: "l-admirals-b",  label: "Admirals Club – Concourse B", lat: 35.2194468, lon: -80.9451949, detail: "American Airlines — Concourse B" },
  { id: "l-admirals-d",  label: "Admirals Club – Concourse D", lat: 35.2204355, lon: -80.9430717, detail: "American Airlines — Concourse D" },
  { id: "l-explorer",    label: "Explorer Lounge",             lat: 35.2244528, lon: -80.9404711, detail: "Concourse E — Priority Pass" },
  { id: "l-delta-sky",   label: "Delta Sky Club",              lat: 35.2248903, lon: -80.9477933, detail: "Concourse A (far north)" },
  { id: "l-the-club",    label: "The Club CLT",                lat: 35.2215709, lon: -80.9466962, detail: "Terminal Lobby — Priority Pass" },
  { id: "l-uptown-bar",  label: "Uptown Bar & Lounge",         lat: 35.2201769, lon: -80.9473042, detail: "Concourse A" },
  { id: "l-red-star",    label: "Red Star Lounge",             lat: 35.2181194, lon: -80.9452104, detail: "Concourse B — Priority Pass" },
];
