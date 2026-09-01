"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeBusiness } from "./analysis";
import { loadProfile } from "./storage";
import { BusinessAnalysis, BusinessProfile } from "./types";

export function useBusiness(): {
  profile: BusinessProfile | null;
  analysis: BusinessAnalysis | null;
} {
  const router = useRouter();
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [analysis, setAnalysis] = useState<BusinessAnalysis | null>(null);

  useEffect(() => {
    const p = loadProfile();
    if (!p) {
      router.replace("/onboarding");
      return;
    }
    setProfile(p);
    setAnalysis(analyzeBusiness(p));
  }, [router]);

  return { profile, analysis };
}
