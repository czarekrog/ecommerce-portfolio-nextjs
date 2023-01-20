import { GetServerSideProps } from "next";
import React, { useState, useEffect } from "react";
import { OrderSummary } from "../../components/User/Orders/OrderSummary/OrderSummary";
import { useAuth } from "../../hooks/User/useAuth";
import { useFetchOrders } from "../../hooks/User/useFetchOrders";
import { OrderData } from "../../types/OrderData";
import { useRouter } from "next/router";

const Orders = () => {
  const { uid, isAuthenticated } = useAuth();
  const { fetchOrders, isLoading } = useFetchOrders();
  const [orders, setOrders] = useState<OrderData[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      const fetchedOrders = await fetchOrders({ uid });
      setOrders(fetchedOrders);
    }
    fetch();
  }, [fetchOrders, uid]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <h2>Orders history</h2>
      {isLoading && <p>Loading...</p>}
      {orders
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((order) => (
          <OrderSummary key={order.id} order={order} />
        ))}
    </div>
  );
};

export default Orders;
