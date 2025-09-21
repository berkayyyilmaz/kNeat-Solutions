/**
 * Centralized Data Models
 * Tüm projede kullanılacak ortak data structure'ları
 */

/**
 * Product Data Model
 * API'den gelen ve UI'da kullanılan product structure'ı
 */
export class ProductModel {
  constructor(data = {}) {
    // Core product fields (from API)
    this.id = data.id || null;
    this.name = data.name || data.title || "";
    this.description = data.description || "";
    this.price = data.price || 0;
    this.oldPrice = data.oldPrice || data.old_price || null;

    //  Handle both object and string image formats
    this.images =
      this._normalizeImages(data.images) || (data.image ? [data.image] : []);
    this.primaryImageData = data.primaryImage || null;
    this.uiImageData = data.uiImage || null;

    this.rating = data.rating || 0;
    this.stock = data.stock || 0;
    this.sellCount = data.sell_count || data.sellCount || 0;

    // Category and classification
    this.categoryId = data.category_id || data.categoryId || null;
    this.category = data.category || null;
    this.department = data.department || "";
    // Gender'ı önce direkt data'dan, sonra category objesinden al
    this.gender = data.gender || data.category?.gender || "";

    // Additional product details
    this.colors = data.colors || [];
    this.sizes = data.sizes || [];
    this.tags = data.tags || [];
    this.brand = data.brand || "";

    // Timestamps
    this.createdAt = data.created_at || data.createdAt || null;
    this.updatedAt = data.updated_at || data.updatedAt || null;

    // Status and availability
    this.isActive = data.is_active !== undefined ? data.is_active : true;
    this.isFeatured = data.is_featured !== undefined ? data.is_featured : false;
    this.isNew = data.is_new !== undefined ? data.is_new : false;
    this.isOnSale =
      data.is_on_sale !== undefined ? data.is_on_sale : !!this.oldPrice;
  }

  /**
   *  Normalize image data - handle both object and string formats
   */
  _normalizeImages(images) {
    if (!images) return [];

    if (Array.isArray(images)) {
      return images
        .map((img) => {
          if (typeof img === "string") return img;
          if (typeof img === "object" && img.url) return img.url;
          return null;
        })
        .filter(Boolean);
    }

    // Single image
    if (typeof images === "string") return [images];
    if (typeof images === "object" && images.url) return [images.url];

    return [];
  }

  /**
   * Get primary image URL
   */
  get primaryImage() {
    // Priority: uiImage > primaryImage > first image > fallback
    if (this.uiImageData && this.uiImageData.url) {
      return this.uiImageData.url;
    }

    if (this.primaryImageData && this.primaryImageData.url) {
      return this.primaryImageData.url;
    }

    if (this.images && this.images.length > 0) {
      return this.images[0];
    }

    return "/api/placeholder/400/400";
  }

  /**
   * Get formatted price
   */
  get formattedPrice() {
    return `₺${this.price.toFixed(2)}`;
  }

  /**
   * Get formatted old price
   */
  get formattedOldPrice() {
    return this.oldPrice ? `₺${this.oldPrice.toFixed(2)}` : null;
  }

  /**
   * Get discount percentage
   */
  get discountPercentage() {
    if (!this.oldPrice || this.price >= this.oldPrice) return 0;
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }

  /**
   * Check if product has discount
   */
  get hasDiscount() {
    return this.discountPercentage > 0;
  }

  /**
   * Check if product is in stock
   */
  get isInStock() {
    return this.stock > 0;
  }

  /**
   * Get stock status
   */
  get stockStatus() {
    if (this.stock === 0) return "out_of_stock";
    if (this.stock <= 5) return "low_stock";
    return "in_stock";
  }

  /**
   * Convert to API format
   */
  toApiFormat() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      old_price: this.oldPrice,
      images: this.images,
      rating: this.rating,
      stock: this.stock,
      sell_count: this.sellCount,
      category_id: this.categoryId,
      category: this.category,
      department: this.department,
      gender: this.gender,
      colors: this.colors,
      sizes: this.sizes,
      tags: this.tags,
      brand: this.brand,
      is_active: this.isActive,
      is_featured: this.isFeatured,
      is_new: this.isNew,
      is_on_sale: this.isOnSale,
    };
  }

  /**
   * Convert to UI format (backward compatibility)
   */
  toUIFormat() {
    return {
      id: this.id,
      title: this.name,
      image: this.primaryImage,
      price: this.price,
      oldPrice: this.oldPrice,
      rating: this.rating,
      colors: this.colors,
      department: this.department,
      product: this, // Full product object
    };
  }

  /**
   * Validate product data
   */
  isValid() {
    return !!(this.id && this.name && this.price >= 0);
  }

  /**
   * Create a copy with updated fields
   */
  update(updates = {}) {
    return new ProductModel({ ...this.toApiFormat(), ...updates });
  }
}

/**
 * Category Data Model
 */
export class CategoryModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.title = data.title || data.name || "";
    this.code = data.code || "";
    this.rating = data.rating || 0;
    this.gender = data.gender || "";
    this.img = data.img || data.image || "";
    this.parentId = data.parent_id || data.parentId || null;
    this.isActive = data.is_active !== undefined ? data.is_active : true;
    this.sortOrder = data.sort_order || data.sortOrder || 0;
  }

  /**
   * Get category URL slug
   */
  get slug() {
    return this.code || this.title.toLowerCase().replace(/\s+/g, "-");
  }

  /**
   * Check if category has image
   */
  get hasImage() {
    return !!this.img;
  }

  /**
   * Convert to API format
   */
  toApiFormat() {
    return {
      id: this.id,
      title: this.title,
      code: this.code,
      rating: this.rating,
      gender: this.gender,
      img: this.img,
      parent_id: this.parentId,
      is_active: this.isActive,
      sort_order: this.sortOrder,
    };
  }

  /**
   * Validate category data
   */
  isValid() {
    return !!(this.id && this.title);
  }
}

/**
 * User Data Model
 */
export class UserModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.email = data.email || "";
    this.roleId = data.role_id || data.roleId || null;
    this.phone = data.phone || "";
    this.avatar = data.avatar || "";
    this.isVerified = data.is_verified !== undefined ? data.is_verified : false;
    this.isActive = data.is_active !== undefined ? data.is_active : true;
    this.createdAt = data.created_at || data.createdAt || null;
    this.lastLoginAt = data.last_login_at || data.lastLoginAt || null;

    // Store-specific fields (if user is a store owner)
    this.store = data.store ? new StoreModel(data.store) : null;
  }

  /**
   * Get user display name
   */
  get displayName() {
    return this.name || this.email.split("@")[0];
  }

  /**
   * Get user initials
   */
  get initials() {
    return this.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substr(0, 2);
  }

  /**
   * Check if user is store owner
   */
  get isStoreOwner() {
    return !!this.store;
  }

  /**
   * Convert to API format
   */
  toApiFormat() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role_id: this.roleId,
      phone: this.phone,
      avatar: this.avatar,
      is_verified: this.isVerified,
      is_active: this.isActive,
      store: this.store ? this.store.toApiFormat() : null,
    };
  }

  /**
   * Validate user data
   */
  isValid() {
    return !!(this.id && this.name && this.email);
  }
}

/**
 * Store Data Model
 */
export class StoreModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.phone = data.phone || "";
    this.taxNo = data.tax_no || data.taxNo || "";
    this.bankAccount = data.bank_account || data.bankAccount || "";
    this.iban = data.iban || "";
    this.address = data.address || "";
    this.isVerified = data.is_verified !== undefined ? data.is_verified : false;
    this.isActive = data.is_active !== undefined ? data.is_active : true;
  }

  /**
   * Convert to API format
   */
  toApiFormat() {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      tax_no: this.taxNo,
      bank_account: this.bankAccount,
      iban: this.iban,
      address: this.address,
      is_verified: this.isVerified,
      is_active: this.isActive,
    };
  }

  /**
   * Validate store data
   */
  isValid() {
    return !!(this.name && this.phone && this.taxNo);
  }
}

/**
 * Shopping Cart Item Model
 */
export class CartItemModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.productId = data.product_id || data.productId || null;
    this.product = data.product ? new ProductModel(data.product) : null;
    this.quantity = data.quantity || 1;
    this.size = data.size || null;
    this.color = data.color || null;
    this.addedAt = data.added_at || data.addedAt || new Date().toISOString();
  }

  /**
   * Get total price for this item
   */
  get totalPrice() {
    return this.product ? this.product.price * this.quantity : 0;
  }

  /**
   * Get formatted total price
   */
  get formattedTotalPrice() {
    return `₺${this.totalPrice.toFixed(2)}`;
  }

  /**
   * Convert to API format
   */
  toApiFormat() {
    return {
      id: this.id,
      product_id: this.productId,
      quantity: this.quantity,
      size: this.size,
      color: this.color,
    };
  }

  /**
   * Validate cart item
   */
  isValid() {
    return !!(this.productId && this.quantity > 0);
  }
}

/**
 * Order Data Model
 */
export class OrderModel {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.user_id || data.userId || null;
    this.items = (data.items || []).map((item) => new CartItemModel(item));
    this.totalAmount = data.total_amount || data.totalAmount || 0;
    this.status = data.status || "pending";
    this.shippingAddress = data.shipping_address || data.shippingAddress || {};
    this.billingAddress = data.billing_address || data.billingAddress || {};
    this.paymentMethod = data.payment_method || data.paymentMethod || "";
    this.trackingNumber = data.tracking_number || data.trackingNumber || null;
    this.createdAt = data.created_at || data.createdAt || null;
    this.updatedAt = data.updated_at || data.updatedAt || null;
  }

  /**
   * Get order item count
   */
  get itemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get formatted total amount
   */
  get formattedTotalAmount() {
    return `₺${this.totalAmount.toFixed(2)}`;
  }

  /**
   * Check if order can be canceled
   */
  get canBeCanceled() {
    return ["pending", "confirmed"].includes(this.status);
  }

  /**
   * Convert to API format
   */
  toApiFormat() {
    return {
      id: this.id,
      user_id: this.userId,
      items: this.items.map((item) => item.toApiFormat()),
      total_amount: this.totalAmount,
      status: this.status,
      shipping_address: this.shippingAddress,
      billing_address: this.billingAddress,
      payment_method: this.paymentMethod,
      tracking_number: this.trackingNumber,
    };
  }

  /**
   * Validate order data
   */
  isValid() {
    return !!(this.userId && this.items.length > 0 && this.totalAmount > 0);
  }
}

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (value) => !!value,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^(\+90|0)?5\d{9}$/.test(value),
  price: (value) => typeof value === "number" && value >= 0,
  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  minLength: (min) => (value) => value && value.length >= min,
  maxLength: (max) => (value) => value && value.length <= max,
  numeric: (value) => !isNaN(Number(value)),
  positive: (value) => Number(value) > 0,
};

/**
 * Data transformation utilities
 */
export const DataTransformers = {
  /**
   * Transform API product list to ProductModel array
   */
  transformProducts: (apiProducts = []) => {
    return apiProducts.map((product) => new ProductModel(product));
  },

  /**
   * Transform API categories to CategoryModel array
   */
  transformCategories: (apiCategories = []) => {
    return apiCategories.map((category) => new CategoryModel(category));
  },

  /**
   * Transform API user to UserModel
   */
  transformUser: (apiUser = {}) => {
    return new UserModel(apiUser);
  },

  /**
   * Normalize API response format
   */
  normalizeApiResponse: (response) => {
    // Handle different API response formats
    if (response.data) {
      return response.data;
    }
    if (response.results) {
      return response.results;
    }
    return response;
  },

  /**
   * Create pagination info from API response
   */
  createPaginationInfo: (response) => {
    return {
      total: response.total || response.count || 0,
      limit: response.limit || response.per_page || 20,
      offset:
        response.offset ||
        ((response.page || 1) - 1) * (response.per_page || 20),
      hasMore: response.has_more || response.next_page_url !== null,
      currentPage: response.page || 1,
      totalPages:
        response.total_pages ||
        Math.ceil((response.total || 0) / (response.per_page || 20)),
    };
  },
};

export default {
  ProductModel,
  CategoryModel,
  UserModel,
  StoreModel,
  CartItemModel,
  OrderModel,
  ValidationRules,
  DataTransformers,
};
