import Link from "next/link";
import React from "react";
import { ProductsList } from "../../components/Cart/ProductsList/ProductsList";
import { useCart } from "../../hooks/Cart/useCart";
import { useAuth } from "../../hooks/User/useAuth";
import styles from "../../styles/Cart.module.css";

const Cart = () => {
  const { items, removeAll, cartTotal, checkout } = useCart();
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className={styles.header}>
        <h1>Cart</h1>
        {items.length !== 0 && (
          <span className={styles.clearCart} onClick={removeAll}>
            Clear cart
          </span>
        )}
      </div>
      {items.length === 0 && (
        <>
          <h2>Your cart is empty</h2>
          <Link href="/">Click and start shopping now!</Link>
        </>
      )}
      {items.length !== 0 && (
        <>
          <div>
            <ProductsList products={items} />
          </div>
          <h2 className={styles.cartTotal}>
            Cart total: ${cartTotal.toFixed(2)}
          </h2>
          {isAuthenticated && (
            <button className={styles.buyNowButton} onClick={checkout}>
              Checkout Now!
            </button>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
