/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faPlane,
  faClock,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSiteConfig } from "@/contexts/SiteConfigContext";

export const Services = () => {
  const siteConfig = useSiteConfig();

  const services = [
    {
      icon: faCar,
      title: "Şehir İçi Ulaşım",
      description:
        "Şehir içinde güvenli ve konforlu ulaşım için 7/24 hizmetinizdeyiz.",
    },
    {
      icon: faPlane,
      title: "Havalimanı Transferi",
      description:
        "Havalimanı transferleriniz için özel araçlarımızla hizmet veriyoruz.",
    },
    {
      icon: faClock,
      title: "7/24 Hizmet",
      description:
        "Günün her saati bize ulaşabilir, taksi hizmeti alabilirsiniz.",
    },
    {
      icon: faMapMarkedAlt,
      title: "Şehirler Arası Transfer",
      description:
        "Şehirler arası yolculuklarınız için konforlu ve güvenli transfer hizmeti.",
    },
  ];

  return (
    <section id="hizmetler" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-xl text-gray-600">
            {siteConfig.companyName} olarak sizlere sunduğumuz hizmetler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-yellow-400 text-4xl mb-4">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
