import { AppProps } from "next/app";
import React from "react";
import Navbar from "../../components/Nav/Navbar/Navbar";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default MainLayout;
