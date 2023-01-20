import React from "react";
import { AddToCartData } from "../../../types/AddToCartData";
import { ProductListItem } from "../ProductListItem/ProductListItem";

type Props = {
  products: AddToCartData[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <div>
      {products.map((product) => (
        <ProductListItem key={product.productId} product={product} />
      ))}
    </div>
  );
};
