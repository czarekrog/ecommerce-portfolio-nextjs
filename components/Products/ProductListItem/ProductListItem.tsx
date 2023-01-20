import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Product } from "../../../types/Products";
import styles from "./ProductListItem.module.css";
import { AddToCart } from "../../AddToCart/AddToCart";

type Props = {
  product: Product;
};

const ProductListItem = ({ product }: Props) => {
  const [hover, setHover] = useState(false);

  const addToCartVisible = hover ? styles.addToCartContainerVisible : "";

  return (
    <div
      className={styles.item}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Link href="/product/[id]" as={`/product/${product.id}`}>
        <a>
          <div className={styles.itemImage}>
            <Image
              src={product.image}
              width="150px"
              height="150px"
              alt="Product image"
            />
          </div>
          <div className={styles.summary}>
            <p className={styles.title}>
              {product.title.slice(0, 35)}
              {product.title.length > 35 && "..."}
            </p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>
        </a>
      </Link>
      <div className={`${styles.addToCartContainer} ${addToCartVisible}`}>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductListItem;
