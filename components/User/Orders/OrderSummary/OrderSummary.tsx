import React from "react";
import { OrderData } from "../../../../types/OrderData";
import moment from "moment";
import Image from "next/image";
import styles from "./OrderSummary.module.css";

interface Props {
  order: OrderData;
}

export const OrderSummary = ({ order }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <span className={styles.orderDate}>
          Date: {moment(order.date).format("D/MM/YYYY")}
        </span>
        <span className={styles.total}>Total: ${order.total}</span>
      </div>
      <div>
        <h4>Ordered Products</h4>
        {order.items.map((item) => (
          <div key={item.productId} className={styles.item}>
            <div className={styles.itemLeftContainer}>
              <Image
                src={item.image}
                width={30}
                height={30}
                alt="Product Image"
              />
              <span className={styles.title}>
                {item.title.substring(0, 30)}
                {item.title.length > 30 && "..."}
              </span>
            </div>
            <span>Amount: {item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
