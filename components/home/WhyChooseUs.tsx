/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faShieldHalved,
  faUserTie,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faClock,
    title: "7/24 Hizmet",
    description:
      "Günün her saati hizmetinizdeyiz. Gece gündüz demeden güvenli ulaşım sağlıyoruz.",
  },
  {
    icon: faShieldHalved,
    title: "Güvenli Seyahat",
    description:
      "Düzenli bakımlı araçlar ve profesyonel sürücülerle güvenliğiniz önceliğimiz.",
  },
  {
    icon: faUserTie,
    title: "Profesyonel Ekip",
    description:
      "Deneyimli ve güler yüzlü sürücülerimizle konforlu yolculuk garantisi.",
  },
  {
    icon: faMoneyBill,
    title: "Uygun Fiyat",
    description: "Rekabetçi fiyatlarla kaliteli hizmet sunuyoruz.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section id="neden-biz" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Neden Bizi Seçmelisiniz?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kırklareli'nin en güvenilir taksi hizmeti olarak sizlere en iyi
            deneyimi yaşatmak için çalışıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-yellow-400 text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
