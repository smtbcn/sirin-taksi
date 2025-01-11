/** @format */

import fs from "fs";
import path from "path";

export interface SiteConfig {
  adminPassword: string;
  companyName: string;
  siteTitle: string;
  companySlogan: string;
  companyDescription: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    website: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    whatsapp: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  marketing: {
    googleAds: {
      conversionId: string;
      conversionLabel: string;
      remarketingId: string;
    };
    googleAnalytics: {
      measurementId: string;
    };
    metaTags: {
      googleSiteVerification: string;
      microsoftVerification: string;
      yandexVerification: string;
    };
    customHeadTags: string[];
  };
}

const configFile = path.join(process.cwd(), "data", "siteConfig.json");

// Site ayarlarını okuma
export const getSiteConfig = (): SiteConfig => {
  try {
    const fileContents = fs.readFileSync(configFile, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Site ayarları okunamadı:", error);
    throw error;
  }
};

// Site ayarlarını güncelleme
export const updateSiteConfig = (updates: Partial<SiteConfig>): boolean => {
  try {
    const currentConfig = getSiteConfig();
    const newConfig = {
      ...currentConfig,
      ...updates,
    };

    // Şirket adı değiştiğinde site başlığını da güncelle
    if (
      updates.companyName &&
      updates.companyName !== currentConfig.companyName
    ) {
      newConfig.siteTitle = `${updates.companyName} - Kırklareli'nin Güvenilir Taksi Hizmeti`;
      newConfig.seo.title = `${updates.companyName} - Kırklareli Taksi Hizmeti`;
    }

    fs.writeFileSync(configFile, JSON.stringify(newConfig, null, 2), "utf8");

    return true;
  } catch (error) {
    console.error("Site ayarları güncellenemedi:", error);
    return false;
  }
};

// Admin şifresini kontrol etme
export const verifyAdminPassword = (password: string): boolean => {
  try {
    const config = getSiteConfig();
    return config.adminPassword === password;
  } catch {
    return false;
  }
};
