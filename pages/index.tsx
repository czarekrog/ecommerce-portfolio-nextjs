import type { GetServerSideProps, GetStaticProps } from "next";
import ProductsList from "../components/Products/ProductList/ProductsList";
import styles from "../styles/Home.module.css";
import { Product } from "../types/Products";

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  return (
    <div className={styles.container}>
      <ProductsList products={products} />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();
  return {
    props: {
      products,
    },
  };
};
