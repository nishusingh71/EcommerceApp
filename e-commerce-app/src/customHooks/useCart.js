export const useCart = (cart, customer) => {
  const addItemToCart = (product, quantity = 0) => {
    let currentCartItems = [...cart.items];

    if (currentCartItems.length > 0) {
      let productExists = currentCartItems.find(
        (item) => item.id === product.id
      );
      let productExistsIndex = currentCartItems.findIndex(
        (item) => item.id === product.id
      );
      if (productExists) {
        if (quantity) {
          currentCartItems.splice(productExistsIndex, 1, {
            ...productExists,
            purchaseQuantity: quantity,
          });
        } else {
          currentCartItems.splice(productExistsIndex, 1, {
            ...productExists,
            purchaseQuantity: productExists.purchaseQuantity + 1,
          });
        }
      } else {
        if (quantity) {
          currentCartItems.push({ ...product, purchaseQuantity: quantity });
        } else {
          currentCartItems.push({ ...product, purchaseQuantity: 1 });
        }
      }
    } else {
      if (quantity) {
        currentCartItems.push({ ...product, purchaseQuantity: quantity });
      } else {
        currentCartItems.push({ ...product, purchaseQuantity: 1 });
      }
    }

    cart.customer = customer;
    cart.items = currentCartItems;
    cart.subTotal = 0;
    cart.tax = 0;
    cart.grandTotal = 0;

    for (const item of cart.items) {
      cart.subTotal += +item.price * item.purchaseQuantity;
    }

    cart.grandTotal = cart.subTotal + cart.tax;

    return cart;
  };

  const updateItemToCart = (product, quantity = 0) => {
    let currentCartItems = [...cart.items];

    if (currentCartItems.length > 0) {
      let productExists = currentCartItems.find(
        (item) => item.id === product.id
      );
      let productExistsIndex = currentCartItems.findIndex(
        (item) => item.id === product.id
      );
      if (productExists) {
        if (quantity) {
          currentCartItems.splice(productExistsIndex, 1, {
            ...productExists,
            purchaseQuantity: quantity,
          });
        } else {
          currentCartItems.splice(productExistsIndex, 1, {
            ...productExists,
            purchaseQuantity: productExists.purchaseQuantity + 1,
          });
        }
      }
    }

    cart.customer = customer;
    cart.items = currentCartItems;
    cart.subTotal = 0;
    cart.tax = 0;
    cart.grandTotal = 0;

    for (const item of cart.items) {
      cart.subTotal += +item.price * item.purchaseQuantity;
    }

    cart.grandTotal = cart.subTotal + cart.tax;

    return cart;
  };

  const removeItemFromCart = (product) => {
    let currentCartItems = [...cart.items];

    if (currentCartItems.length > 0) {
      let productExists = currentCartItems.find(
        (item) => item.id === product.id
      );
      let productExistsIndex = currentCartItems.findIndex(
        (item) => item.id === product.id
      );
      if (productExists) {
        currentCartItems.splice(productExistsIndex, 1);
      }
    }

    cart.customer = customer;
    cart.items = currentCartItems;
    cart.subTotal = 0;
    cart.tax = 0;
    cart.grandTotal = 0;

    for (const item of cart.items) {
      cart.subTotal += +item.price * item.purchaseQuantity;
    }

    cart.grandTotal = cart.subTotal + cart.tax;

    return cart;
  };

  return [addItemToCart, updateItemToCart, removeItemFromCart];
};
