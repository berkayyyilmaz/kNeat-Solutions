import React, { useState } from "react";

const ProductTabs = ({ product, className = "" }) => {
  const [activeTab, setActiveTab] = useState("description");

  if (!product) {
    return null;
  }

  // Tab içeriklerini oluştur
  const getTabContents = () => {
    return {
      description: {
        title: "Açıklama",
        content:
          product.description ||
          "Bu ürün için detaylı açıklama henüz eklenmemiştir.",
      },
      additionalInfo: {
        title: "Ek Bilgiler",
        content: [
          { label: "Ürün ID", value: product.id },
          {
            label: "Stok Durumu",
            value: `${product.stock} adet mevcut`,
          },
          { label: "Kategori ID", value: product.category_id },
          { label: "Mağaza ID", value: product.store_id },
          {
            label: "Satış Sayısı",
            value: `${product.sell_count} adet satıldı`,
          },
        ],
      },
      reviews: {
        title: "Değerlendirmeler",
        content: `Bu ürün ${product.rating?.toFixed(1) || 0} yıldız puan almıştır. Henüz detaylı yorum bulunmamaktadır.`,
      },
    };
  };

  const tabContents = getTabContents();

  return (
    <div className={`mt-16 ${className}`}>
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <div className="flex justify-center space-x-8">
          {Object.entries(tabContents).map(([key, { title }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pb-4 text-lg font-medium transition-all duration-200 ${
                activeTab === key
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <p className="leading-relaxed text-gray-700">
              {tabContents.description.content}
            </p>
          </div>
        )}

        {activeTab === "additionalInfo" && (
          <div className="space-y-4">
            {tabContents.additionalInfo.content.map((item, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 border-b border-gray-200 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
              >
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-600">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="prose max-w-none">
            <p className="text-gray-700">{tabContents.reviews.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
