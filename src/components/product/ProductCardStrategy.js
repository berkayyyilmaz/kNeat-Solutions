import ProductCardGrid from "./ProductCardGrid";
import ProductCardList from "./ProductCardList";

// Strategy Registry - Yeni view types buraya eklenebilir
const VIEW_TYPE_STRATEGIES = {
  grid: ProductCardGrid,
  list: ProductCardList,
  // Gelecekte eklenebilecek yeni view types:
  // card: ProductCardCard,
  // table: ProductCardTable,
  // gallery: ProductCardGallery,
};

// Strategy Selector
export const getProductCardStrategy = (viewType) => {
  const strategy = VIEW_TYPE_STRATEGIES[viewType];

  if (!strategy) {
    console.warn(`Unknown viewType: ${viewType}, falling back to grid`);
    return VIEW_TYPE_STRATEGIES.grid;
  }

  return strategy;
};

// Strategy Registry - Yeni strategy'ler dinamik olarak register edilebilir
export const registerProductCardStrategy = (viewType, component) => {
  VIEW_TYPE_STRATEGIES[viewType] = component;
};

// Available strategies'i dışarı aktaralım
export const getAvailableViewTypes = () => {
  return Object.keys(VIEW_TYPE_STRATEGIES);
};
