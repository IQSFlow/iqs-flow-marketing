import type { Amenity } from "./clt-amenities";
import { CLT_RESTROOMS, CLT_LOUNGES } from "./clt-amenities";
import { ATL_RESTROOMS, ATL_LOUNGES } from "./atl-amenities";
import { JFK_RESTROOMS, JFK_LOUNGES } from "./jfk-amenities";

interface AirportAmenities {
  restrooms: Amenity[];
  lounges: Amenity[];
}

const AMENITY_REGISTRY: Record<string, AirportAmenities> = {
  CLT: { restrooms: CLT_RESTROOMS, lounges: CLT_LOUNGES },
  ATL: { restrooms: ATL_RESTROOMS, lounges: ATL_LOUNGES },
  JFK: { restrooms: JFK_RESTROOMS, lounges: JFK_LOUNGES },
};

const EMPTY: AirportAmenities = { restrooms: [], lounges: [] };

export function getAirportAmenities(iataCode: string): AirportAmenities {
  return AMENITY_REGISTRY[iataCode] ?? EMPTY;
}

export function getAllAmenitiesForAirports(iataCodes: string[]): AirportAmenities {
  const restrooms: Amenity[] = [];
  const lounges: Amenity[] = [];
  for (const code of iataCodes) {
    const a = AMENITY_REGISTRY[code];
    if (a) {
      restrooms.push(...a.restrooms);
      lounges.push(...a.lounges);
    }
  }
  return { restrooms, lounges };
}

export type { Amenity };
