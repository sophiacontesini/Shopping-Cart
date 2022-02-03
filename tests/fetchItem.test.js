require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', async() => {
    await expect(typeof fetchItem).toBe('function');
  });

  it('Execute a função fetcItem com o argumento "MLB1615760527" e teste se fetch foi chamada', async() => {
    const dataBase = await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalled();
  });

  it('Teste se, ao chamar a função fetchItem com o argumento "MLB1615760527" a função fetch utiliza o endponint', async() => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    const dataBase = await fetchItem("MLB1615760527");
    expect(fetch).toBeCalledWith(url);
  });

   it('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async() => {
    const dataBase = await fetchItem("MLB1615760527");
    expect(dataBase).toEqual(item);
  });

   it('Teste se o retorno da função fetchItem sem argumento retorna um erro com a mensagem: You must provide an url', async() => {
    const dataBase = await fetchItem();
    expect(dataBase).toEqual(new Error('You must provide an url'));
   });
});
