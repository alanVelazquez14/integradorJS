export const productData = [
  {
    id: 1,
    name: "Desarrollo Web",
    category: "Informática",
    cardImg: "img/cursos/desarrollo-web.jpg",
    bid: 25.5,
  },
  {
    id: 2,
    name: "Gestión de Proyectos",
    category: "Negocios",
    cardImg: "img/cursos/gestion-de-proyectos.jpg",
    bid: 12.5,
  },
  {
    id: 3,
    name: "Diseño Gráfico",
    category: "Arte",
    cardImg: "img/cursos/diseno-grafico.jpg",
    bid: 20.5,
  },
  {
    id: 4,
    name: "Habilidades de Comunicación",
    category: "Desarrollo Personal",
    cardImg: "img/cursos/habilidades-comunicacion.webp",
    bid: 10,
  },
  {
    id: 5,
    name: "Programación y Desarrollo de Software",
    category: "Informática",
    cardImg: "img/cursos/desarrollo-de-Software.webp",
    bid: 25.5,
  },
  {
    id: 6,
    name: "Marketing Digital",
    category: "Negocios",
    cardImg: "img/cursos/marketing-digital.jpg",
    bid: 22.5,
  },
  {
    id: 7,
    name: "Fotografía",
    category: "Arte",
    cardImg: "img/cursos/fotografia.jpg",
    bid: 15,
  },
  {
    id: 8,
    name: "Ciencia de Datos",
    category: "Informática",
    cardImg: "img/cursos/ciencia-datos.jpg",
    bid: 11.5,
  },
  {
    id: 9,
    name: "Finanzas y Contabilidad",
    category: "Negocios",
    cardImg: "img/cursos/contabilidad-finanzas.jpg",
    bid: 8.5,
  },
  {
    id: 10,
    name: "Escritura Creativa",
    category: "Arte",
    cardImg: "img/cursos/escritura-creativa.jpg",
    bid: 9.5,
  },
  {
    id: 11,
    name: "Mindfulness y Meditación",
    category: "Desarrollo Personal",
    cardImg: "img/cursos/meditacion-mindfulness.jpg",
    bid: 16.5,
  },
  {
    id: 12,
    name: "Música y Producción Musical",
    category: "Arte",
    cardImg: "img/cursos/musica-produccion.jpg",
    bid: 15.5,
  },
  {
    id: 13,
    name: "Ciberseguridad",
    category: "Informática",
    cardImg: "img/cursos/ciberseguridad-3jpg.webp",
    bid: 25.5,
  },
  {
    id: 14,
    name: "Liderazgo y Gestión Empresarial",
    category: "Negocios",
    cardImg: "img/cursos/Liderazgo-empresarial-1.png",
    bid: 8.5,
  },
  {
    id: 15,
    name: "Idiomas y Lingüística",
    category: "Desarrollo Personal",
    cardImg: "img/cursos/idiomas.jpg",
    bid: 17.5,
  },
  {
    id: 16,
    name: "Salud y Fitness",
    category: "Desarrollo Personal",
    cardImg: "img/cursos/salud.jpg",
    bid: 20.5,
  },
];

//funcion para dividir el array en partes.
const divideProduct = (size) => {
  let products = [];
  for (let i = 0; i < productData.length; i += size) {
    products.push(productData.slice(i, i + size));
  }
  return products;
};

const products_size = 6;

export const appStates = {
  productData: divideProduct(products_size),
  currentProductIndex: 0,
  productLimit: divideProduct(products_size).length,
  activeFilter: null,
};
