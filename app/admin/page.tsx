/** @format */

"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faCog,
  faSignOutAlt,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { MarketingForm } from "@/components/admin/MarketingForm";
import { TestimonialsList } from "@/components/admin/TestimonialsList";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "testimonials" | "settings" | "marketing"
  >("testimonials");

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Çıkış yapılırken bir hata oluştu:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Paneli</h1>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("testimonials")}
              className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm
                ${
                  activeTab === "testimonials"
                    ? "border-yellow-400 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Yorumlar
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm
                ${
                  activeTab === "settings"
                    ? "border-yellow-400 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Site Ayarları
            </button>

            <button
              onClick={() => setActiveTab("marketing")}
              className={`py-4 px-1 flex items-center border-b-2 font-medium text-sm
                ${
                  activeTab === "marketing"
                    ? "border-yellow-400 text-yellow-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
            >
              <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
              Pazarlama
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "testimonials" && <TestimonialsList />}
          {activeTab === "settings" && <SettingsForm />}
          {activeTab === "marketing" && <MarketingForm />}
        </div>
      </div>
    </div>
  );
}
