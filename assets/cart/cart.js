//Llamar al contenedor de productos
const productCart = document.querySelector(".fav-container");
//Llamar a botón borrar todo del carrito
const btnDelete = document.querySelector(".btn-delete");
//Llamar a botón comprar el carrito
const btnBuy = document.querySelector(".btn-buy");
//Total del carrito
const total = document.querySelector(".total");
//llamo a los mensajes de borrar el carrito o comprar
const btnBuyDelete = document.querySelector(".btn-cart");
const msgAlert = document.querySelector(".msg-alert");
//Llamar a la burbuja del carrito
const bubble = document.querySelector(".cart-bubble");
//Llamo al modal
const modal = document.querySelector(".add-modal");

//CARRRITO VACIO
let favProducts = JSON.parse(localStorage.getItem("favProducts")) || [];

//Función para guardar en LS
const saveCart = () => {
  localStorage.setItem("favProducts", JSON.stringify(favProducts));
};

//LÓGICA DEL CARRITO

//Funcion para HTML
const createCartProductsTemplate = (products) => {
  const { id, name, img, bid } = products;
  return `
          <div class="cart-item">
              <img src="${img}" alt="" />
              <div class= "cart-info">
                <h3 class="new-title">${name}</h3>
                <p>$${bid}</p>
              </div>
              <div class="trash">
                  <i class="fa-solid fa-trash-can" data-id = ${id}></i>
              </div>
          </div>
      `;
};

//Función para mostrar en el carrito
const renderCart = () => {
  if (!favProducts.length) {
    productCart.innerHTML = `
      <div class="cart-empty">
        <p class = "cart-item-p">Tu carrito está vacío. ¡Seguí comprando para encontrar un curso!</p>
        <button class="btn-more">Seguir comprando</button>
      </div>
      `;
    return;
  }
  productCart.innerHTML = favProducts.map(createCartProductsTemplate).join("");
};

//Función para cuando tocamos el boton de Seguir comprando nos lleve a los productos
const handleBtnBuyEvent = ({ target }) => {
  if (target.classList.contains("btn-more")) {
    window.location.href = "index.html#product";
  }
};

//Función para obtener el total del carrito
const cartTotal = () => {
  return favProducts.reduce(
    (acc, cur) => acc + Number(cur.bid) * cur.quantity,
    0
  );
};

//Función para mostrar el total del carrito
const showCartTotal = () => {
  total.innerHTML = `$${cartTotal()}`;
};

//Función para modificar la burbuja del carrito
const showBubble = () => {
  bubble.textContent = favProducts.reduce((acc, cur) => acc + cur.quantity, 0);
};

//Funcion para habilitar o deshabilitar los botones del carrito
const disabledBtn = (btn) => {
  if (!favProducts.length) {
    btn.classList.add("disabled-btn");
  } else {
    btn.classList.remove("disabled-btn");
  }
};

//Funcion para actualizar el estado del carrito
const updateCartState = () => {
  saveCart();
  showCartTotal();
  renderCart();
  showBubble();
  disabledBtn(btnBuy);
  disabledBtn(btnDelete);
};

//Función para agregar productos
export const addProduct = ({ target }) => {
  if (!target.classList.contains("btn-add")) return;
  const products = createProductsData(target.dataset);
  if (isExistingProductsInCart(products)) {
    alert("Ya agregaste este producto al carrito.");
  } else {
    createCardProducts(products);
    showModal("Agregaste el producto al carrito");
  }
  updateCartState();
};

const handleBtnEvent = ({ target }) => {
  const existingCartProducts = target.dataset.id;
  removeProducts(existingCartProducts);
};

//Función para borrar productos
const removeProducts = (id) => {
  favProducts = favProducts.filter((products) => products.id !== id);
  updateCartState();
};

//Función para borrar todos los productos
const resetCart = () => {
  favProducts = [];
  updateCartState();
};

//Función para confirmar si va a comprar
const completeBuy = () => {
  msgAlert.innerHTML = ` 
    <div class="alert-buy">
      <h2>¿Queres comprar todo el carrito?</h2>
      <div class="alert-btn">
        <button class="confirm-buy">¡Si quiero!</button>
        <button class="cancel">Seguir comprando</button>
      </div>
    </div>
  `;
};

//Función para confirmar si va a borrar
const deleteCart = () => {
  msgAlert.innerHTML = `
      <div class="alert-delete">
        <h2>¿Queres vaciar todo el carrito?</h2>
        <div class="alert-btn">
          <button class="confirm-delete">¡Si quiero!</button>
          <button class="cancel">Cancelar</button>
        </div>
      </div>
    `;
};

//FUNCION PARA CONFIRMAR SI VA A BORRAR O CONFIRMAR LA COMPRA
const alertAction = ({ target }) => {
  if (target.classList.contains("btn-delete")) {
    deleteCart();
  } else if (target.classList.contains("btn-buy")) {
    completeBuy();
  }
};

// Función para confirmar la compra
const confirmBuy = ({ target }) => {
  if (target.classList.contains("confirm-buy")) {
    msgAlert.innerHTML = `
      <div class="alert-buy">
        <h2>¡GRACIAS POR TU COMPRA!</h2>
      </div>
    `;
    clearMessage();
    resetCart();
  }
};

// Función para cancelar la acción
const cancelAction = ({ target }) => {
  if (target.classList.contains("cancel")) {
    msgAlert.innerHTML = "";
  }
};

// Función para vaciar el carrito si confirma
const confirmDelete = ({ target }) => {
  if (target.classList.contains("confirm-delete")) {
    msgAlert.innerHTML = `
      <div class="alert-delete">
        <h2>El carrito ha sido vaciado.</h2>
      </div>
    `;
    clearMessage();
    resetCart();
  }
};

//Funcion para borrar el cartel de borrar o comprar carrito
const clearMessage = () => {
  setTimeout(() => {
    msgAlert.innerHTML = "";
  }, 2000);
};

//Funcion para ver si ya existe la producto en el carrito
const isExistingProductsInCart = (products) => {
  return favProducts.find((item) => item.id === products.id);
};

//Función para mostrar el aviso de agregado al carrito
const showModal = (mensaje) => {
  modal.classList.add("active-modal");
  modal.textContent = mensaje;

  setTimeout(() => {
    modal.classList.remove("active-modal");
  }, 1500);
};

//Función para crear el objeto del producto
const createCardProducts = (products) => {
  favProducts = [...favProducts, { ...products, quantity: 1 }];
};

const createProductsData = (products) => {
  return {
    id: products.id,
    name: products.name,
    img: products.img,
    bid: products.bid,
  };
};

export const cartInit = () => {
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productCart.addEventListener("click", handleBtnEvent);
  productCart.addEventListener("click", handleBtnBuyEvent);
  btnBuyDelete.addEventListener("click", alertAction);
  msgAlert.addEventListener("click", confirmBuy);
  msgAlert.addEventListener("click", confirmDelete);
  msgAlert.addEventListener("click", cancelAction);
  showBubble(favProducts);
  disabledBtn(btnBuy);
  disabledBtn(btnDelete);
};
