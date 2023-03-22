import React, { useState } from "react";
import styled from "styled-components";

const QuantityStyles = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 50px;
  .quantity-title {
    font-size: 18px;
    font-weight: 600;
  }
  .quantity-wrapper {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 5px 15px;
    border-radius: 8px;
    border: 1px solid gray;
    max-width: 200px;
    justify-content: space-between;
  }
  .quantity-button {
    font-size: 24px;
    font-weight: 600;
    color: gray;
  }
`;

function Quantity() {
  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const increment = () => {
    if (quantity === 10) return;
    setQuantity(quantity + 1);
  };
  return (
    <QuantityStyles>
      <h4 className="quantity-title">Số lượng: </h4>
      <div className="quantity-wrapper">
        <button className="quantity-button" onClick={decrement}>
          -
        </button>
        <span className="quantity-value">{quantity}</span>
        <button className="quantity-button" onClick={increment}>
          +
        </button>
      </div>
    </QuantityStyles>
  );
}

export default Quantity;
