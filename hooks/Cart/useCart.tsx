import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { firestore } from "../../libs/firebase";
import { AddToCartData } from "../../types/AddToCartData";
import { CheckoutData } from "../../types/CheckoutData";
import { useAuth } from "../User/useAuth";
import { useFetchCart } from "./useFetchCart";

type CartContextData = ReturnType<typeof useProvideCart>;

const CartContext = createContext({} as CartContextData);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useProvideCart();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useProvideCart = () => {
  const [products, setProducts] = useState<AddToCartData[]>([]);
  const { uid } = useAuth();
  const { fetchCartProducts } = useFetchCart();

  useEffect(() => {
    fetchCartProducts().then((products) => {
      setProducts(products);
    });
  }, [fetchCartProducts, uid]);

  const updateCartAmount = useCallback(
    async (productId: string, amount: number) => {
      const [doc, updateDoc] = await Promise.all([
        import("firebase/firestore").then((m) => m.doc),
        import("firebase/firestore").then((m) => m.updateDoc),
      ]);

      const productToUpdate = products.find(
        (product) => product.productId === productId
      );

      if (productToUpdate) {
        const productRef = doc(
          firestore,
          `users/${uid}/cart/${productToUpdate.databaseCartItemId}`
        );

        uid &&
          (await updateDoc(productRef, {
            amount: productToUpdate.amount + amount,
          }));

        setProducts((prev) =>
          prev.map((product) => {
            if (product.productId === productId) {
              return {
                ...product,
                amount: product.amount + amount,
              };
            } else {
              return product;
            }
          })
        );
      }
    },
    [products, uid]
  );

  const addToCart = useCallback(
    async (data: AddToCartData) => {
      try {
        const [addDoc, collection] = await Promise.all([
          import("firebase/firestore").then((m) => m.addDoc),
          import("firebase/firestore").then((m) => m.collection),
        ]);

        //Check if product is already in cart and if yes, then we get its index
        const productIndex = products.findIndex(
          (item) => item.productId === data.productId
        );

        if (productIndex !== -1) {
          updateCartAmount(data.productId, data.amount);
        } else {
          const docRef = await addDoc(
            collection(firestore, `users/${uid}/cart/`),
            data
          );
          setProducts((prev) => [
            ...prev,
            { ...data, databaseCartItemId: docRef.id },
          ]);
        }
      } catch (err) {
        console.error(err);
      }
    },
    [products, uid, updateCartAmount]
  );

  const removeFromCart = useCallback(
    async (databaseId: string) => {
      const [doc, deleteDoc] = await Promise.all([
        import("firebase/firestore").then((m) => m.doc),
        import("firebase/firestore").then((m) => m.deleteDoc),
      ]);

      const docRef = doc(firestore, `users/${uid}/cart/${databaseId}`);
      deleteDoc(docRef);

      setProducts((prev) =>
        prev.filter((product) => product.databaseCartItemId !== databaseId)
      );
    },
    [uid]
  );

  const removeAll = useCallback(async () => {
    products.forEach((product) => removeFromCart(product.databaseCartItemId!));
  }, [products, removeFromCart]);

  // Calculating cart total, to provide it clearly where it's needed
  const cartTotal = products.reduce(
    (prevValue, currentValue) =>
      (prevValue += currentValue.amount * currentValue.singlePiecePrice),
    0
  );

  // Calculating all products in the cart to provide it clearly where it's needed
  const cartCountAll = products.reduce(
    (prevValue, currentValue) => (prevValue += currentValue.amount),
    0
  );

  const checkout = useCallback(async () => {
    const [doc, addDoc, collection] = await Promise.all([
      import("firebase/firestore").then((m) => m.doc),
      import("firebase/firestore").then((m) => m.addDoc),
      import("firebase/firestore").then((m) => m.collection),
    ]);

    const data: CheckoutData = {
      items: products,
      total: cartTotal,
      date: new Date(),
    };

    await addDoc(collection(firestore, `users/${uid}/orders`), data);

    await removeAll();

    console.log("checkout");
  }, [cartTotal, products, removeAll, uid]);

  return {
    items: products,
    addToCart,
    removeAll,
    updateCartAmount,
    removeFromCart,
    checkout,
    cartTotal,
    cartCountAll,
  };
};

export const useCart = () => useContext(CartContext);
