import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/User/useAuth";

const EditAccount = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);
  return <div>edit</div>;
};

export default EditAccount;
