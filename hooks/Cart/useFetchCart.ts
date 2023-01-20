import { useState, useEffect, useCallback } from "react";
import { firestore } from "../../libs/firebase";
import { AddToCartData } from "../../types/AddToCartData";
import { useAuth } from "../User/useAuth";

export const useFetchCart = () => {
  const { uid } = useAuth();

  const fetchCartProducts = useCallback(async () => {
    const [collection, getDocs] = await Promise.all([
      import("firebase/firestore").then((m) => m.collection),
      import("firebase/firestore").then((m) => m.getDocs),
    ]);

    const products: AddToCartData[] = [];

    if (uid) {
      const querySnapshot = await getDocs(
        collection(firestore, `users/${uid}/cart`)
      );

      querySnapshot.forEach((doc) => {
        const documentData = doc.data() as AddToCartData;
        products.push({ ...documentData, databaseCartItemId: doc.id });
      });
    }

    return products;
  }, [uid]);

  return { fetchCartProducts };
};
