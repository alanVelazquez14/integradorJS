import { addProduct } from "../cart/cart";
import { appStates, productData } from "../data";

//Contenedor de productos
const containerProducts = document.querySelector(".container-product");
//Botón de ver más cursos
const btnMore = document.querySelector(".btn-load");
//Contenedor de las categorias
const categoriesContainer = document.querySelector(".categories");
//Botones de las categorias
const categoriesList = document.querySelectorAll(".category");

//Función para crear las cards de los cursos
const createProductsTemplate = (product) => {
  const { id, name, cardImg, bid } = product;
  return `
      <div class="card-product">
          <div class="container-img">
            <img src= "${cardImg}" alt="">
            <h4>${name}</h4>
          </div>
          <div class="divider-card"></div>
          <div class= "container-price">
              <h4>$ ${bid}</h4>
              <button class="btn-add"
              data-id= '${id}'
              data-name= '${name}'
              data-img= '${cardImg}'
              data-bid= '${bid}' >Add</button>
          </div>
        </div>
      `;
};

//Función para mostrar los cursos en el contenedor.
const renderProducts = (products) => {
  containerProducts.innerHTML += products.map(createProductsTemplate).join("");
};

//Función para ver más productos
const showMoreProducts = () => {
  appStates.currentProductIndex += 1;
  let { productData, currentProductIndex, productLimit } = appStates;
  renderProducts(productData[currentProductIndex]);
  if (currentProductIndex === productLimit - 1) {
    btnMore.classList.add("hidden");
  }
};

//LÓGICA DE FILTROS
//Función que devuelve el elemento que no esta activo
const IsInactiveFilter = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

//Función para cambiar el color de fondo activo
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const changeFilterState = (btn) => {
  appStates.activeFilter = btn.dataset.category;
  changeBtnActiveState(appStates.activeFilter);
};

const applyFilter = (e) => {
  if (!IsInactiveFilter(e.target)) return;
  changeFilterState(e.target);
  containerProducts.innerHTML = "";
  if (appStates.activeFilter) {
    const filteredProduct = productData.filter(
      (products) => products.category === appStates.activeFilter
    );
    renderProducts(filteredProduct);
    appStates.currentProductIndex = 0;
    return;
  }
  renderProducts(appStates.productData[0]);
};

export const productSectionInit = () => {
  renderProducts(appStates.productData[0]);
  btnMore.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  containerProducts.addEventListener("click", addProduct);
};
