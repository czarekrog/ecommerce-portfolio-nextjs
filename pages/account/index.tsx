import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/User/useAuth";
import styles from "../../styles/Account.module.css";

const Account = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h1>Your account summary</h1>
      <h2>Billing Details</h2>
      {user && (
        <>
          <p>
            Full name: {user.firstName} {user.lastName}
          </p>
          <p>Address: ul. Wołoska 12, 00-675 Warszawa</p>
          <p>Phone: 000-000-000</p>
        </>
      )}
      <Link href="/account/orders">
        <a className={styles.editAccountLink}>Orders</a>
      </Link>
      <p></p>
      <Link href="/account/edit">
        <a className={styles.editAccountLink}>Edit account</a>
      </Link>
    </div>
  );
};

export default Account;
