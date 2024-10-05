import AddressDetails from "@/components/OrderDetails/AddressDetails";
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
    if (isAuthenticated === false) {
      router.push("/");
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
      <div className="flex flex-col md:grid md:grid-cols-[70%_30%] gap-3  w-full my-3">
        <div className="flex flex-col border-[1px] w-full border-[#A8A8AD80] rounded-lg p-3  sm:p-6 gap-5 sm:gap-7 ">
          <p className="px-2 sm:px-4 " style={{ color: "#525866" }}>
            {`ID: ` + (order?.order_number ?? "")}
          </p>
          <OrderInformation
            packs={order?.no_of_people ?? ""}
            deliveryDate={order?.delivery_date}
            deliveryTime={order?.delivery_time}
            // address={order?.address}
          />
          <div className="lg:px-[6%] 2xl:px-[15%] mb-4">
            <OrderStatusCard orderStatus={order?.order_status} />
          </div>

          <OrderSummary data={order} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <AddressDetails address={order?.delivery_address} />
          {order?.coupon_code && order?.coupon_code !== "" && (
            <div className="border-[1px] border-[#A8A8AD80] rounded-lg p-3 w-full flex flex-col gap-2">
              <p className="">Applied Coupon</p>
              <p className="text-[#2EB418] small-title">{`You saved ₹${
                order?.coupon_discount_value ?? ""
              } with ${order.coupon_code}`}</p>
            </div>
          )}
          {order?.cooking_instruction && order?.cooking_instruction !== "" && (
            <div className="border-[1px] border-[#A8A8AD80] rounded-lg p-3 w-full flex flex-col gap-2">
              <p className="">Cooking Instruction</p>
              <p className="text-color-dark-gray ">
                {order.cooking_instruction}
              </p>
            </div>
          )}
          {order?.total_billed_amount && (
            <div className="border-[1px] border-[#A8A8AD80] rounded-lg p-3 w-full flex flex-row items-center justify-between gap-2">
              <p className="font-semibold sub-title">Total</p>
              <p className="product-title font-medium">
                {"₹" + (order.total_billed_amount ?? "")}
              </p>
            </div>
          )}
          {(order?.payment_status === "pending" ||
            order?.payment_status === "partially_paid") && (
            <div
              className="w-full p-4"
              style={{ boxShadow: "0px -1px 8px 0px #0000001A" }}
            >
              <button
                className="btn primary-btn w-full"
                onClick={() => {
                  setShowPayment(true);
                }}
              >{`Pay ₹${order?.amount_due}`}</button>
            </div>
          )}
        </div>
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
