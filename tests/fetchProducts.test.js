require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', async() => {
    await expect(typeof fetchProducts).toBe('function');
  });

  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async() => {
    const dataBase = await fetchProducts("computador");
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchProducts com o argumento "computador" a função fetch utiliza o endponint', async() => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    const dataBase = await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });

   it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch que já está importado no arquivo', async() => {
    const dataBase = await fetchProducts('computador');
    expect(dataBase).toEqual(computadorSearch);
  });

   it('Teste se o retorno da função fetchProducts sem argumento retorna um erro com a mensagem: You must provide an url', async() => {
    const dataBase = await fetchProducts();
    expect(dataBase).toEqual(new Error('You must provide an url'));
   });
});
