import {
  getProfile,
  resetOtpResponse,
  verifyEmailOtp,
} from "@/redux/reducers/customerReducer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";

const VerifyEmail = ({ handleClosePopup, email }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [isResent, setIsResent] = useState(false);
  const { verifyOtpResponse } = useSelector((state) => state.customer);
  const verifyOtp = () => {
    dispatch(verifyEmailOtp({ otp: otp }));
  };

  useEffect(() => {
    if (verifyOtpResponse.success || verifyOtpResponse.success === false) {
      if (verifyOtpResponse.success) {
        handleClosePopup();
        dispatch(getProfile());
      }
      dispatch(resetOtpResponse());
    }
  }, [verifyOtpResponse]);
  return (
    <div className="fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] ">
      <div className="relative w-full h-full flex justify-center align-middle ">
        <div className="bg-white address-model flex flex-col gap-5 justify-between overflow-y-scroll sm:overflow-y-visible py-6 px-5 relative w-full h-full md:h-fit md:max-w-[408px] md:max-h-[366px] my-auto  rounded-lg ">
          <div className="grid grid-flow-row  justify-center gap-5">
            <div className="mx-auto">
              <Image
                src={"/icons/check_mail.webp"}
                width={48}
                height={48}
                alt="Check Mail"
              />
            </div>
            <div className="grid gap-1 mx-auto text-center">
              <p className="font-semibold description">
                {"Please check your email."}
              </p>
              <p className="small-title">
                {`We've sent a code to `}
                <span className="font-semibold">{email}</span>
              </p>
            </div>
            <div className="grid gap-2">
              <OTPInput
                value={otp ?? ""}
                onChange={(code) => {
                  setOtp(code);
                }}
                numInputs={4}
                // separator={<span style={{ width: "10px" }}></span>}
                // renderSeparator={<span style={{ width: "10px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                renderInput={(props) => (
                  <input
                    {...props}
                    onKeyDown={(e) => {
                      if (e.key?.toLowerCase() === "enter") {
                        verifyOtp();
                      }
                    }}
                    style={{
                      border: `2px solid ${
                        props?.value !== "" ? "#B42318" : "#D9D9D9"
                      }`,
                      color: props?.value !== "" ? "#B42318" : "#1E1E24",
                      borderRadius: "8px",
                      width: "80px",
                      height: "80px",
                      fontSize: "48px",
                      fontWeight: "500",
                      outline: "none",
                      textAlign: "center",
                      caretColor: "#1E1E24",
                      boxShadow: "0px 1px 2px 0px #1018280D",
                    }}
                  />
                )}
                containerStyle={{
                  gap: "8px",
                }}
                inputType="tel"
              />
              {!isResent && (
                <p className="small-title">
                  {"Didn’t get a code? "}
                  <span
                    className="cursor-pointer underline"
                    onClick={() => {
                      setIsResent(true);
                    }}
                  >
                    {"Click to resend"}
                  </span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 w-full gap-4">
              <button
                className=" flex  border-[1px]  font-semibold border-[#D0D5DD]  rounded-lg items-center justify-center py-2.5 px-[18px]"
                onClick={() => {
                  handleClosePopup();
                }}
                style={{
                  boxshadow: "0px 1px 2px 0px #1018280D",
                }}
              >
                {"Cancel"}
              </button>
              <button className="btn primary-btn">{"Verify"}</button>
            </div>
          </div>
          <span
            className="cursor-pointer pt-2 absolute top-4 right-4"
            onClick={() => {
              handleClosePopup();
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
      </div>
    </div>
  );
};

export default VerifyEmail;
