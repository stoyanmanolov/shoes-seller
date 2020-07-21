export const formatCart = (cart, newItem, count) => {
  let formatted = [...cart];

  if (formatted.length === 0) {
    formatted.push(newItem);

    return formatted;
  }

  const index = formatted.findIndex(
    (cartItem) => cartItem.shoe._id === newItem.shoe._id
  );

  if (index !== -1) {
    formatted[index].sizes.push(newItem.sizes[0]);
  } else {
    formatted.push(newItem);
  }

  return formatted;
};

export const getItemsCount = (cart) => {
  let count = 0;

  cart.forEach((item) => {
    count += item.sizes.length;
  });

  return count;
};

export const getTotalPrice = (cart) => {
  let totalPrice = 0;

  cart.forEach((item) => {
    const modelPrice = item.shoe.price * item.sizes.length;
    totalPrice += modelPrice;
  });

  return totalPrice;
};
