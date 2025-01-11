/** @format */

"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

interface SiteSettings {
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
}

export const SettingsForm = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings");
      const data = await response.json();

      if (response.ok) {
        setSettings(data);
      } else {
        setError("Ayarlar yüklenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bağlantı hatası oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);

    try {
      const updates = {
        ...settings,
        ...(newPassword && { adminPassword: newPassword }),
      };

      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Ayarlar başarıyla güncellendi");
        setNewPassword("");
      } else {
        setError(data.error || "Ayarlar güncellenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!settings) {
    return <div>Ayarlar yüklenemedi</div>;
  }

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

      {/* Şirket Bilgileri */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Şirket Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şirket Adı
            </label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Başlığı
            </label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) =>
                setSettings({ ...settings, siteTitle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slogan
            </label>
            <input
              type="text"
              value={settings.companySlogan}
              onChange={(e) =>
                setSettings({ ...settings, companySlogan: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Açıklama
            </label>
            <input
              type="text"
              value={settings.companyDescription}
              onChange={(e) =>
                setSettings({ ...settings, companyDescription: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="text"
              value={settings.contact.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, phone: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <input
              type="email"
              value={settings.contact.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, email: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adres
            </label>
            <input
              type="text"
              value={settings.contact.location}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, location: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={settings.contact.website}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, website: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="url"
              value={settings.socialMedia.facebook}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: {
                    ...settings.socialMedia,
                    facebook: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="url"
              value={settings.socialMedia.twitter}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: {
                    ...settings.socialMedia,
                    twitter: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="url"
              value={settings.socialMedia.instagram}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: {
                    ...settings.socialMedia,
                    instagram: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp
            </label>
            <input
              type="url"
              value={settings.socialMedia.whatsapp}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialMedia: {
                    ...settings.socialMedia,
                    whatsapp: e.target.value,
                  },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* SEO Ayarları */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">SEO Ayarları</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Başlığı
            </label>
            <input
              type="text"
              value={settings.seo.title}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, title: e.target.value },
                })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SEO Açıklaması
            </label>
            <textarea
              value={settings.seo.description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, description: e.target.value },
                })
              }
              rows={3}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anahtar Kelimeler
            </label>
            <textarea
              value={settings.seo.keywords}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, keywords: e.target.value },
                })
              }
              rows={3}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Admin Şifresi */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Admin Şifresi</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Yeni Şifre (Boş bırakırsanız değişmez)
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            minLength={6}
          />
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold
                   hover:bg-yellow-500 transition-colors duration-300 flex items-center
                   ${isSaving ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          {isSaving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
};
