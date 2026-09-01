import { BusinessProfile } from "./types";

const PROFILE_KEY = "ruralbiz_profile";

export const SAMPLE_PROFILE: BusinessProfile = {
  name: "Anita Mondal",
  location: "Nadia District, West Bengal",
  businessType: "Dairy Farm",
  capital: 100000,
  monthlyRevenue: 150000,
  mainProduct: "Milk and dairy products",
  goal: "Increase revenue by 30%",
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
