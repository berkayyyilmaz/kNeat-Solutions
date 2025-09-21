import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";

// Hook olarak export ediyoruz çünkü navigation logic state'e ihtiyaç duyuyor
export const useProductNavigation = () => {
  const history = useHistory();
  const { categories } = useSelector((state) => state.products);

  // Ürün adından slug oluştur
  const createSlug = (text) => {
    return text
      ?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Özel karakterleri kaldır
      .replace(/\s+/g, "-") // Boşlukları tire ile değiştir
      .replace(/-+/g, "-") // Birden fazla tireyi tek tire yap
      .trim();
  };

  const navigateToProduct = ({
    id,
    title,
    department,
    gender,
    categoryName,
    categoryId,
    product,
  }) => {
    window.scrollTo(0, 0);

    // URL parametrelerini belirle
    let urlGender = gender;
    let urlCategoryName = categoryName;
    let urlCategoryId = categoryId;

    // Eğer URL parametreleri yoksa ürün verisinden al
    if (!urlGender || !urlCategoryName || !urlCategoryId) {
      if (product) {
        // Önce ürünün category objesi varsa onu kullan
        if (product.category) {
          urlCategoryId = product.category.id;
          urlCategoryName = createSlug(product.category.title);
          urlGender = product.category.gender || "k";
        }
        // Eğer category objesi yoksa category_id veya categoryId ile categories listesinden bul
        else if (product.category_id || product.categoryId) {
          const rawCategoryId = product.category_id || product.categoryId;
          if (categories.length > 0) {
            const category = categories.find((cat) => cat.id === rawCategoryId);
            if (category) {
              urlCategoryId = category.id;
              urlCategoryName = createSlug(category.title);
              urlGender = category.gender || "k";
            }
          } else {
            // Kategoriler henüz yüklenmemişse varsayılan değerler kullan
            urlCategoryId = rawCategoryId;
            urlCategoryName = createSlug(department || "genel");
            urlGender = "k"; // varsayılan
          }
        }
      }
    }

    // Yeni URL formatına navigate et
    if (urlGender && urlCategoryName && urlCategoryId) {
      const productSlug = createSlug(title);
      history.push(
        `/shop/${urlGender}/${urlCategoryName}/${urlCategoryId}/${productSlug}/${id}`,
      );
    } else {
      // Son fallback - eski format
      history.push(`/product/${id}`);
    }
  };

  return {
    navigateToProduct,
    createSlug,
  };
};

// Utility component olarak da export edebiliriz
const ProductNavigation = ({ children, navigationProps }) => {
  const { navigateToProduct } = useProductNavigation();

  const handleClick = () => {
    navigateToProduct(navigationProps);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default ProductNavigation;
