import {
  addAddress,
  editAddress,
  resetAddress,
} from "@/redux/reducers/addressReducer";
import { setToaster } from "@/redux/reducers/uiReducer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const fields = [
  {
    title: "Full Name",
    field: "full_name",
    fieldType: "input",
    className: "w-full",
  },
  {
    title: "House/Building No.",
    field: "house_building_no",
    fieldType: "input",
    className: "w-full",
  },
  {
    title: "Address Line",
    field: "address",
    fieldType: "textarea",
    className: "w-full",
  },
  {
    title: "Area",
    field: "area",
    fieldType: "input",
    className: "w-full md:w-fit md:min-w-[290px]",
  },
  {
    title: "City",
    field: "city",
    fieldType: "select",
    className: "w-full md:w-fit md:min-w-[290px]",
  },
  {
    title: "Pincode",
    field: "pincode",
    fieldType: "input",
    className: "w-full max-w-[290px]",
  },
];
function AddressModel({ values, handleCloseModel, show }) {
  const { locations } = useSelector((state) => state.home);
  const [data, setData] = useState({ ...(values ?? {}) });
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { response, errorMessage } = useSelector((state) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [show]);

  const handleChangeInput = (e, field) => {
    if (
      ((field === "full_name" || field === "house_building_no") &&
        /^[A-Za-z0-9 ]*$/.test(e.target.value?.toString()?.trim())) ||
      (field === "area" &&
        /^[a-zA-Z0-9._%+-@]*$/.test(e.target.value?.toString()?.trim())) ||
      (field === "pincode" &&
        /^[0-9]\d*$/g.test(e.target.value) &&
        e.target.value?.length <= 6) ||
      field === "city" ||
      field === "address"
    ) {
      setData({ ...data, [field]: e.target.value });
    }
  };

  const handleSubmit = () => {
    setErrors({});

    let addressData = JSON.parse(JSON.stringify(data));
    let isValid = true;
    let errorMessages = {};
    fields.forEach((fd) => {
      if (!addressData?.[fd.field]) {
        isValid = false;
        errorMessages = {
          ...errorMessages,
          [fd.field]: `Please Enter ${fd.title}`,
        };
      }
    });
    setErrors({ ...errorMessages });
    if (!addressData?.lattitude && !addressData?.longitude) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          addressData.lattitude = position.coords.latitude?.toString();
          addressData.longitude = position.coords.longitude?.toString();
        });
      } else {
        // isValid = false;
        // setErrors({
        //   ...errors,
        //   location:
        //     "Geolocation is not available in your browser, please try different browser",
        // });
      }
    }
    if (isValid) {
      delete addressData?.customer;
      delete addressData?.updatedAt;
      delete addressData?.createdAt;
      delete addressData?.__v;
      setLoading(true);
      if (addressData?._id) {
        dispatch(
          editAddress({
            ...addressData,
            id: addressData?._id,
          })
        );
      } else {
        dispatch(
          addAddress({
            ...addressData,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
      if (!errorMessage) {
        handleCloseModel();
        dispatch(
          setToaster({
            type: "success",
            message: "Address saved successfully",
          })
        );
      } else {
        setResponseError(errorMessage);
        dispatch(
          setToaster({
            type: "error",
            message: "There was a problem saving address",
          })
        );
      }
      dispatch(resetAddress());
    }
  }, [response, errorMessage]);

  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setData({
          ...data,
          lattitude: position.coords.latitude?.toString(),
          longitude: position.coords.longitude?.toString(),
        });
      });
      dispatch(
        setToaster({
          type: "success",
          message: "Location detected successfully",
        })
      );
    } else {
      dispatch(
        setToaster({
          type: "error",
          message:
            "Geolocation is not available in your browser, please try different browser",
        })
      );
    }
  };
  if (show)
    return (
      <div className="fixed z-50 left-0 top-0  overflow-hidden w-dvw h-dvh bg-[rgb(0,0,0,0.3)] ">
        <div className="relative w-full h-full flex justify-center align-middle ">
          <div className="bg-white address-model flex flex-col gap-5 justify-between overflow-y-scroll sm:overflow-y-visible py-6 px-5 relative w-full h-full md:h-fit md:max-w-[642px] md:max-h-[800px] my-auto  rounded-lg ">
            <div className="grid grid-flow-row   gap-5">
              <p className="font-semibold">{"Address Details"}</p>
              <div
                className="btn primary-btn w-fit justify-self-end mt-2"
                onClick={() => {
                  handleDetectLocation();
                }}
              >
                <Image
                  src={"/icons/pin.webp"}
                  width={20}
                  height={20}
                  alt="pin"
                  priority
                />
                <p className="font-semibold ">{"Detect Location"}</p>
              </div>
              {errors && errors?.location && (
                <span className="small-title" style={{ color: "#475467" }}>
                  {errors?.location}
                </span>
              )}
              <div className="flex flex-wrap  gap-5">
                {fields.map((fd, idx) => {
                  return (
                    <div
                      key={"field-" + idx}
                      className={`flex flex-col gap-2 ${fd.className ?? ""}`}
                    >
                      <div className="flex flex-col gap-1.5 ">
                        <label
                          className="font-medium"
                          style={{ color: "#344054" }}
                        >
                          {fd.title}
                        </label>
                        {fd.fieldType === "input" ? (
                          <input
                            id={fd.field}
                            onChange={(e) => {
                              handleChangeInput(e, fd.field);
                            }}
                            value={data?.[fd.field] ?? ""}
                            className="input-group"
                            placeholder={fd.title}
                            style={{
                              padding: "10px 14px",
                            }}
                          />
                        ) : fd.fieldType === "textarea" ? (
                          <textarea
                            className="input-group"
                            style={{
                              padding: "10px 14px",
                            }}
                            placeholder={fd.title}
                            onChange={(e) => {
                              handleChangeInput(e, fd.field);
                            }}
                          >
                            {data?.[fd.field] ?? ""}
                          </textarea>
                        ) : fd.fieldType === "select" ? (
                          <select
                            className="select-box"
                            onChange={(e) => {
                              handleChangeInput(e, fd.field);
                            }}
                            style={{
                              padding: "10px 14px",
                            }}
                          >
                            <option selected disabled value="" className="">
                              {fd.title}
                            </option>
                            {locations?.map((loc) => {
                              return (
                                <option key={` location-${loc}`} value={loc}>
                                  {loc?.charAt(0)?.toUpperCase() + loc.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          ""
                        )}
                      </div>
                      {errors &&
                        errors?.[fd.field] &&
                        errors?.[fd.field] !== "" && (
                          <span
                            className="small-title"
                            style={{ color: "#475467" }}
                          >
                            {errors?.[fd.field]}
                          </span>
                        )}
                    </div>
                  );
                })}
              </div>
              {responseError && (
                <span className="text-color-secondary-red small-title">
                  {responseError}
                </span>
              )}
            </div>
            <div className=" flex flex-row gap-3 w-full ">
              <button
                className="w-full flex border-[1px] order-2 sm:order-1 font-semibold border-[#D0D5DD]  rounded-lg items-center justify-center py-2.5 px-[18px]"
                onClick={() => {
                  setData({});
                  setErrors({});
                  handleCloseModel();
                }}
                style={{
                  boxshadow: "0px 1px 2px 0px #1018280D",
                }}
              >
                {"Cancel"}
              </button>
              <button
                className="btn primary-btn order-1 sm:order-2 font-semibold w-full"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {isLoading ? (
                  <span className="loader"></span>
                ) : data?._id ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AddressModel;
