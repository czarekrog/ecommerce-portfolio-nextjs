import React, { useState } from "react";
import { useCart } from "../../hooks/Cart/useCart";
import { Product } from "../../types/Products";
import styles from "./AddToCart.module.css";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [amount, setAmount] = useState(1);
  const { addToCart } = useCart();

  const increaseAddToCartAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAddToCartAmount = () => {
    setAmount((prev) => prev - 1);
  };

  return (
    <div>
      <button
        className={styles.setValueButton}
        onClick={decreaseAddToCartAmount}
      >
        -
      </button>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          const value = Number(e.target.value);
          setAmount(value);
        }}
        className={styles.amountInput}
      />
      <button
        className={styles.setValueButton}
        onClick={increaseAddToCartAmount}
      >
        +
      </button>
      <button
        className={styles.addToCartButton}
        onClick={() =>
          addToCart({
            productId: product.id.toString(),
            amount: amount,
            image: product.image,
            title: product.title,
            singlePiecePrice: product.price,
          })
        }
      >
        Add to cart
      </button>
    </div>
  );
};
