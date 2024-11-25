import { orderPayment } from "@/redux/reducers/orderReducer";
import { setToaster } from "@/redux/reducers/uiReducer";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PaymentModel({ data, handleClose }) {
  const [paymentMode, setPaymentMode] = useState(
    data.payment_status === "partially_paid" ? "full_payment" : "advance"
  );
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { orderPaymentResponse } = useSelector((state) => state.order);

  const isAdvancePayment = useMemo(() => {
    return paymentMode === "advance"
      ? Math.ceil(data.total_billed_amount * 0.2)
      : false;
  }, [paymentMode, data?.total_billed_amount]);

  const handlePayment = () => {
    dispatch(
      orderPayment({
        order_number: data.order_number,
        payment_mode: paymentMode,
      })
    );
  };

  // load razorpay
  const loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const initializePayment = async (data) => {
    const callbackURL = `${
      process.env.NEXT_PUBLIC_ENVIRONMENT === "DEV"
        ? "https://dev.buffeti.com"
        : "https://buffeti.com"
    }/account`;
    console.log("HERE", data);

    const container = document.createElement("div");

    const bodyFormData = document.createElement("form");
    bodyFormData.id = "rzp-embedded-form";
    bodyFormData.method = "post";
    bodyFormData.action = "https://api.razorpay.com/v1/checkout/embedded";
    const fields = {
      key_id: process.env.NEXT_PUBLIC_TEST_KEY_ID,
      order_id: data.order_id,
      name: "GNV CLICK2CATER",
      "prefill[name]": data.prefill.name ?? "",
      "prefill[contact]": data.prefill.contact ?? "",
      "prefill[email]": data.prefill.email ?? "",
      amount: data.amount,
      currency: "INR",
      callback_url: callbackURL,
      cancel_url: callbackURL,
      redirect: "true",
    };
    for (const key in fields) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = fields[key];
      bodyFormData.appendChild(input);
    }
    container.appendChild(bodyFormData);
    document.body.appendChild(container);

    bodyFormData.submit();
  };
  const createPayment = async (data) => {
    initializePayment(data);
  };

  useEffect(() => {
    if (orderPaymentResponse?.success || orderPaymentResponse?.error) {
      setLoading(false);
      if (orderPaymentResponse?.success) {
        createPayment(orderPaymentResponse.data);
      }
    }
  }, [orderPaymentResponse]);
  return (
    <div className="fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] ">
      <div className="relative w-full h-full flex justify-center align-middle ">
        <div className="bg-white  relative p-6 w-full h-full md:w-[642px] md:h-fit my-auto flex flex-col gap-4 rounded-lg ">
          <div className="flex flex-row justify-between align-middle">
            <span
              className="flex justify-center align-middle w-[48px] h-[48px]"
              style={{
                boxShadow: "0px 1px 2px 0px #1018280D",
                border: "1px solid #EAECF0",
                borderRadius: "10px",
              }}
            >
              <Image
                src={"/icons/rupee.webp"}
                style={{ width: "24px", height: "24px" }}
                width={24}
                height={24}
                className="m-auto"
                alt="₹"
              />
            </span>
            <span
              className="cursor-pointer pt-2"
              onClick={() => {
                handleClose();
              }}
            >
              <Image
                src={"/icons/close.webp"}
                width={16}
                height={16}
                alt="Close"
              />
            </span>
          </div>
          {data.payment_status === "partially_paid" ? (
            <div className="flex flex-col justify-center gap-3 py-3 px-1 w-full">
              <p className="font-bold mx-auto huge-title">{`₹ ${data.amount_due}`}</p>
              <p className="mx-auto font-medium sub-title text-color-dark-gray">
                {"Amount Due"}
              </p>
            </div>
          ) : (
            <>
              {isAdvancePayment && (
                <div className="flex flex-col justify-center gap-3 py-3 px-1 w-full bg-[#F8F8F8] rounded-lg">
                  <p className="font-bold mx-auto huge-title">{`₹ ${isAdvancePayment}`}</p>
                  <p className="mx-auto font-medium sub-title text-color-dark-gray">
                    {"20% Amount"}
                  </p>
                </div>
              )}
              <div className="flex flex-col justify-center gap-3 py-3 px-1 w-full">
                <p className="font-bold mx-auto huge-title">{`₹ ${data.total_billed_amount}`}</p>
                <p className="mx-auto font-medium sub-title text-color-dark-gray">
                  {"Total Amount"}
                </p>
              </div>
            </>
          )}
          {data.payment_status === "pending" && (
            <div className="flex flex-col gap-1">
              <p className="font-medium " style={{ color: "#344054" }}>
                Payment
              </p>
              <select
                className="select-box "
                style={{ padding: "10px 14px" }}
                onChange={(e) => {
                  setPaymentMode(e.target.value);
                }}
                value={paymentMode ?? ""}
              >
                <option value={"advance"}>{"20% Advance Payment"}</option>
                <option value={"full_payment"}>{"Full Payment"}</option>
              </select>
              <p className="small-title" style={{ color: "#475467" }}>
                {isAdvancePayment
                  ? "20% of Total Amount will be paid in Advance."
                  : "Total Amount will be Paid."}
              </p>
            </div>
          )}
          <button
            className="btn primary-btn w-full h-fit font-semibold"
            onClick={() => {
              !isLoading && handlePayment();
            }}
          >
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              `Proceed to pay ₹ ${
                data.payment_status === "partially_paid"
                  ? data.amount_due
                  : isAdvancePayment
                  ? isAdvancePayment
                  : data.total_billed_amount
              }`
            )}
          </button>
        </div>
      </div>
      <div id="razorpay-checkout"></div>
    </div>
  );
}

export default PaymentModel;
