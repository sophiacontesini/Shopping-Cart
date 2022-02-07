// const { fetchItem } = require('./helpers/fetchItem');
// const { fetchProducts } = require("./helpers/fetchProducts");

const armazenaCarrinho = [];
let valor = 0;
const subTotal = document.querySelector('.total-price');
subTotal.innerText = valor;

// Requisito 5 somar os valores do carrinho
const somaValores = () => {
  const itensCarrinho = document.querySelectorAll('.cart__item');
  const arrValor = [];
  const precos = [];
  itensCarrinho.forEach((item) => {
    arrValor.push(item.innerText.split('$'));
  });
  arrValor.forEach((item) => {
    precos.push(Number(item[item.length - 1]));
  });
  
  if (precos.length < 1) {
    subTotal.innerText = 0;
  } else {
    valor = precos.reduce((acc, cV) => acc + cV).toFixed(2);
    subTotal.innerText = parseFloat(valor);
  }
};

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
const cartItemClickListener = (event) => {
  event.target.remove();
  somaValores();
};
// Requisito 2
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 4 
// JSON.parse converte de string para objeto
  const salvaStorage = () => { 
  const salva = JSON.parse(getSavedCartItems());
  salva.forEach((el) => document.querySelector('.cart__items')
  .appendChild(createCartItemElement({ sku: el.sku, name: el.name, salePrice: el.salePrice })));
  somaValores();
};

// Requisito 2 evento click que adiciona o item no carrinho
const addCarrim = async (event) => {
  const id = event.target.parentNode;
  const getItem = getSkuFromProductItem(id);
  const getFetch = await fetchItem(getItem);
  const { id: sku, title: name, price: salePrice } = getFetch;
  document.querySelector('.cart__items')
    .appendChild(createCartItemElement({ sku, name, salePrice }));
  armazenaCarrinho.push({ sku, name, salePrice });
  saveCartItems(JSON.stringify(armazenaCarrinho));
  somaValores();
};

// Requisito 2 funcao do click no botao;
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
  carrim();
};
// Requisito 6 esvaziar carrinho
const botaoEsvaziar = document.querySelector('.empty-cart');
const apagaTudo = () => {
const itensCarrinho = document.querySelectorAll('.cart__item');
itensCarrinho.forEach((item) => {
  item.remove();
  somaValores();
});
};
// Requisito 7 
const carregar = () => {
  const carregando = document.createElement('div');
carregando.classList.add('loading');
carregando.innerText = 'Carregando...';
document.querySelector('.items').appendChild(carregando);
};
carregar();
const removerCarregando = () => document.querySelector('.loading').remove();

botaoEsvaziar.addEventListener('click', apagaTudo);

// Sumo: usar o assync away quando for uma função, o then quando for escopo global;
window.onload = () => {
  setTimeout(appendList, 2000);
  setTimeout(removerCarregando, 2000);
  if (localStorage.length > 0) salvaStorage();
};