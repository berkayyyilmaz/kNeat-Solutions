import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import PageContent from "../layout/PageContent";
import { fetchProductDetail } from "../redux/actions/productActions";
import ProductImages from "../components/product/ProductImages";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import BestSeller from "../components/BestSeller";
import Clients from "../components/Clients";
import { addToCart } from "../redux/actions/shoppingCartActions";

export default function ProductDetailPage() {
  const { productId, id, gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, productDetailLoading, productDetailError } =
    useSelector((state) => state.products);

  // Redux ile ürün detayını getir
  useEffect(() => {
    const actualProductId = productId || id; // Yeni format'ta productId, eski format'ta id
    if (actualProductId) {
      dispatch(fetchProductDetail(actualProductId));
    }
  }, [dispatch, productId, id]);

  // Sepete ekleme fonksiyonu
  const handleAddToCart = (product, selectedSize) => {
    if (!product) return;
    dispatch(
      addToCart({
        product,
        size: selectedSize ?? null,
        count: 1,
      }),
    );
  };

  // Favorilere ekleme fonksiyonu
  const handleAddToWishlist = (product) => {
    // TODO: Redux action ile favorilere ekleme işlemi
  };

  // Hızlı görünüm fonksiyonu
  const handleQuickView = (product) => {
    // TODO: Modal açma işlemi
  };

  // Loading durumu
  if (productDetailLoading) {
    return (
      <PageContent>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-gray-600">Ürün detayı yükleniyor...</p>
          </div>
        </div>
      </PageContent>
    );
  }

  // Error durumu
  if (productDetailError || !currentProduct) {
    return (
      <PageContent>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Ürün Bulunamadı
            </h1>
            <p className="mb-8 text-gray-600">
              {productDetailError ||
                "Bu ürün mevcut değil veya kaldırılmış olabilir."}
            </p>
            <button
              onClick={() => window.history.back()}
              className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
            >
              Geri Dön
            </button>
          </div>
        </div>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sol Taraf - Ürün Görselleri */}
          <ProductImages
            images={currentProduct.images}
            productName={currentProduct.name}
          />

          {/* Sağ Taraf - Ürün Bilgileri */}
          <ProductInfo
            product={currentProduct}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onQuickView={handleQuickView}
          />
        </div>

        {/* Tab Section */}
        <ProductTabs product={currentProduct} />
      </div>
      <BestSeller />
      <Clients />
    </PageContent>
  );
}
