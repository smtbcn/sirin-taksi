/** @format */

"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const MarketingForm = () => {
  const siteConfig = useSiteConfig();
  const [marketing, setMarketing] = useState(siteConfig.marketing);
  const [customTag, setCustomTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ marketing }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Pazarlama ayarları başarıyla güncellendi");
      } else {
        setError(data.error || "Ayarlar güncellenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCustomTag = () => {
    if (customTag.trim()) {
      setMarketing({
        ...marketing,
        customHeadTags: [...marketing.customHeadTags, customTag.trim()],
      });
      setCustomTag("");
    }
  };

  const removeCustomTag = (index: number) => {
    setMarketing({
      ...marketing,
      customHeadTags: marketing.customHeadTags.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {message && (
        <div className="p-4 bg-green-50 text-green-600 rounded-md">
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>
      )}

      {/* Google Ads */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Google Ads Ayarları</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conversion ID
            </label>
            <input
              type="text"
              value={marketing.googleAds.conversionId}
              onChange={(e) =>
                setMarketing({
                  ...marketing,
                  googleAds: {
                    ...marketing.googleAds,
                    conversionId: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conversion Label
            </label>
            <input
              type="text"
              value={marketing.googleAds.conversionLabel}
              onChange={(e) =>
                setMarketing({
                  ...marketing,
                  googleAds: {
                    ...marketing.googleAds,
                    conversionLabel: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarketing ID
            </label>
            <input
              type="text"
              value={marketing.googleAds.remarketingId}
              onChange={(e) =>
                setMarketing({
                  ...marketing,
                  googleAds: {
                    ...marketing.googleAds,
                    remarketingId: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Google Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          Google Analytics Ayarları
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Measurement ID
          </label>
          <input
            type="text"
            value={marketing.googleAnalytics.measurementId}
            onChange={(e) =>
              setMarketing({
                ...marketing,
                googleAnalytics: {
                  measurementId: e.target.value,
                },
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
      </div>

      {/* Meta Tags */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Meta Tag Doğrulamaları</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Site Verification
            </label>
            <input
              type="text"
              value={marketing.metaTags.googleSiteVerification}
              onChange={(e) =>
                setMarketing({
                  ...marketing,
                  metaTags: {
                    ...marketing.metaTags,
                    googleSiteVerification: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Microsoft Verification
            </label>
            <input
              type="text"
              value={marketing.metaTags.microsoftVerification}
              onChange={(e) =>
                setMarketing({
                  ...marketing,
                  metaTags: {
                    ...marketing.metaTags,
                    microsoftVerification: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yandex Verification
            </label>
            <input
              type="text"
              value={marketing.metaTags.yandexVerification}
              onChange={(e) =>
                setMarketing({
                  ...marketing,
                  metaTags: {
                    ...marketing.metaTags,
                    yandexVerification: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
          </div>
        </div>
      </div>

      {/* Custom Head Tags */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Özel Head Etiketleri</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="<meta name='...' content='...'>"
              className="flex-1 px-4 py-2 border rounded-md focus:ring-yellow-400 focus:border-yellow-400"
            />
            <button
              type="button"
              onClick={addCustomTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Ekle
            </button>
          </div>
          <div className="space-y-2">
            {marketing.customHeadTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <code className="text-sm">{tag}</code>
                <button
                  type="button"
                  onClick={() => removeCustomTag(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold
                   hover:bg-yellow-500 transition-colors duration-300 flex items-center
                   ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
};
