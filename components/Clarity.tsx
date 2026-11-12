"use client";

import { useEffect } from "react";
import { loadClarity } from "@/lib/clarity";

export function Clarity() {
  useEffect(() => {
    loadClarity();
  }, []);

  return null;
}
