/**
 * Data Factory Patterns
 * Consistent data creation ve transformation için factory pattern'ları
 */

import {
  ProductModel,
  CategoryModel,
  UserModel,
  StoreModel,
  CartItemModel,
  OrderModel,
  DataTransformers,
} from "./dataModels";

/**
 * Product Factory
 * Farklı kaynaklardan product data'sını standardize eder
 */
export class ProductFactory {
  /**
   * API response'dan ProductModel oluştur
   */
  static fromApiResponse(apiData) {
    if (!apiData) return null;

    // Normalize edilmiş API response
    const normalized = DataTransformers.normalizeApiResponse(apiData);

    return new ProductModel(normalized);
  }

  /**
   * ProductCard için legacy format'tan ProductModel oluştur
   */
  static fromLegacyCardFormat(legacyData) {
    if (!legacyData) return null;

    return new ProductModel({
      id: legacyData.id,
      name: legacyData.title || legacyData.name,
      images: legacyData.image ? [legacyData.image] : legacyData.images || [],
      price: legacyData.price,
      oldPrice: legacyData.oldPrice,
      rating: legacyData.rating || 0,
      colors: legacyData.colors || [],
      department: legacyData.department,
      category: legacyData.category,
      //  Handle API image data format
      primaryImage: legacyData.primaryImage,
      uiImage: legacyData.uiImage,
      // Legacy product object'ini preserve et
      ...legacyData.product,
    });
  }

  /**
   * Mock product data oluştur (testing/development için)
   */
  static createMockProduct(overrides = {}) {
    const mockId = overrides.id || Math.random().toString(36).substr(2, 9);

    return new ProductModel({
      id: mockId,
      name: `Mock Product ${mockId}`,
      description: "Mock product description for testing purposes",
      price: Math.floor(Math.random() * 1000) + 50,
      oldPrice: Math.floor(Math.random() * 200) + 100,
      images: [
        `/api/placeholder/400/400?text=Product${mockId}`,
        `/api/placeholder/400/400?text=Product${mockId}-2`,
      ],
      rating: Math.floor(Math.random() * 5) + 1,
      stock: Math.floor(Math.random() * 100) + 1,
      sellCount: Math.floor(Math.random() * 500),
      categoryId: Math.floor(Math.random() * 10) + 1,
      department: ["men", "women", "kids"][Math.floor(Math.random() * 3)],
      colors: ["red", "blue", "green", "black", "white"].slice(
        0,
        Math.floor(Math.random() * 3) + 1,
      ),
      sizes: ["S", "M", "L", "XL"].slice(0, Math.floor(Math.random() * 4) + 1),
      brand: `Brand ${mockId}`,
      isNew: Math.random() > 0.8,
      isFeatured: Math.random() > 0.9,
      ...overrides,
    });
  }

  /**
   * Bulk product list oluştur
   */
  static fromApiResponseList(apiDataList = []) {
    return apiDataList
      .map((item) => this.fromApiResponse(item))
      .filter(Boolean);
  }

  /**
   * Product search sonuçları için optimize edilmiş format
   */
  static fromSearchResults(searchData) {
    if (!searchData || !searchData.products) return [];

    return searchData.products.map((product) => this.fromApiResponse(product));
  }

  /**
   * Featured products için factory
   */
  static createFeaturedProducts(apiData) {
    const products = this.fromApiResponseList(apiData);
    return products.filter((product) => product.isFeatured);
  }

  /**
   * Bestseller products için factory
   */
  static createBestsellerProducts(apiData) {
    const products = this.fromApiResponseList(apiData);
    return products.sort((a, b) => b.sellCount - a.sellCount);
  }

  /**
   * Sale products için factory
   */
  static createSaleProducts(apiData) {
    const products = this.fromApiResponseList(apiData);
    return products.filter((product) => product.hasDiscount);
  }
}

/**
 * Category Factory
 */
export class CategoryFactory {
  /**
   * API response'dan CategoryModel oluştur
   */
  static fromApiResponse(apiData) {
    if (!apiData) return null;

    const normalized = DataTransformers.normalizeApiResponse(apiData);
    return new CategoryModel(normalized);
  }

  /**
   * Category list oluştur
   */
  static fromApiResponseList(apiDataList = []) {
    return apiDataList
      .map((item) => this.fromApiResponse(item))
      .filter(Boolean);
  }

  /**
   * Hierarchical category tree oluştur
   */
  static createCategoryTree(apiDataList = []) {
    const categories = this.fromApiResponseList(apiDataList);
    const categoryMap = new Map();
    const rootCategories = [];

    // Map oluştur
    categories.forEach((category) => {
      categoryMap.set(category.id, { ...category, children: [] });
    });

    // Tree structure oluştur
    categories.forEach((category) => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(categoryMap.get(category.id));
        }
      } else {
        rootCategories.push(categoryMap.get(category.id));
      }
    });

    return rootCategories;
  }

  /**
   * Gender-based categories
   */
  static createGenderCategories(apiDataList, gender) {
    const categories = this.fromApiResponseList(apiDataList);
    return categories.filter(
      (category) => !category.gender || category.gender === gender,
    );
  }

  /**
   * Mock category oluştur
   */
  static createMockCategory(overrides = {}) {
    const mockId = overrides.id || Math.random().toString(36).substr(2, 9);

    return new CategoryModel({
      id: mockId,
      title: `Mock Category ${mockId}`,
      code: `mock-category-${mockId}`,
      rating: Math.floor(Math.random() * 5) + 1,
      gender: ["men", "women", "kids", ""][Math.floor(Math.random() * 4)],
      img: `/api/placeholder/300/200?text=Category${mockId}`,
      ...overrides,
    });
  }
}

/**
 * User Factory
 */
export class UserFactory {
  /**
   * API response'dan UserModel oluştur
   */
  static fromApiResponse(apiData) {
    if (!apiData) return null;

    const normalized = DataTransformers.normalizeApiResponse(apiData);
    return new UserModel(normalized);
  }

  /**
   * Auth response'dan user oluştur
   */
  static fromAuthResponse(authData) {
    if (!authData || !authData.user) return null;

    return this.fromApiResponse(authData.user);
  }

  /**
   * JWT token payload'dan user oluştur
   */
  static fromTokenPayload(tokenPayload) {
    if (!tokenPayload) return null;

    return new UserModel({
      id: tokenPayload.sub || tokenPayload.userId,
      name: tokenPayload.name,
      email: tokenPayload.email,
      roleId: tokenPayload.roleId,
    });
  }

  /**
   * Form data'dan user oluştur
   */
  static fromFormData(formData) {
    if (!formData) return null;

    return new UserModel({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      roleId: formData.role_id || formData.roleId,
      store: formData.store_name
        ? {
            name: formData.store_name,
            phone: formData.store_phone,
            taxNo: formData.tax_no,
            bankAccount: formData.bank_account,
          }
        : null,
    });
  }
}

/**
 * Cart Factory
 */
export class CartFactory {
  /**
   * Cart item oluştur
   */
  static createCartItem(product, options = {}) {
    if (!product) return null;

    // ProductModel instance'a çevir
    const productModel =
      product instanceof ProductModel
        ? product
        : ProductFactory.fromApiResponse(product);

    return new CartItemModel({
      productId: productModel.id,
      product: productModel,
      quantity: options.quantity || 1,
      size: options.size || null,
      color: options.color || null,
    });
  }

  /**
   * API response'dan cart items oluştur
   */
  static fromApiResponseList(apiDataList = []) {
    return apiDataList
      .map((item) => {
        const product = item.product
          ? ProductFactory.fromApiResponse(item.product)
          : null;

        return new CartItemModel({
          id: item.id,
          productId: item.product_id || item.productId,
          product: product,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          addedAt: item.added_at || item.addedAt,
        });
      })
      .filter(Boolean);
  }

  /**
   * localStorage'dan cart restore et
   */
  static fromLocalStorage(storageData) {
    try {
      const parsed =
        typeof storageData === "string" ? JSON.parse(storageData) : storageData;
      if (!Array.isArray(parsed)) return [];

      return parsed
        .map((item) => new CartItemModel(item))
        .filter((item) => item.isValid());
    } catch (error) {
      return [];
    }
  }
}

/**
 * Order Factory
 */
export class OrderFactory {
  /**
   * API response'dan OrderModel oluştur
   */
  static fromApiResponse(apiData) {
    if (!apiData) return null;

    const normalized = DataTransformers.normalizeApiResponse(apiData);

    // Cart items'ı transform et
    const items = normalized.items
      ? CartFactory.fromApiResponseList(normalized.items)
      : [];

    return new OrderModel({
      ...normalized,
      items: items,
    });
  }

  /**
   * Cart'tan order oluştur
   */
  static fromCart(cartItems, orderData = {}) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return null;

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );

    return new OrderModel({
      items: cartItems,
      totalAmount: totalAmount,
      status: "pending",
      ...orderData,
    });
  }

  /**
   * Order list oluştur
   */
  static fromApiResponseList(apiDataList = []) {
    return apiDataList
      .map((item) => this.fromApiResponse(item))
      .filter(Boolean);
  }
}

/**
 * Data State Factory
 * Redux state'ler için factory
 */
export class DataStateFactory {
  /**
   * Product list state oluştur
   */
  static createProductListState(apiResponse) {
    const products = ProductFactory.fromApiResponseList(
      apiResponse.products || apiResponse,
    );
    const pagination = DataTransformers.createPaginationInfo(apiResponse);

    return {
      products: products,
      pagination: pagination,
      loading: false,
      error: null,
    };
  }

  /**
   * Category list state oluştur
   */
  static createCategoryListState(apiResponse) {
    const categories = CategoryFactory.fromApiResponseList(
      apiResponse.categories || apiResponse,
    );

    return {
      categories: categories,
      categoriesTree: CategoryFactory.createCategoryTree(categories),
      loading: false,
      error: null,
    };
  }

  /**
   * User state oluştur
   */
  static createUserState(apiResponse) {
    const user = UserFactory.fromApiResponse(apiResponse);

    return {
      user: user,
      isAuthenticated: !!user,
      loading: false,
      error: null,
    };
  }

  /**
   * Cart state oluştur
   */
  static createCartState(cartItems = []) {
    const items = Array.isArray(cartItems) ? cartItems : [];
    const totalAmount = items.reduce(
      (total, item) => total + item.totalPrice,
      0,
    );
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return {
      items: items,
      totalAmount: totalAmount,
      itemCount: itemCount,
      loading: false,
      error: null,
    };
  }
}

/**
 * API Response Validator
 * API response'larının beklenen format'ta olup olmadığını kontrol eder
 */
export class ApiResponseValidator {
  /**
   * Product API response validate et
   */
  static validateProductResponse(response) {
    if (!response)
      return { isValid: false, errors: ["Response is null or undefined"] };

    const errors = [];

    if (Array.isArray(response)) {
      // Product list response
      response.forEach((product, index) => {
        if (!product.id) errors.push(`Product at index ${index} missing id`);
        if (!product.name && !product.title)
          errors.push(`Product at index ${index} missing name/title`);
        if (product.price === undefined || product.price === null)
          errors.push(`Product at index ${index} missing price`);
      });
    } else {
      // Single product response
      if (!response.id) errors.push("Product missing id");
      if (!response.name && !response.title)
        errors.push("Product missing name/title");
      if (response.price === undefined || response.price === null)
        errors.push("Product missing price");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * Category API response validate et
   */
  static validateCategoryResponse(response) {
    if (!response)
      return { isValid: false, errors: ["Response is null or undefined"] };

    const errors = [];
    const categories = Array.isArray(response) ? response : [response];

    categories.forEach((category, index) => {
      if (!category.id) errors.push(`Category at index ${index} missing id`);
      if (!category.title && !category.name)
        errors.push(`Category at index ${index} missing title/name`);
    });

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  /**
   * User API response validate et
   */
  static validateUserResponse(response) {
    if (!response)
      return { isValid: false, errors: ["Response is null or undefined"] };

    const errors = [];

    if (!response.id) errors.push("User missing id");
    if (!response.name) errors.push("User missing name");
    if (!response.email) errors.push("User missing email");

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}

export default {
  ProductFactory,
  CategoryFactory,
  UserFactory,
  CartFactory,
  OrderFactory,
  DataStateFactory,
  ApiResponseValidator,
};
