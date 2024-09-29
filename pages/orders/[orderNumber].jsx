import { getOrderDetails, resetAction } from "@/redux/reducers/orderReducer";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const OrderHeader = dynamic(
  () => import("@/components/OrderDetails/OrderHeader"),
  { ssr: false }
);
const OrderInformation = dynamic(
  () => import("@/components/OrderDetails/OrderInformation"),
  { ssr: false }
);
const OrderStatusCard = dynamic(
  () => import("@/components/Orders/OrderStatusCard"),
  { ssr: false }
);
const OrderSummary = dynamic(
  () => import("@/components/OrderDetails/OrderSummary"),
  { ssr: false }
);
const PaymentModel = dynamic(
  () => import("@/components/Payment/PaymentModel"),
  { ssr: false }
);

function OrderDetails() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { orderDetails, orderPlaceResponse } = useSelector(
    (state) => state.order
  );
  const order = useMemo(() => {
    return orderDetails;
  }, [orderDetails]);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPayment, setShowPayment] = useState(false);

  const handleClosePayment = () => {
    setShowPayment(false);
  };
  useEffect(() => {
    if (isAuthenticated && router?.query?.orderNumber) {
      dispatch(getOrderDetails(router?.query?.orderNumber));
    }
  }, [isAuthenticated, router?.query?.orderNumber]);

  useEffect(() => {
    if (orderPlaceResponse?.success && orderPlaceResponse?.data?.orderNumber)
      if (order?.order_number) {
        setShowPayment(true);
        dispatch(resetAction());
      }
  }, [order, orderPlaceResponse]);

  return (
    <div className="page-spacing py-4">
      <OrderHeader
        orderStatus={
          order?.order_status === "confirmed" ? "Accepted" : order?.order_status
        }
        paymentStatus={order?.payment_status}
      />
      <div className="grid grid-flow-row p-6 gap-5 sm:gap-7">
        <p className="px-2 sm:px-4 " style={{ color: "#525866" }}>
          {`ID: ` + (order?.order_number ?? "")}
        </p>
        <OrderInformation
          packs={order?.no_of_people ?? ""}
          deliveryDate={order?.delivery_date}
          deliveryTime={order?.delivery_time}
          address={order?.address}
        />
        <div className="lg:px-[6%] 2xl:px-[15%] mb-4">
          <OrderStatusCard orderStatus={order?.order_status} />
        </div>

        <OrderSummary data={order} />
      </div>
      {showPayment && (
        <PaymentModel
          data={showPayment ? order : false}
          handleClose={handleClosePayment}
        />
      )}
    </div>
  );
}

export default OrderDetails;
