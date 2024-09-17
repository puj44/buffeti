import Image from "next/image";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import PeopleQuantityInput from "./PeopleQuantityInput";
import { setCookie } from "cookies-next";
import { setCurrentLocation } from "@/redux/reducers/homeReducer";
import { useRouter } from "next/router";

function LoginContainer({
  step,
  changeStep,
  onInputChange,
  values,
  error,
  changeNumber,
  sendOTP,
  handleModelClick,
  verifyOtp,
  timer,
  isLoading,
  resendOTP,
}) {
  const { locations } = useSelector((state) => state.home);
  const [location, setLocation] = useState();
  const [err, setErr] = useState(false);
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const router = useRouter();
  const dispatch = useDispatch();
  const convertToMinute = (duration) => {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  };
  const handleChangeQuantity = (e, isUpdate = false, val) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdate) {
      if (val >= 10) {
        setQty(val);
      }
    } else {
      if (
        /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/.test(e.target.value) ||
        e.target.value === ""
      ) {
        if (parseInt(e.target.value) >= 1 && parseInt(e.target.value) < 10) {
        } else {
          setQty(e.target.value);
        }
      }
    }
  };

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      setErr(
        "Geolocation is not available in your browser, please try different browser"
      );
    }
  };

  const renderElement = () => {
    switch (step) {
      case "login":
        return (
          <>
            <div className="flex flex-col gap-2">
              <div className="input-group">
                <p>+91</p>
                <input
                  id="login_mobile_number"
                  onChange={(e) => {
                    onInputChange(e, "mobile_number");
                  }}
                  placeholder="Phone Number"
                  value={values?.mobile_number ?? ""}
                />
              </div>
              {error && (
                <span className={"text-color-secondary-red"} id="login-error">
                  {error}
                </span>
              )}
            </div>
            <button
              className={`btn primary-btn ${isLoading ? "opacity-60" : ""}`}
              onClick={() => {
                sendOTP();
              }}
              onKeyDown={(e) => {
                if (e.key === "enter") {
                  sendOTP();
                }
              }}
            >
              {isLoading ? <span className="loader"></span> : "Send OTP"}
            </button>
            <div className="grid grid-cols-[auto_5%_auto] gap-3 items-center">
              <div className=" border-[#A8A8AD] border-[0.5px] h-[1px] "></div>
              <p className="text-color-secondary-gray">Or</p>
              <span className=" border-[#A8A8AD] border-[0.5px] h-[1px]"></span>
            </div>
            <div className="flex flex-row gap-2  ">
              <p>New to Buffeti? </p>
              <p
                className="font-medium text-color-primary cursor-pointer"
                onClick={() => {
                  changeStep("register");
                }}
              >
                {" Create an account"}
              </p>
            </div>
          </>
        );
      case "register":
        return (
          <>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="input-group">
                    <p>+91</p>
                    <input
                      id={"register_mobile_number"}
                      onChange={(e) => {
                        onInputChange(e, "mobile_number");
                      }}
                      placeholder="Phone Number"
                      value={values?.mobile_number ?? ""}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <input
                    id={"full_name"}
                    onChange={(e) => {
                      onInputChange(e, "full_name");
                    }}
                    placeholder="Full Name"
                    value={values?.full_name ?? ""}
                  />
                </div>
                <div className="input-group">
                  <input
                    id={"email"}
                    onChange={(e) => {
                      onInputChange(e, "email");
                    }}
                    placeholder="Email (Optional)"
                    value={values?.email ?? ""}
                  />
                </div>
              </div>
              {error && (
                <span
                  className="text-color-secondary-red small-title"
                  id="register-error"
                >
                  {error}
                </span>
              )}
            </div>

            <button
              className={`btn primary-btn ${isLoading ? "opacity-60" : ""}`}
              onClick={() => {
                sendOTP();
              }}
              onKeyDown={(e) => {
                if (e.key === "enter") {
                  sendOTP();
                }
              }}
            >
              {isLoading ? <span className="loader"></span> : "Continue"}
            </button>
            <div className="grid grid-cols-[auto_5%_auto] gap-3 items-center">
              <div className=" border-[#A8A8AD] border-[0.5px] h-[1px] "></div>
              <p className="text-color-secondary-gray">Or</p>
              <span className=" border-[#A8A8AD] border-[0.5px] h-[1px]"></span>
            </div>
            <div className="flex flex-row gap-2 ">
              <p>Already have an account? </p>
              <p
                className="font-medium text-color-primary cursor-pointer"
                onClick={() => {
                  changeStep("login");
                }}
              >
                {" Sign in now"}
              </p>
            </div>
          </>
        );
      case "otp_verification":
        return (
          <>
            <div className="flex flex-row justify-between align-top gap-2 ">
              <p>
                {`Enter 4 digit code we sent to the mobile `}
                <span className="font-medium">{` +91 ${values?.mobile_number}`}</span>
              </p>
              <span
                className="text-color-primary font-medium cursor-pointer"
                onClick={() => {
                  changeNumber();
                }}
              >
                {"Change"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <OTPInput
                  value={values?.otp ?? ""}
                  onChange={(code) => {
                    onInputChange(code, "otp");
                  }}
                  numInputs={4}
                  // separator={<span style={{ width: "10px" }}></span>}
                  // renderSeparator={<span style={{ width: "10px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{
                    justifyContent: "space-between",
                  }}
                  inputType="tel"
                  inputStyle={{
                    border: `1px solid ${error ? "#D92D20" : "#E3E5E5"}`,
                    borderRadius: "8px",
                    width: "59px",
                    height: "48px",
                    fontSize: "16px",
                    color: "#1E1E24",
                    fontWeight: "400",
                    outline: "none",
                    caretColor: "#1E1E24",
                  }}
                />
              </div>
              {error && (
                <span className="text-color-secondary-red" id="register-error">
                  {error}
                </span>
              )}
            </div>
            <button
              className={`btn primary-btn ${isLoading ? "opacity-60" : ""}`}
              onClick={() => {
                verifyOtp();
              }}
            >
              {isLoading ? <span className="loader"></span> : "Continue"}
            </button>
            <div className="flex flex-row justify-between gap-1 ">
              <p>
                {"Didn't receive code? "}&nbsp;
                <span
                  className={`${
                    timer === 0 ? "text-color-primary cursor-pointer" : ""
                  } font-medium`}
                  onClick={() => {
                    resendOTP();
                  }}
                >
                  {" Resend Code"}
                </span>
              </p>
              {timer > 0 && (
                <p className="text-color-secondary-gray">
                  {timer >= 60 ? convertToMinute(timer) : "0:" + timer}
                </p>
              )}
            </div>
          </>
        );
      case "get_started":
        return (
          <>
            <div className="flex flex-col gap-4 ">
              <select
                className="select-box"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                value={location ?? ""}
              >
                <option selected disabled value="" className="">
                  Location
                </option>
                {locations?.map((loc) => {
                  return (
                    <option key={` location-${loc}`} value={loc}>
                      {loc?.charAt(0)?.toUpperCase() + loc.slice(1)}
                    </option>
                  );
                })}
              </select>
              <div
                className="flex flex-row gap-2 items-center cursor-pointer"
                onClick={() => {
                  detectLocation();
                }}
              >
                <Image
                  src={"/icons/gps.webp"}
                  width={24}
                  height={24}
                  alt="gps"
                  priority
                />
                <p className="text-color-secondary small-title">
                  {"Detect current location"}
                </p>
              </div>
              {err && (
                <span
                  className={"text-color-secondary-red"}
                  id="location-error"
                >
                  {err}
                </span>
              )}
            </div>
            {/* <PeopleQuantityInput quantity={qty ?? 10} handleChangeQuantity={handleChangeQuantity} /> */}
            <button
              className={`btn primary-btn ${isLoading ? "opacity-60" : ""}`}
              onClick={() => {
                if (location) {
                  setErr(false);
                  localStorage.setItem("visited", true);
                  setCookie("location", location, { maxAge: 9.461e7 });
                  handleModelClick(false);
                  dispatch(setCurrentLocation({ location: location }));
                  router.replace(router.asPath);
                } else {
                  setErr("Please select location");
                }
              }}
            >
              {isLoading ? <span className="loader"></span> : "Save"}
            </button>
          </>
        );
      default:
        return;
    }
  };
  return (
    <div className="flex flex-row gap-0">
      <div className="hidden md:block w-full">
        <Image
          loader={({ src }) => src}
          src={
            step === "get_started"
              ? `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/start_banner.webp`
              : `${process.env.NEXT_PUBLIC_IMAGES_URL}/banners/signup_banner.webp`
          }
          width={400}
          height={493}
          alt={"Signup Banner"}
          objectFit="cover"
          className="rounded-lg"
          priority
        />
      </div>
      <div className="w-full flex flex-col gap-0">
        {/* TITLE DIV */}
        <div className="hidden p-[24px] pb-0 md:flex flex-row justify-between items-center">
          <p className="sub-title font-medium">
            {step === "login"
              ? "Login"
              : step === "register"
              ? "Register"
              : step === "get_started"
              ? "Let's get started"
              : "OTP Verification"}
          </p>
          {step !== "get_started" && (
            <div
              className="cursor-pointer"
              onClick={() => {
                localStorage.setItem("visited", true);
                handleModelClick(false);
              }}
            >
              <Image
                src={"/icons/cross.webp"}
                width={13}
                height={13}
                alt={"Close"}
                priority
              />
            </div>
          )}
        </div>
        <div className="px-[20px] pt-[11px] h-[177px]  m-0 relative block md:hidden bg-[#F5F5F5] ">
          <div className="grid grid-rows-[50%_50%] h-full ">
            <div
              onClick={() => {
                localStorage.setItem("visited", true);
                handleModelClick(false);
              }}
              className="pt-5"
            >
              <Image
                src={"/arrows/l_arrow_d.webp"}
                width={8}
                height={14}
                alt={"Close"}
                priority
              />
            </div>
            <div className="grid grid-flow-row gap-2  self-start ">
              <p className="sub-title font-medium">
                {step === "login"
                  ? "Login"
                  : step === "register"
                  ? "Register"
                  : step === "get_started"
                  ? "Let's get started"
                  : "OTP Verification"}
              </p>
              <p className="text-color-dark-gray flex small-title max-w-[50%] xs:max-w-[100%]">
                {step === "login" || step === "register"
                  ? "Enter mobile number to continue"
                  : ""}
              </p>
            </div>
          </div>
          <div className="absolute right-0 bottom-0">
            <Image
              loader={({ src }) => src}
              src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/logo/primary_logo.webp`}
              alt="Buffeti"
              width={2049}
              height={1354}
              className="grayscale-[100%]"
              style={{
                width: "152px",
                height: "100px",
                opacity: 0.25,
              }}
              priority
            />
          </div>
        </div>
        {/* CONTAINER DIV */}
        <div className="p-[24px] flex flex-col gap-6">{renderElement()}</div>
      </div>
    </div>
  );
}

export default LoginContainer;
