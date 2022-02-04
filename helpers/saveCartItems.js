const saveCartItems = (item) => {
  return localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
