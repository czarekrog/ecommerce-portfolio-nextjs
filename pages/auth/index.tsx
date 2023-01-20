import React, { useEffect } from "react";
import { AuthContainer } from "../../components/User/Auth/AuthContainer/AuthContainer";
import { useAuth } from "../../hooks/User/useAuth";
import { useRouter } from "next/router";

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    isAuthenticated && router.push("/account");
  }, [isAuthenticated, router]);

  return <AuthContainer />;
};

export default AuthPage;
