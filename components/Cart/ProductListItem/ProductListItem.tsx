import Image from "next/image";
import React from "react";
import { useCart } from "../../../hooks/Cart/useCart";
import { AddToCartData } from "../../../types/AddToCartData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductListItem.module.css";

type Props = {
  product: AddToCartData;
};

export const ProductListItem = ({
  product: {
    title,
    image,
    amount,
    singlePiecePrice,
    productId,
    databaseCartItemId,
  },
}: Props) => {
  const { updateCartAmount, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateCartAmount(productId, 1);
  };

  const handleDecrease = () => {
    updateCartAmount(productId, -1);
  };

  const handleAmountInputChange = ({ value }: { value: string }) => {
    const amountDifference = Number(value) - amount;
    updateCartAmount(productId, amountDifference);
  };

  return (
    <div className={styles.productListItem}>
      <div className={styles.imageTitleSection}>
        <Image src={image} width="100px" height="100px" alt="Product image" />
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.amountPriceSection}>
        <div className={styles.amountSection}>
          <div onClick={handleDecrease} className={styles.decreaseAmount}>
            -
          </div>
          <div>
            <input
              className={styles.amountInput}
              value={amount !== 0 ? amount : ""}
              onChange={(e) =>
                handleAmountInputChange({ value: e.target.value })
              }
            />
          </div>
          <div onClick={handleIncrease} className={styles.increaseAmount}>
            +
          </div>
        </div>
        <p className={styles.total}>
          Total: ${(amount * singlePiecePrice).toFixed(2)}
        </p>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => removeFromCart(databaseCartItemId!)}
          className={styles.removeButton}
        />
      </div>
    </div>
  );
};
