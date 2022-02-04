const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar o saveCartItems com o argumento "item" o método localStorage.setItem é chamado', () => {
    const result = saveCartItems('item');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Teste se, ao executar saveCartItems com o argumento Item o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro cartItems e o segundo sendo o valor passado como argumento para saveCartItems', () => {
    const  result = saveCartItems('item');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', 'item');
  });
});
