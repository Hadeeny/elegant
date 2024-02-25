import React from "react";

const CartItem = () => {
  return (
    <div className="flex gap-x-2">
      {/* image */}
      <div className="w-[5rem] h-[5rem] border" />
      <div className="flex-1">
        <p>Tray table</p>
        <p>Color: Red</p>
        <p>quantity select</p>
      </div>
      <div>
        <p>price</p>
        <p>cancel</p>
      </div>
    </div>
  );
};

export default CartItem;
