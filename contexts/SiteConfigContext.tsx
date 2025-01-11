/** @format */

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { SiteConfig } from "@/utils/siteConfig";

type SafeSiteConfig = Omit<SiteConfig, "adminPassword">;

const SiteConfigContext = createContext<SafeSiteConfig | null>(null);

export function SiteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<SafeSiteConfig | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Site ayarları yüklenemedi:", error);
      }
    };

    fetchConfig();
  }, []);

  if (!config) {
    return null; // veya bir loading component
  }

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}
