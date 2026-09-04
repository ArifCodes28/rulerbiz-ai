import { BusinessProfile } from "./types";

const PROFILE_KEY = "ruralbiz_profile";

export const SAMPLE_PROFILE: BusinessProfile = {
  name: "Anita Mondal",
  businessName: "Mondal Garments & Tailoring",
  location: "Nadia District, West Bengal",
  businessType: "Garment Manufacturing / Tailoring Factory",

  yearsInOperation: 5,
  registrationType: "MSME Udyam Registered Proprietorship",
  gstStatus: "GST Registered",
  udyamStatus: "Udyam Registered",

  workersCount: 18,
  machineCount: 14,
  monthlyProductionCapacity: 4000,
  currentMonthlyProduction: 2800,
  capacityUtilization: 70,
  deliveryRadiusKm: 60,
  minimumOrderQuantity: 50,
  leadTimeDays: 7,

  products: ["Shirts", "School uniforms", "Factory workwear", "Custom garments"],

  capital: 100000,
  monthlyRevenue: 150000,
  b2bCustomerCount: 12,
  averageOrderSize: 25000,
  majorCustomerTypes: ["Schools", "Local factories", "Retailers"],
  targetCustomerSegments: [
    "Hotels",
    "Restaurants",
    "Hospitals",
    "Security agencies",
    "Corporate organizations",
  ],

  revenueGrowthTarget: 30,
  targetTimelineMonths: 12,
  mainObjective: "Acquire bulk and institutional enterprise customers",
  mainProduct: "Garments — shirts, uniforms & workwear",
  goal: "Increase revenue by 30% through bulk/institutional customers",
};

export function saveProfile(profile: BusinessProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadProfile(): BusinessProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BusinessProfile;
  } catch {
    return null;
  }
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROFILE_KEY);
}
