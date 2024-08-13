import React, { useState } from "react";

const CheckItem = ({ item }) => {
  let [quantity] = useState(item.purchaseQuantity);

  return (
    <div>
      <li>
        {quantity}. {item.name}{" "}
        <span>${item.price * item.purchaseQuantity}</span>
      </li>
    </div>
  );
};

export default CheckItem;
