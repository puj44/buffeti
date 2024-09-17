import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoginContainer from "./LoginContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getMobileOtp,
  resetResponse,
  signup,
  verifyOtp,
} from "@/redux/reducers/authReducer";
import { hasCookie } from "cookies-next";
import useRecaptcha from "@/hooks/useRecaptcha";

function LoginModel({ handleModelClick, isModalOpen, isFirstTime }) {
  const {
    otpSecondsLeft,
    isLoading,
    otpResponse,
    errorMessage,
    isAuthenticated,
  } = useSelector((state) => state.auth);
  const [step, setStep] = useState(
    isFirstTime ? (isAuthenticated ? "get_started" : "register") : "login"
  );
  const [prevStep, setPrevStep] = useState();
  const [values, setValues] = useState({});
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otpResent, setOtpResent] = useState(false);

  const executeRecaptcha = useRecaptcha();

  const dispatch = useDispatch();

  const changeStep = (val) => {
    setError(false);
    if (val !== "otp_verification") {
      setValues({});
    }
    setStep(val);
  };

  const changeNumber = () => {
    setStep(prevStep);
  };

  const onInputChange = (e, field) => {
    if (
      field === "otp" ||
      (field === "full_name" &&
        /^[A-Za-z0-9 ]*$/.test(e.target.value?.toString()?.trim())) ||
      (field === "mobile_number" &&
        /^[0-9]\d*$/g.test(e.target.value) &&
        e.target.value?.length <= 10) ||
      e.target.value === "" ||
      (field === "email" &&
        /^[a-zA-Z0-9._%+-@]*$/.test(e.target.value?.toString()?.trim()))
    ) {
      setValues({ ...values, [field]: field === "otp" ? e : e.target.value });
    } else {
      e.preventDefault();
    }
  };

  const resendOTP = async () => {
    const token = await executeRecaptcha("login");
    dispatch(
      getMobileOtp({
        mobile_number: values.mobile_number,
        token: token,
      })
    );
    setOtpResent(true);
  };

  const sendOTP = async () => {
    let valid = true;
    if (values?.mobile_number?.length !== 10) {
      setError("Mobile Number must be 10 digits");
      valid = false;
    }
    if (step === "register") {
      if (!values?.full_name || values?.full_name?.length <= 2) {
        setError("Name must be at least 3 characters");
        valid = false;
      }
      if (values?.email) {
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            values?.email
          )
        ) {
          setError("Please enter a valid Email");
          valid = false;
        }
      }
    }
    if (valid) {
      const token = await executeRecaptcha("signup");
      setError(false);
      if (step === "register") {
        dispatch(
          signup({
            mobile_number: values.mobile_number,
            name: values.full_name,
            email: values.email ?? "",
            token: token,
          })
        );
      } else {
        const token = await executeRecaptcha("login");

        dispatch(
          getMobileOtp({
            mobile_number: values.mobile_number,
            token: token,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (otpResponse) {
      if (otpSecondsLeft && Number(otpSecondsLeft) > 0) {
        setTimer(Number(otpSecondsLeft));
        setPrevStep(step);
        changeStep("otp_verification");
        dispatch(resetResponse());
      } else {
        if (errorMessage && errorMessage !== "") {
          setError(errorMessage);
        } else {
          if (step === "register" || step === "login") {
            setPrevStep(step);
            changeStep("otp_verification");
            dispatch(resetResponse());
          } else if (step === "otp_verification") {
            if (localStorage.getItem("visited")) {
              handleModelClick(false);
            } else {
              changeStep("get_started");
            }
            dispatch(resetResponse());
          }
        }
      }
      setOtpResent(false);
    }
  }, [dispatch, step, otpResponse, errorMessage, otpSecondsLeft]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const verify = () => {
    if (values?.otp?.length !== 4) {
      setError("OTP must be 4 digits");
      return;
    } else {
      dispatch(
        verifyOtp({
          otp: values?.otp,
          mobile_number: values?.mobile_number,
        })
      );
    }
  };

  if (isModalOpen)
    return (
      <div className="fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] ">
        <div className="relative w-full h-full flex justify-center align-middle ">
          <div className="bg-white  relative w-full h-full md:w-[800px] md:h-[493px] my-auto  rounded-lg ">
            <LoginContainer
              handleModelClick={handleModelClick}
              step={step}
              changeStep={changeStep}
              changeNumber={changeNumber}
              error={error}
              onInputChange={onInputChange}
              values={values}
              sendOTP={sendOTP}
              verifyOtp={verify}
              timer={timer}
              isLoading={isLoading}
              resendOTP={resendOTP}
            />
          </div>
        </div>
      </div>
    );
}

export default LoginModel;
