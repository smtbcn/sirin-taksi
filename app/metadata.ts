/** @format */

import { getSiteConfig } from "@/utils/siteConfig";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const config = getSiteConfig();

  const metadata: Metadata = {
    title: config.siteTitle,
    description: config.seo.description,
    keywords: config.seo.keywords,
    metadataBase: new URL(config.contact.website),
  };

  // Verification meta tags
  const verification: Record<string, string | string[]> = {};
  if (config.marketing.metaTags.googleSiteVerification) {
    verification.google = config.marketing.metaTags.googleSiteVerification;
  }
  if (config.marketing.metaTags.yandexVerification) {
    verification.yandex = config.marketing.metaTags.yandexVerification;
  }
  if (config.marketing.metaTags.microsoftVerification) {
    verification["msvalidate.01"] =
      config.marketing.metaTags.microsoftVerification;
  }
  if (Object.keys(verification).length > 0) {
    metadata.verification = verification;
  }

  // Other meta tags (Google Analytics and custom tags)
  const otherTags: Record<string, string | number | (string | number)[]> = {};

  if (config.marketing.googleAnalytics.measurementId) {
    otherTags["google-analytics"] =
      config.marketing.googleAnalytics.measurementId;
  }

  if (config.marketing.customHeadTags.length > 0) {
    otherTags["custom-tags"] = config.marketing.customHeadTags;
  }

  if (Object.keys(otherTags).length > 0) {
    metadata.other = otherTags;
  }

  return metadata;
}
