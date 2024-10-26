import Address from "@/components/Common/Account/Address";
import AddressModel from "@/components/Common/AddressModel";
import ConfirmationPopup from "@/components/Common/ConfirmationPopup";
import {
  deleteAddress,
  getAddresses,
  resetAddress,
} from "@/redux/reducers/addressReducer";
import { getProfile } from "@/redux/reducers/customerReducer";
import { getOrders } from "@/redux/reducers/orderReducer";
import { setToaster } from "@/redux/reducers/uiReducer";
import dynamic from "next/dynamic";
import Image from "next/image";
const AccountHeader = dynamic(
  () => import("@/components/Common/Account/AccountHeader"),
  { ssr: false }
);
const OrderListingCard = dynamic(
  () => import("@/components/Orders/OrderListingCard"),
  { ssr: false }
);
const PaymentModel = dynamic(
  () => import("@/components/Payment/PaymentModel"),
  { ssr: false }
);
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// const AccountHeader
const settings = [
  // "Profile",
  "Orders",
  "Saved Addresses",
];
function Account() {
  const [setting, setSetting] = useState("Orders");
  const [isLoading, setLoading] = useState(false);

  const { profile } = useSelector((state) => state.customer);
  const { orders } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { addresses, addressRemoveResponse, errorMessage, addressRemoved } =
    useSelector((state) => state.address);

  const [addressEdit, setAddressEdit] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [deleteAddressShow, setDeleteAddress] = useState(false);
  const dispatch = useDispatch();

  const handleShowPayment = (number) => {
    setShowPayment(number);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      switch (setting) {
        case "Profile":
          dispatch(getProfile());
          break;
        case "Orders":
          dispatch(getOrders());
          break;
        case "Saved Addresses":
          dispatch(getAddresses());
          break;
        default:
          break;
      }
    }
  }, [setting, isAuthenticated]);

  useEffect(() => {
    setLoading(false);
  }, [profile, orders, addresses]);

  useEffect(() => {
    if (addressRemoveResponse) {
      dispatch(
        setToaster({
          type: addressRemoved ? "success" : "error",
          message: addressRemoved
            ? "Address removed successfully"
            : "There was a problem deleting address...",
        })
      );
      handleCloseModel();
      dispatch(resetAddress());
    }
  }, [addressRemoveResponse, errorMessage, addressRemoved]);

  const handleChangeSetting = (val) => {
    setSetting(val);
  };

  const handleDeleteAddress = (val) => {
    setDeleteAddress(val);
  };
  const handleEditAddress = (val) => {
    setAddressEdit(val);
  };

  const handleCloseModel = () => {
    setAddressEdit(false);
    setDeleteAddress(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAddress({ id: deleteAddressShow }));
  };

  const renderSetting = useCallback(() => {
    switch (setting) {
      case "Profile":
        <div className="flex flex-col gap-4 px-4 py-2 w-full">
          <div className=""></div>
        </div>;
        break;
      case "Orders":
        return (
          <div className="flex flex-col gap-8 py-4 w-full">
            {orders?.length > 0
              ? orders.map((order, idx) => {
                  return (
                    <OrderListingCard
                      handleShowPayment={handleShowPayment}
                      key={"order-" + idx}
                      data={order}
                    />
                  );
                })
              : ""}
          </div>
        );
      case "Saved Addresses":
        return (
          <div>
            <div
              className="flex flex-row gap-3 items-center  cursor-pointer pb-3 w-full justify-end px-2"
              onClick={() => {
                setAddressEdit(true);
              }}
            >
              <Image
                src={"/icons/plus.webp"}
                width={14}
                height={14}
                alt="Plus"
                priority
              />
              <p className="font-medium">Add New Address</p>
            </div>
            <div className="flex flex-col p-2 gap-4">
              {addresses?.length > 0 &&
                addresses.map((addr, idx) => {
                  return (
                    <Address
                      data={addr}
                      key={"address-" + idx}
                      handleDeleteAddress={handleDeleteAddress}
                      handleEditAddress={handleEditAddress}
                    />
                  );
                })}
            </div>
          </div>
        );
      default:
        break;
    }
  }, [setting, profile, orders, addresses]);
  return (
    <div className="grid grid-flow-row gap-2 sm:gap-6 page-spacing py-4 w-full justify-normal">
      <p className="sm:px-8 font-semibold account-heading">{"Settings"}</p>
      <div className="flex sm:hidden w-full">
        <AccountHeader
          active={setting}
          settings={settings}
          handleChangeSetting={handleChangeSetting}
          mobile={true}
        />
      </div>
      <div
        className="hidden sm:flex  mx-8"
        style={{ borderBottom: "1px solid #EAECF0" }}
      >
        <AccountHeader
          active={setting}
          settings={settings}
          handleChangeSetting={handleChangeSetting}
        />
      </div>
      {isLoading ? (
        <div className="flex flex-row justify-center w-full h-full align-middle self-center py-10">
          <span className="  primary-loader"></span>
        </div>
      ) : (
        renderSetting()
      )}
      {showPayment && (
        <PaymentModel data={showPayment} handleClose={handleClosePayment} />
      )}
      {addressEdit && (
        <AddressModel
          handleCloseModel={handleCloseModel}
          values={addressEdit === true ? {} : addressEdit ?? {}}
          show={addressEdit}
        />
      )}
      {deleteAddressShow && (
        <ConfirmationPopup
          handleClose={handleCloseModel}
          show={deleteAddressShow}
          description={"Are you sure you want to delete this address?"}
          handleConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Account;
