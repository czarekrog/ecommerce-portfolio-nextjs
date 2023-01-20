import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAuth } from "../../../hooks/User/useAuth";
import { useCart } from "../../../hooks/Cart/useCart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOut,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { isAuthenticated, signOutUser } = useAuth();
  const { cartCountAll } = useCart();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
      <div className={styles.userMenu}>
        <Link href="/cart">
          <a title="Shopping Cart">
            <FontAwesomeIcon
              className={styles.signOutButton}
              icon={faCartShopping}
            />
            {cartCountAll !== 0 && `(${cartCountAll})`}
          </a>
        </Link>
        <Link href="/account">
          <a title="User Profile">
            <FontAwesomeIcon className={styles.signOutButton} icon={faUser} />
          </a>
        </Link>
        {isAuthenticated && (
          <a title="Sign Out">
            <FontAwesomeIcon
              className={styles.signOutButton}
              icon={faSignOut}
              onClick={() => signOutUser()}
            />
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
