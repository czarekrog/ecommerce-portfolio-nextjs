import React, { Component, ComponentType, useEffect } from "react";
import { useAuth } from "../../hooks/User/useAuth";
import { useRouter } from "next/router";

// export function withAuth<P>(WrappedComponent: React.ComponentType<P & Props>) {
//   const { isAuthenticated } = useAuth();
//   const AuthenticatedComponent = (props: P) => {
//     return <WrappedComponent {...props} isAuthenticated={isAuthenticated} />;
//   };

//   return AuthenticatedComponent;
// }

// export const withAuth = <T extends unknown>(Component: React.FC): React.FC => {
//   const AuthenticatedComponent = () => {
//     const { isAuthenticated } = useAuth();
//     const router = useRouter();

//     return isAuthenticated ? <Component /> : <>{router.push("/auth")}</>;
//   };

//   return AuthenticatedComponent;
// };
