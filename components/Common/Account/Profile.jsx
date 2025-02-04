import Image from "next/image";
import React, { useEffect, useState } from "react";
import VerifyEmail from "../VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  resetOtpResponse,
  resetProfile,
  sendEmailOtp,
  updateProfileAction,
} from "@/redux/reducers/customerReducer";
import { setToaster } from "@/redux/reducers/uiReducer";

function Profile({ details }) {
  const [isEdited, setEdited] = useState(false);
  const [profileData, setProfileData] = useState({ ...details });
  const [emailPopup, setEmailPopup] = useState(false);
  const dispatch = useDispatch();
  const { profileResponse, emailOtpResponse } = useSelector(
    (state) => state.customer
  );
  const [isLoading, setLoading] = useState(false);
  const handleClosePopup = () => {
    setEmailPopup(false);
  };

  useEffect(() => {
    setProfileData({ ...(details ?? {}) });
  }, [details]);

  useEffect(() => {
    if (JSON.stringify(profileData) !== JSON.stringify(details)) {
      setEdited(true);
    }
  }, [profileData]);

  const updateProfile = () => {
    setLoading(true);
    dispatch(updateProfileAction(profileData));
  };

  useEffect(() => {
    if (profileResponse.success === true || profileResponse.success === false) {
      setLoading(false);
      setEdited(false);
      dispatch(
        setToaster({
          type: profileResponse.success ? "success" : "error",
          message: profileResponse.message,
        })
      );
      dispatch(resetProfile());
      dispatch(getProfile());
    }
  }, [profileResponse]);

  useEffect(() => {
    if (emailOtpResponse.success || emailOtpResponse.success === false) {
      emailOtpResponse.success && setEmailPopup(true);
      dispatch(resetOtpResponse());
    }
  }, [emailOtpResponse]);

  return (
    <div className="grid grid-flow-row gap-3">
      <div className="grid grid-flow-row sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 ">
          <p className="font-semibold">{"Name"}</p>
          <div className="input-container">
            <input
              value={profileData?.name ?? ""}
              onChange={(e) => {
                setProfileData({ ...profileData, name: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="font-semibold">{"Contact Number"}</p>
          <div className="input-container">
            <input
              value={profileData?.mobile_number ?? ""}
              onChange={(e) => {
                setProfileData({
                  ...profileData,
                  mobile_number: e.target.value,
                });
              }}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-w-[800px]">
        <p className="font-semibold">{"Email"}</p>
        <div className="input-container items-center pe-2">
          <input
            value={profileData?.email ?? ""}
            onChange={(e) => {
              setProfileData({ ...profileData, email: e.target.value });
            }}
          />
          {profileData?.is_email_verified ? (
            <div style={{ width: "20px", height: "20px" }} title="Veified">
              <Image
                src={"/icons/success_t.webp"}
                width={20}
                height={20}
                alt="Verified"
                // unoptimized
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ) : (
            <button
              onClick={() => {
                dispatch(sendEmailOtp());
              }}
              className="text-color-secondary text-nowrap bg-white"
              disabled={isEdited ?? false}
            >
              {"Verify Now"}
            </button>
          )}
        </div>
        {!profileData?.is_email_verified && (
          <p className="small-title">
            {"Click on Verify Now to get your email address verified."}
          </p>
        )}
      </div>
      {emailPopup && (
        <VerifyEmail
          email={profileData?.email ?? ""}
          handleClosePopup={handleClosePopup}
        />
      )}
      <div className="justify-end">
        {isEdited && (
          <button
            className="btn primary-btn"
            onClick={() => {
              updateProfile();
            }}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Update"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
