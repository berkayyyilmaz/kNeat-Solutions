import React from "react";
import { Link } from "react-router-dom";

const CartDropdown = ({ cartSummary, onClose, className = "" }) => {
  const items = cartSummary?.items || [];

  return (
    <div
      className={`absolute right-0 z-50 mt-2 w-[360px] rounded-lg border border-gray-100 bg-white shadow-2xl ${className}`}
    >
      <div className="max-h-[380px] overflow-auto p-4">
        <div className="mb-3 text-sm font-semibold text-gray-900">
          Sepetim ({cartSummary?.totalItems || 0} Ürün)
        </div>

        {items.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            Sepetiniz boş
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <li
                key={`${item.product?.id}-${idx}`}
                className="flex gap-3 py-3"
              >
                <img
                  src={
                    item.product?.primaryImage ||
                    item.product?.image ||
                    "/api/placeholder/64/64"
                  }
                  alt={item.product?.name || item.product?.title}
                  className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {item.product?.name || item.product?.title}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {item.size ? `Beden: ${item.size}` : "Tek Ebat"} · Adet:{" "}
                    {item.count}
                  </div>
                  <div className="mt-1 text-sm font-bold text-gray-900">
                    ₺{(item.product?.price || 0) * (item.count || 0)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-100 p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="text-gray-600">Toplam</span>
          <span className="font-bold text-gray-900">
            ₺{(cartSummary?.totalAmount || 0).toFixed(2)}
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            to="/cart"
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Sepete Git
          </Link>
          <button
            className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            onClick={onClose}
          >
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
