const fetchProducts = async (computador) => {
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${computador}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
  } catch (error) {
    return error;
  }
};
fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
