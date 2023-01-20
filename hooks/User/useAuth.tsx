import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { firebaseAuth, firestore } from "../../libs/firebase";
import { UserData } from "../../types/UserData";
import { RegisterData } from "./useCreateUser";
import { useFetchOrders } from "./useFetchOrders";
import { SignInData } from "./useSignIn";

type AuthContextData = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useProvideAuth();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!user;
  const uid = user?.uid;
  const { fetchOrders } = useFetchOrders();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      const [doc, getDoc] = await Promise.all([
        import("firebase/firestore").then((m) => m.doc),
        import("firebase/firestore").then((m) => m.getDoc),
      ]);

      let userDetails = {} as UserData;

      if (user) {
        const docRef = doc(firestore, `users/${uid}`);
        const docSnap = await getDoc(docRef);
        const fetchedData = docSnap.exists() ? docSnap.data() : {};
        userDetails = {
          firstName: fetchedData.firstName,
          lastName: fetchedData.lastName,
          uid: user.uid,
        };

        setUser(userDetails);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [fetchOrders, uid]);

  const createUser = useCallback(async (data: RegisterData) => {
    try {
      const [doc, setDoc, createUserWithEmailAndPassword] = await Promise.all([
        import("firebase/firestore").then((m) => m.doc),
        import("firebase/firestore").then((m) => m.setDoc),
        import("firebase/auth").then((m) => m.createUserWithEmailAndPassword),
      ]);

      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );

      await setDoc(doc(firestore, "users/", user.uid), {
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const signInUser = useCallback(async ({ email, password }: SignInData) => {
    const signInWithEmailAndPassword = await import("firebase/auth").then(
      (m) => m.signInWithEmailAndPassword
    );

    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }, []);

  const signOutUser = useCallback(() => {
    signOut(firebaseAuth);
  }, []);

  return {
    uid,
    user,
    createUser,
    signInUser,
    signOutUser,
    isAuthenticated,
    isLoading,
  };
};

export const useAuth = () => useContext(AuthContext);
