//Icono
const cartBtn = document.querySelector(".cart-label");
//Carrito
const cartMenu = document.querySelector(".cart-fav");
const overlay = document.querySelector(".overlay");

//Menu hamburguesa
const menuBtn = document.querySelector(".menu-label");
const menu = document.querySelector(".navbar-list");

const toggleMenu = () => {
  menu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (menu.classList.contains("open-menu")) {
    menu.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

const closeOverlay = () => {
  if (
    menu.classList.contains("open-menu") ||
    cartMenu.classList.contains("open-cart")
  ) {
    menu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  }
};

export const menuInit = () => {
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeOverlay);
  window.addEventListener("scroll", closeOverlay);
};
