import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Product } from "../../../types/Products";
import styles from "../../../styles/Product.module.css";
import Image from "next/image";
import { AddToCart } from "../../../components/AddToCart/AddToCart";

type Props = {
  product: Product;
};

const product = ({ product }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.gallery}>
        <Image
          src={product.image}
          width="500px"
          height="500px"
          alt="Product image"
        />
      </div>
      <div className={styles.summary}>
        <div>
          <h1>{product.title}</h1>
          <p>
            Rating: {product.rating.rate} - {product.rating.count}
          </p>
        </div>
        <div className={styles.priceAndCart}>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <AddToCart product={product} />
        </div>
      </div>
      <div className={styles.description}>
        <h2>Product Desctiption</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/${context.params.id}`
  );
  const product: Product = await res.json();
  return {
    props: { product },
  };
};
