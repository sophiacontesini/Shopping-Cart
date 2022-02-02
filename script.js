const { fetchProducts } = require("./helpers/fetchProducts");
const itemLista = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Requisito 1 
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
// Requisito 3
function cartItemClickListener(event) {
  // coloque seu código aqui
}
// Requisito 2
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
  const listProduct = async () => {
    const products = await fetchProducts('computador');
    return products.results; 
  };

  const appendList = async () => {
    products.results.forEach((el) => {
    itemLista.appendChild(createProductItemElement({ sku: el.id, name: el.title, image: el.thumbnail }));
  });

// Sumo: usar o assync away quando for uma função, o then quando for escopo global;
window.onload = () => {
  appendList(listProduct());
};