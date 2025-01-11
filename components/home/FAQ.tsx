/** @format */

"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    question: "Taksi ücretleri nasıl hesaplanır?",
    answer:
      "Taksi ücretleri, mesafe ve süreye bağlı olarak taksimetre ile hesaplanır. Gece ve gündüz tarifeleri farklılık gösterebilir.",
  },
  {
    question: "Havalimanı transferi için önceden rezervasyon gerekli mi?",
    answer:
      "Havalimanı transferleri için en az 1 gün önceden rezervasyon yapmanızı öneririz. Böylece size en uygun aracı tahsis edebiliriz.",
  },
  {
    question: "7/24 hizmet veriyor musunuz?",
    answer:
      "Evet, 7 gün 24 saat kesintisiz hizmet veriyoruz. İstediğiniz saatte bizi arayabilirsiniz.",
  },
  {
    question: "Ödeme seçenekleri nelerdir?",
    answer:
      "Nakit, kredi kartı ve banka kartı ile ödeme yapabilirsiniz. Bazı araçlarımızda mobil POS cihazı bulunmaktadır.",
  },
  {
    question: "Şehirler arası yolculuk yapıyor musunuz?",
    answer:
      "Evet, şehirler arası yolculuk hizmeti veriyoruz. Fiyat bilgisi için bizi arayabilirsiniz.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sık Sorulan Sorular
          </h2>
          <p className="text-xl text-gray-600">
            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <FontAwesomeIcon
                  icon={openIndex === index ? faChevronUp : faChevronDown}
                  className="w-5 h-5 text-gray-500"
                />
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
