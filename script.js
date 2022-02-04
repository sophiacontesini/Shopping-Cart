// const { fetchItem } = require('./helpers/fetchItem');
// const { fetchProducts } = require("./helpers/fetchProducts");
const itemLista = document.querySelector('.items');
const cartList = document.querySelector('.cart__items');

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
const cartItemClickListener = (event) => event.target.remove();

// Requisito 2
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const appendCart = async () => {
  const cartItem = await fetchItem('');
  const { id: sku, title: name, price: salePrice } = cartItem;
  cartList.appendChild(createCartItemElement({ sku, name, salePrice }));
};

const armazenaCarrinho = [];

// Requisito 4 
// JSON.parse converte de string para objeto
const salvaStorage = JSON.parse(getSavedCartItems());
salvaStorage.forEach((el) => { 
  document.querySelector('.cart__items')
.appendChild(createCartItemElement({ sku: el.sku, name: el.name, salePrice: el.salePrice }));
});
//
const addCarrim = async (event) => {
  const id = event.target.parentNode;
  const getItem = getSkuFromProductItem(id);
  const getFetch = await fetchItem(getItem);
  const { id: sku, title: name, price: salePrice } = getFetch;
  document.querySelector('.cart__items')
    .appendChild(createCartItemElement({ sku, name, salePrice }));
  armazenaCarrinho.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(armazenaCarrinho));
  console.log(armazenaCarrinho);
};

// Requisito 2 adiciona os itens no carrinho;
const carrim = async () => {
  const botaozim = document.querySelectorAll('.item__add');
  botaozim.forEach((el) => el.addEventListener('click', addCarrim));
};

// Requisito 1 adiciona produtos na tela;
const appendList = async () => {
  const products = await fetchProducts('computador');
  products.results.forEach((el) =>
    document.querySelector('.items')
      .appendChild(createProductItemElement({ sku: el.id, name: el.title, image: el.thumbnail })));
  await carrim();
};

// Sumo: usar o assync away quando for uma função, o then quando for escopo global;
window.onload = () => {
  appendList();
  if (localStorage.length > 0) salvaStorage();
};