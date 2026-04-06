// Inline until Artifact Registry auth configured in Docker builds
export const INDUSTRY_TYPES = ["AIRPORT", "SCHOOL", "HOSPITAL", "GOVERNMENT", "GENERAL"] as const;
export type IndustryType = (typeof INDUSTRY_TYPES)[number];

export const INDUSTRY_LABELS: Record<IndustryType, string> = {
  AIRPORT: "Airport",
  SCHOOL: "School",
  HOSPITAL: "Hospital",
  GOVERNMENT: "Government Building",
  GENERAL: "General Facility",
};

export const ZONE_TYPES: Record<IndustryType, string[]> = {
  AIRPORT: ["terminal", "concourse", "gate_area", "restroom", "food_court", "baggage_claim", "checkpoint"],
  SCHOOL: ["classroom", "cafeteria", "gymnasium", "library", "restroom", "office", "playground", "auditorium"],
  HOSPITAL: ["patient_room", "operating_room", "icu", "waiting_room", "nurses_station", "lab", "pharmacy", "cafeteria"],
  GOVERNMENT: ["office", "lobby", "conference_room", "restroom", "security_checkpoint", "archive", "courtroom", "public_counter"],
  GENERAL: ["floor", "room", "restroom", "breakroom", "lobby", "storage", "parking"],
};

export const INDUSTRY_COMPLIANCE_LABELS: Record<IndustryType, string> = {
  AIRPORT: "FAA / TSA Compliance",
  SCHOOL: "District Standards Compliance",
  HOSPITAL: "Joint Commission Readiness",
  GOVERNMENT: "GSA / Federal Standards",
  GENERAL: "Compliance Status",
};
