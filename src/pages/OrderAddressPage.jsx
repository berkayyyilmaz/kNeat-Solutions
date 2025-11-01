import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../redux/actions/addressActions";
import { useHistory } from "react-router-dom"; // React Router v5 için
import SecureStorage from "../utils/secureStorage";

const OrderAddressPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addresses, loading, error } = useSelector((state) => state.address);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
  });

  useEffect(() => {
    if (!SecureStorage.getToken()) {
      history.push("/login");
    } else {
      dispatch(getAddresses());
    }
  }, [dispatch, history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAddress = () => {
    setCurrentAddress(null);
    setFormData({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
      address: "",
    });
    setShowAddressForm(true);
  };

  const handleEditAddress = (address) => {
    setCurrentAddress(address);
    setFormData({
      title: address.title || "",
      name: address.name || "",
      surname: address.surname || "",
      phone: address.phone || "",
      city: address.city || "",
      district: address.district || "",
      neighborhood: address.neighborhood || "",
      address: address.address || "",
    });
    setShowAddressForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentAddress) {
      dispatch(updateAddress({ ...formData, id: currentAddress.id }));
    } else {
      dispatch(addAddress(formData));
    }
    setShowAddressForm(false);
  };

  const handleDelete = (addressId) => {
    if (window.confirm("Bu adresi silmek istediğinizden emin misiniz?")) {
      dispatch(deleteAddress(addressId));
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Adres Bilgileri</h2>

      <div className="mb-4">
        <button
          onClick={handleAddAddress}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Yeni Adres Ekle
        </button>
      </div>

      {showAddressForm && (
        <div className="mb-8 rounded border p-4 shadow">
          <h3 className="mb-4 text-xl font-semibold">
            {currentAddress ? "Adresi Düzenle" : "Yeni Adres Ekle"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <input
              type="text"
              name="title"
              placeholder="Adres Başlığı (Ev, İş vb.)"
              value={formData.title}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Adı"
              value={formData.name}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="Soyadı"
              value={formData.surname}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon (örn: 05xx xxx xx xx)"
              value={formData.phone}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="Şehir"
              value={formData.city}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <input
              type="text"
              name="district"
              placeholder="İlçe"
              value={formData.district}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <input
              type="text"
              name="neighborhood"
              placeholder="Mahalle"
              value={formData.neighborhood}
              onChange={handleInputChange}
              className="rounded border p-2"
              required
            />
            <textarea
              name="address"
              placeholder="Adres Detayları (Sokak, Bina No, Daire No)"
              value={formData.address}
              onChange={handleInputChange}
              className="col-span-full rounded border p-2"
              rows="3"
              required
            ></textarea>
            <div className="col-span-full flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddressForm(false)}
                className="rounded bg-gray-300 px-4 py-2 text-gray-800"
              >
                İptal
              </button>
              <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 text-white"
              >
                {currentAddress ? "Güncelle" : "Kaydet"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.length === 0 ? (
          <p className="col-span-full">
            Henüz kayıtlı adresiniz bulunmamaktadır.
          </p>
        ) : (
          addresses.map((address) => (
            <div
              key={address.id}
              className="flex flex-col justify-between rounded border p-4 shadow-sm"
            >
              <div>
                <h4 className="mb-2 text-lg font-bold">{address.title}</h4>
                <p>
                  {address.name} {address.surname}
                </p>
                <p>{address.phone}</p>
                <p>
                  {address.neighborhood}, {address.district}/{address.city}
                </p>
                <p>{address.address}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleEditAddress(address)}
                  className="rounded bg-yellow-500 px-3 py-1 text-sm text-white"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderAddressPage;
