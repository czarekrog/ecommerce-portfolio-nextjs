import "../styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import { AuthProvider } from "../hooks/User/useAuth";
import { CartProvider } from "../hooks/Cart/useCart";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>E-commerce portfolio app</title>
        <meta
          name="description"
          content="This is a portfolio app, build with Next.js"
        />
      </Head>
      <AuthProvider>
        <CartProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
