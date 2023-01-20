import React, { useCallback, useState } from "react";
import { firestore } from "../../libs/firebase";
import { OrderData } from "../../types/OrderData";

interface Props {
  uid: string | undefined;
}

export const useFetchOrders = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async ({ uid }: Props) => {
    const [collection, getDocs] = await Promise.all([
      import("firebase/firestore").then((m) => m.collection),
      import("firebase/firestore").then((m) => m.getDocs),
    ]);

    const orders: OrderData[] = [];

    if (uid) {
      setIsLoading(true);

      const querySnapshot = await getDocs(
        collection(firestore, `users/${uid}/orders`)
      );

      querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        orders.push({
          id: doc.id,
          date: documentData.date.toDate(),
          items: documentData.items,
          total: documentData.total.toFixed(2),
        });
      });
      setIsLoading(false);
    }

    return orders;
  }, []);

  return {
    fetchOrders,
    isLoading,
  };
};
