// import OrderHeader from "@/components/OrderDetails/OrderHeader";
import { getOrderDetails } from "@/redux/reducers/orderReducer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
const OrderHeader = dynamic(
  () => import("@/components/OrderDetails/OrderHeader"),
  { ssr: false }
);

function OrderDetails() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { orderDetails } = useSelector((state) => state.order);
  const order = useMemo(() => {
    return orderDetails;
  }, [orderDetails]);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated && router?.query?.orderNumber) {
      dispatch(getOrderDetails(router?.query?.orderNumber));
    }
  }, [isAuthenticated, router?.query?.orderNumber]);

  return (
    <div className="page-spacing py-4">
      <OrderHeader
        orderStatus={
          order?.order_status === "confirmed" ? "Accepted" : order?.order_status
        }
        paymentStatus={order?.payment_status}
      />
    </div>
  );
}

export default OrderDetails;
