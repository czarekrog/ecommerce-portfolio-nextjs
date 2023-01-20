import React from "react";
import { Product } from "../../../types/Products";
import ProductListItem from "../ProductListItem/ProductListItem";
import styles from "./ProductList.module.css";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  return (
    <>
      <h2 className={styles.sectionHeader}>Our products</h2>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductsList;
