import React, { useState } from "react";

const CheckItem = ({ item, index }) => {
  let [quantity] = useState(item.purchaseQuantity);

  return (
    <div>
      <li key={index}>
        {quantity}. {item.name}
        <span>${item.price * item.purchaseQuantity}</span>
      </li>
    </div>
  );
};

export default CheckItem;
