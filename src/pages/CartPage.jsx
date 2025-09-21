import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContent from "../layout/PageContent";
import {
  incrementCartItem,
  decrementCartItem,
  removeFromCart,
  toggleCartItem,
} from "../redux/actions/shoppingCartActions";

const TableHeaderCell = ({ children }) => (
  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
    {children}
  </th>
);

const QuantityControl = ({ value, onDecrement, onIncrement }) => (
  <div className="inline-flex items-center rounded-md border border-gray-200">
    <button
      onClick={onDecrement}
      className="h-9 w-9 select-none text-lg leading-none text-gray-700 hover:bg-gray-50"
    >
      −
    </button>
    <div className="min-w-[40px] text-center text-sm font-medium">{value}</div>
    <button
      onClick={onIncrement}
      className="h-9 w-9 select-none text-lg leading-none text-gray-700 hover:bg-gray-50"
    >
      +
    </button>
  </div>
);

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);

  const formatCurrency = (value) => `₺${Number(value || 0).toFixed(2)}`;

  const totals = useMemo(() => {
    const selected = cart.filter((i) => i.checked);
    const productsTotal = selected.reduce(
      (s, i) => s + (i.count || 0) * (i.product?.price || 0),
      0,
    );
    const totalQuantity = selected.reduce((s, i) => s + (i.count || 0), 0);

    // Basit kargo/indirim kuralı: 150₺ ve üzeri ücretsiz kargo
    const shippingBase = productsTotal > 0 ? 29.99 : 0;
    const discount = productsTotal >= 150 ? shippingBase : 0;
    const shipping = shippingBase;
    const grandTotal = productsTotal + shipping - discount;
    return { totalQuantity, productsTotal, shipping, discount, grandTotal };
  }, [cart]);

  const handleIncrement = (item) =>
    dispatch(
      incrementCartItem({
        productId: item.product?.id,
        size: item.size ?? null,
        color: item.color ?? null,
        step: 1,
      }),
    );

  const handleDecrement = (item) =>
    dispatch(
      decrementCartItem({
        productId: item.product?.id,
        size: item.size ?? null,
        color: item.color ?? null,
        step: 1,
      }),
    );

  const handleRemove = (item) =>
    dispatch(
      removeFromCart({
        productId: item.product?.id,
        size: item.size ?? null,
        color: item.color ?? null,
      }),
    );

  const handleToggle = (item) =>
    dispatch(
      toggleCartItem({
        productId: item.product?.id,
        size: item.size ?? null,
        color: item.color ?? null,
      }),
    );

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Sepetim</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left - Cart Table */}
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeaderCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={cart.length > 0 && cart.every((i) => i.checked)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        cart.forEach((i) => {
                          if (i.checked !== checked) handleToggle(i);
                        });
                      }}
                    />
                  </TableHeaderCell>
                  <TableHeaderCell>Ürün</TableHeaderCell>
                  <TableHeaderCell>Fiyat</TableHeaderCell>
                  <TableHeaderCell>Adet</TableHeaderCell>
                  <TableHeaderCell>Tutar</TableHeaderCell>
                  <TableHeaderCell>Aksiyon</TableHeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-gray-500">
                      Sepetiniz boş
                    </td>
                  </tr>
                ) : (
                  cart.map((item, idx) => (
                    <tr
                      key={`${item.product?.id}-${idx}`}
                      className="align-middle"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={!!item.checked}
                          onChange={() => handleToggle(item)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              item.product?.primaryImage ||
                              item.product?.image ||
                              "/api/placeholder/64/64"
                            }
                            alt={item.product?.name || item.product?.title}
                            className="h-16 w-16 flex-shrink-0 rounded-md object-cover"
                          />
                          <div>
                            <div className="max-w-[420px] truncate font-medium text-gray-900">
                              {item.product?.name || item.product?.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.size ? `Beden: ${item.size}` : "Tek Ebat"}
                              {item.color ? ` · Renk: ${item.color}` : ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        ₺
                        {item.product?.price?.toFixed
                          ? item.product.price.toFixed(2)
                          : item.product?.price || 0}
                      </td>
                      <td className="px-4 py-3">
                        <QuantityControl
                          value={item.count}
                          onDecrement={() => handleDecrement(item)}
                          onIncrement={() => handleIncrement(item)}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">
                        ₺
                        {(
                          (item.product?.price || 0) * (item.count || 0)
                        ).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleRemove(item)}
                          className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          Kaldır
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Right - Order Summary */}
          <aside className="h-fit rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Sipariş Özeti</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ürünlerin Toplamı</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(totals.productsTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Kargo Toplam</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(totals.shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">İndirim</span>
                <span className="font-semibold text-green-600">
                  - {formatCurrency(totals.discount)}
                </span>
              </div>
              <div className="my-2 border-t border-gray-100"></div>
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-gray-900">Toplam</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(totals.grandTotal)}
                </span>
              </div>
            </div>

            <button
              className="mt-5 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              type="button"
            >
              Siparişi Oluştur
            </button>
          </aside>
        </div>
      </div>
    </PageContent>
  );
}
