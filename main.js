import { cartInit } from "./assets/cart/cart";
import { menuInit } from "./assets/menu/menu";
import { productSectionInit } from "./assets/products-section/products";

const init = () => {
  productSectionInit();
  cartInit();
  menuInit();
};

init();
