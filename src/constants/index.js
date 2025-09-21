// Magic Numbers ve Hard-coded Values'ları tanımlayan constants dosyası

// Product Pagination Constants
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  DEFAULT_LIMIT: 25,
  BESTSELLER_FETCH_LIMIT: 100,
  BESTSELLER_DISPLAY_COUNT: 8,
};

// UI/UX Constants
export const UI = {
  MOBILE_BREAKPOINT: 768,
  INFINITE_SCROLL_THRESHOLD: 500,
  PAGINATION_MAX_VISIBLE_PAGES: 7,
  PAGINATION_NEARBY_PAGES: 4,
  PAGINATION_MIDDLE_OFFSET: 1,
};

// Form Validation Constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  TAX_NUMBER_PATTERN: /^T\d{4}V\d{6}$/,
};

// Layout Constants
export const LAYOUT = {
  CONTAINER_PADDING: "px-4 lg:px-8 xl:px-12",
  CARD_BORDER_RADIUS: "rounded-2xl",
  SECTION_PADDING: "py-12",
  SECTION_PADDING_LARGE: "py-16",
};

// Grid Constants
export const GRID = {
  PRODUCT_GRID_COLS:
    "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  CATEGORY_GRID_COLS:
    "grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  SHOP_GRID_COLS:
    "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-5",
};

// Animation & Timing Constants
export const ANIMATION = {
  TRANSITION_DURATION: "duration-300",
  HOVER_TRANSITION: "transition-all duration-300",
  FADE_IN_UP: "animate-fadeInUp",
  SLIDE_DOWN: "animate-slideDown",
};

// Color & Theme Constants
export const THEME = {
  PRIMARY_COLOR: "bg-primary",
  PRIMARY_HOVER: "hover:bg-primary/90",
  ERROR_COLOR: "text-red-500",
  SUCCESS_COLOR: "text-green-800",
  GRAY_TEXT: "text-gray-500",
  GRAY_BORDER: "border-gray-100",
};

// Discount & Pricing Constants
export const PRICING = {
  DISCOUNT_MULTIPLIER: 100,
  RATING_DECIMAL_PLACES: 1,
};

// Component Size Constants
export const SIZES = {
  ICON_SMALL: 12,
  ICON_MEDIUM: 18,
  ICON_LARGE: 24,
  BUTTON_HEIGHT: "h-12",
  AVATAR_SIZE: "w-12 h-12",
};

// Scroll Constants
export const SCROLL = {
  TO_TOP_BUTTON_POSITION: "fixed bottom-6 right-6 z-50",
  INFINITE_SCROLL_MOBILE_DISABLED: true,
};
