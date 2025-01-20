import React, { useEffect, useState } from "react";

function Profile({ details }) {
  const [isEdited, setEdited] = useState(false);
  const [profileData, setProfileData] = useState({ ...details });
  useEffect(() => {
    if (JSON.stringify(profileData) !== JSON.stringify(details)) {
      setEdited(true);
    }
  }, [profileData]);

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
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 ">
        <p className="font-semibold">{"Email"}</p>
        <div className="input-container">
          <input
            value={profileData?.email ?? ""}
            onChange={(e) => {
              setProfileData({ ...profileData, email: e.target.value });
            }}
          />
          <button className="verify-email" onClick={()=> verifyEmail({email:profileData?.email})}>Verify Now</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
