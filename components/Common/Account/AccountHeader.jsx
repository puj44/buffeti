import React from "react";

function AccountHeader({ mobile, settings, handleChangeSetting, active }) {
  if (mobile)
    return (
      <select
        className="select-box w-full"
        onChange={(e) => {
          handleChangeSetting(e.target.value);
        }}
        value={active ?? ""}
      >
        {settings?.map((loc) => {
          return (
            <option key={`setting-${loc}`} value={loc}>
              {loc?.charAt(0)?.toUpperCase() + loc.slice(1)}
            </option>
          );
        })}
      </select>
    );
  else {
    return (
      <div className=" flex flex-row gap-4 font-semibold w-full">
        {settings.map((s, idx) => {
          return (
            <div
              key={"setting-" + idx}
              className={`pb-1.5 px-1 w-fit cursor-pointer ${
                active === s ? "active-setting" : ""
              }`}
              onClick={() => {
                handleChangeSetting(s);
              }}
            >
              {s}
            </div>
          );
        })}
      </div>
    );
  }
}

export default AccountHeader;
