// import AccountHeader from '@/components/Common/Account/AccountHeader';
import OrderListingCard from "@/components/Orders/OrderListingCard";
import { getProfile } from "@/redux/reducers/customerReducer";
import { getOrders } from "@/redux/reducers/orderReducer";
import dynamic from "next/dynamic";
const AccountHeader = dynamic(
  () => import("@/components/Common/Account/AccountHeader"),
  { ssr: false }
);
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// const AccountHeader
const settings = [
  // "Profile",
  "Orders",
  // "Saved Address"
];
function Account() {
  const [setting, setSetting] = useState("Orders");
  const [isLoading, setLoading] = useState(false);

  const { profile } = useSelector((state) => state.customer);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    switch (setting) {
      case "Profile":
        dispatch(getProfile());
        break;
      case "Orders":
        dispatch(getOrders());
        break;
      case "Saved Address":
        break;
      default:
        break;
    }
  }, [setting]);

  useEffect(() => {
    setLoading(false);
  }, [profile, orders]);

  const handleChangeSetting = (val) => {
    setSetting(val);
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
          <div className="flex flex-col gap-4 py-4 w-full">
            {orders?.length > 0
              ? orders.map((order, idx) => {
                  return <OrderListingCard key={"order-" + idx} data={order} />;
                })
              : ""}
          </div>
        );
      case "Saved Address":
        break;
      default:
        break;
    }
  }, [setting, profile, orders]);
  return (
    <div className="grid grid-flow-row gap-6 page-spacing py-4 w-full justify-normal">
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
        className="hidden sm:flex w-full mx-8"
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
    </div>
  );
}

export default Account;
