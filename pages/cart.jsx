import SavedAddresses from "@/components/Cart/SavedAddresses";
import { getAddresses, resetAddress } from "@/redux/reducers/addressReducer";
import React, { useEffect, useState } from "react";
import { END } from "redux-saga";
import { wrapper } from "../redux/store";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  applyCoupon,
  deleteCart,
  deleteCartItem,
  getCart,
  getExtraServices,
  removeCoupon,
  resetCart,
  updateCart,
  updateCartItem,
} from "@/redux/reducers/cartReducer";
// import CartItems from '@/components/Cart/CartItems';
import { searchDebounce } from "@/commonjs/debounce";
import ExtraServices from "@/components/Cart/ExtraServices";
import CouponCard from "@/components/Cart/CouponCard";
import CookingInstruction from "@/components/Cart/CookingInstruction";
// import CartSummary from '@/components/Cart/CartSummary';
import dynamic from "next/dynamic";
import { placeOrder, resetAction } from "@/redux/reducers/orderReducer";
import moment from "moment";
import { setToaster } from "@/redux/reducers/uiReducer";
const CartSummary = dynamic(() => import("@/components/Cart/CartSummary"), {
  ssr: false,
});
const CartItems = dynamic(() => import("@/components/Cart/CartItems"), {
  ssr: false,
});
let nextDate = new Date();
nextDate.setDate(nextDate.getDate() + 1);
function Cart() {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const { addresses, response, errorMessage } = useSelector(
    (state) => state.address
  );
  const [cartData, setCartData] = useState({
    delivery_date: nextDate,
    delivery_time: "11:45",
  });
  const [cartItemsData, setCartItemsData] = useState({});
  const [couponError, setCouponError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const {
    cart,
    extraServices,
    updateResponse,
    deleteResponse,
    redirect,
    couponMessage,
  } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { orderPlaceResponse } = useSelector((state) => state.order);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response) {
      dispatch(getCart());
      dispatch(resetAddress());
    }
  }, [response]);
  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddresses());
    dispatch(getExtraServices());
  }, [dispatch]);

  useEffect(() => {
    if (orderPlaceResponse?.success) {
      setLoading(false);
      router.push("/account");
      dispatch(resetAction());
    } else if (orderPlaceResponse?.error) {
      setLoading(false);
      dispatch(resetAction());
    }
  }, [orderPlaceResponse]);

  useEffect(() => {
    if (couponMessage) {
      setCouponError(couponMessage);
    }
  }, [couponMessage]);

  useEffect(() => {
    if (updateResponse) {
      if (redirect) {
        router.push("/");
      }
      dispatch(resetCart());
    }
  }, [updateResponse, redirect]);

  useEffect(() => {
    if (deleteResponse) {
      if (redirect) {
        router.push("/");
      }
      dispatch(resetCart());
    }
  }, [deleteResponse, redirect]);

  useEffect(() => {
    setSavedAddresses([...(addresses ?? [])]);
    if (response && !errorMessage) {
      if (addresses?.length) {
        setCartData({
          ...cartData,
          delivery_address_id: addresses?.[addresses?.length - 1]?._id,
        });
      }
    }
  }, [addresses, response, errorMessage]);

  useEffect(() => {
    if (cart) {
      let cartDetails = JSON.parse(JSON.stringify(cart));
      if (!cartDetails?.delivery_date) {
        cartDetails.delivery_date = nextDate;
        cartDetails.delivery_time = "11:45";
      }
      setCartItemsData({ ...cart?.cart_data });
      delete cartDetails?.cart_data;
      if (!cartDetails.delivery_address_id) {
        cartDetails.delivery_address_id = addresses?.[0]?._id;
        // callCartUpdate(cartDetails);
      }
      setCartData({ ...cartDetails });
    }
  }, [cart]);

  useEffect(() => {}, []);

  const callCartItemUpdate = (item) => {
    if (cartData?.menu_option === "mini-meals") {
      dispatch(
        updateCartItem({
          cart_item_id: item?.cart_item_id,
          no_of_people: item?.no_of_people,
        })
      );
    } else {
      dispatch(
        updateCartItem({
          cart_item_id: item?.cart_item_id,
          no_of_people: item?.no_of_people,
          items: item?.items,
        })
      );
    }
  };
  const callCartItemDelete = (id) => {
    dispatch(
      deleteCartItem({
        cart_item_id: id,
      })
    );
  };

  const callCartUpdate = (data) => {
    if (data?.delivery_date) {
      data.delivery_date = moment(data.delivery_date).format("YYYY-MM-DD");
    }
    if (!data?.delivery_address_id) {
      data.delivery_address_id = addresses?.[0]?._id;
    }
    dispatch(
      updateCart({
        cart_id: cartData?.cart_id,
        ...data,
      })
    );
  };

  const handleSelectAddress = (id) => {
    callCartUpdate({ ...cartData, delivery_address_id: id });
  };

  const handleChangeQuantity = (e, isUpdate = false, val) => {
    e.preventDefault();
    e.stopPropagation();
    let itemsData = JSON.parse(JSON.stringify(cartItemsData));
    if (isUpdate) {
      if (val >= 10) {
        callCartItemUpdate(
          { ...itemsData, no_of_people: val },
          cartData?.menu_option
        );
      }
    } else {
      if (
        /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/.test(e.target.value) ||
        e.target.value === ""
      ) {
        if (parseInt(e.target.value) < 10) {
          callCartItemDelete(itemsData?.cart_item_id);
        } else {
          callCartItemUpdate(
            { ...itemsData, no_of_people: e.target.value },
            cartData?.menu_option
          );
        }
      }
    }
  };

  //ITEMS FUNCTIONS
  const handleAddItem = (item, extraItem = false, preparation = false) => {
    let itemsData = JSON.parse(JSON.stringify(cartItemsData));
    if (preparation) {
      itemsData.items[item.slug]["selected_preparation"] = preparation;
    } else if (extraItem) {
      itemsData.items[item.slug] = {
        ...itemsData.items[item.slug],
        added_extra_items: {
          ...itemsData.items[item.slug]?.added_extra_items,
          [extraItem]: 1,
        },
      };
    }
    callCartItemUpdate(itemsData, cartData?.menu_option);
  };

  const handleDeleteItem = (item, extraItemSlug = false) => {
    let itemsData = JSON.parse(JSON.stringify(cartItemsData));
    if (extraItemSlug) {
      delete itemsData?.items?.[item?.slug]?.added_extra_items?.[extraItemSlug];
      callCartItemUpdate(itemsData, menuOption);
    } else {
      if (cartData?.menu_option === "mini-meals") {
        callCartItemDelete(itemsData?.[item?.slug]?.cart_item_id);
      } else {
        delete itemsData?.items?.[item?.slug];
        callCartItemUpdate(itemsData, cartData?.menu_option);
      }
    }
  };

  const handleChangeAdditionalQty = (
    item,
    isSubtract,
    extraItemSlug = false,
    menuOption
  ) => {
    let itemsData = JSON.parse(JSON.stringify(cartItemsData));
    if (menuOption !== "mini-meals") {
      if (extraItemSlug) {
        const qty = Number(
          itemsData?.items?.[item.slug]?.added_extra_items?.[extraItemSlug] ?? 0
        );

        itemsData.items[item.slug].added_extra_items = {
          ...itemsData.items[item.slug]?.added_extra_items,
          [extraItemSlug]: isSubtract
            ? Number(qty) > 0
              ? Number(qty) - 1
              : 0
            : Number(qty) + 1,
        };
      } else {
        itemsData.items[item.slug] = {
          ...itemsData.items[item.slug],
          additional_qty: isSubtract
            ? Number(itemsData.items[item.slug].additional_qty ?? 0) > 0
              ? Number(itemsData.items[item.slug].additional_qty) - 1
              : 0
            : Number(itemsData.items[item.slug].additional_qty ?? 0) + 1,
        };
      }
      callCartItemUpdate(itemsData, menuOption);
    } else {
      itemsData[item.slug].no_of_people = isSubtract
        ? Number(itemsData[item.slug].no_of_people - 1)
        : Number(itemsData[item.slug].no_of_people + 1);
      callCartItemUpdate(itemsData[item.slug], menuOption);
    }
    // setCartItemsData({...itemsData});
  };

  const handleChangeExtraService = (field) => {
    let cartDetails = JSON.parse(JSON.stringify(cartData));
    let extraServicesData = cartDetails.extra_services ?? [];
    if (extraServicesData?.includes(field)) {
      const idx = extraServicesData.indexOf(field);
      extraServicesData.splice(idx, 1);
    } else {
      extraServicesData.push(field);
    }
    cartDetails.extra_services = extraServicesData;
    callCartUpdate(cartDetails);
    // setCartData({...cartDetails});
  };

  const handleApplyCoupon = (val) => {
    dispatch(
      applyCoupon({
        cart_id: cartData?.cart_id,
        code: val,
      })
    );
  };
  const handleRemoveCoupon = (val) => {
    dispatch(
      removeCoupon({
        cart_id: cartData?.cart_id,
      })
    );
  };
  const handleChangeInstruction = searchDebounce((val) => {
    let cartDetails = JSON.parse(JSON.stringify(cartData));
    cartDetails.cooking_instruction = val;
    callCartUpdate(cartDetails);
  });

  const handleChangeDate = (e) => {
    let cartDetails = JSON.parse(JSON.stringify(cartData));
    cartDetails.delivery_date = e;
    callCartUpdate(cartDetails);
    // setCartData({ ...cartData, delivery_date: e });
  };

  const handleRemoveCart = () => {
    dispatch(
      deleteCart({
        cart_id: cartData?.cart_id,
      })
    );
  };
  const handleChangeTime = (val) => {
    let cartDetails = JSON.parse(JSON.stringify(cartData));
    cartDetails.delivery_time = val;
    callCartUpdate(cartDetails);
    // setCartData({ ...cartData, delivery_time: val });
  };

  const handlePlaceOrder = () => {
    if (!cartData?.delivery_address_id) {
      dispatch(
        setToaster({
          type: "error",
          message: "Please select or add an address",
        })
      );
    } else {
      setLoading(true);
      dispatch(placeOrder());
    }
  };

  return (
    <div className="page-spacing py-4">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-col gap-4 w-full md:max-w-[650px] lg:max-w-[1180px] 2xl:max-w-[1180px]">
          <SavedAddresses
            addresses={[...savedAddresses]}
            handleSelectAddress={handleSelectAddress}
            selectedAddress={cartData?.delivery_address_id}
          />
          <div className="flex flex-col">
            {Object.keys(cartItemsData ?? {})?.length > 0 && (
              <CartItems
                cartData={cartData}
                cartItemsData={cartItemsData}
                handleChangeQuantity={handleChangeQuantity}
                handleAddItem={handleAddItem}
                handleDeleteItem={handleDeleteItem}
                handleChangeAdditionalQty={handleChangeAdditionalQty}
                handleRemoveCart={handleRemoveCart}
              />
            )}
            <div
              className="w-full hidden  md:flex bg-white flex-col sm:flex-row gap-3 p-4 justify-between sticky bottom-0 left-0"
              style={{
                boxShadow: " 0px -1px 8px 0px #0000001A",
                zIndex: "10",
              }}
            >
              <button
                className="order-2 md:order-1 border-[1px] py-2 sm:py-3 px-8 rounded-lg font-medium border-[#B42318] flex justify-center items-center text-color-primary"
                onClick={() => {
                  handleRemoveCart();
                }}
              >
                {"Remove all"}
              </button>
              <button
                className="btn primary-btn font-medium order-1 md:order-2"
                onClick={() => {
                  handlePlaceOrder();
                }}
              >
                {isLoading ? <span className="loader"></span> : "Place Order"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col self-start gap-4 md:max-w-[380px] w-full">
          {extraServices && extraServices?.length ? (
            <ExtraServices
              data={extraServices}
              handleChangeExtraService={handleChangeExtraService}
              selectedData={cartData?.extra_services ?? []}
            />
          ) : (
            ""
          )}
          <div className="flex w-full">
            <CouponCard
              handleApplyCoupon={handleApplyCoupon}
              couponError={couponError}
              couponDiscount={
                cartData?.billing_details?.coupon_discount ?? null
              }
              couponType={cartData?.billing_details?.coupon_type}
              couponCode={cartData?.coupon_code ?? null}
              handleRemoveCoupon={handleRemoveCoupon}
            />
          </div>
          <CookingInstruction
            value={cartData?.cooking_instruction ?? ""}
            handleChangeInstruction={handleChangeInstruction}
          />
          {cartData?.billing_details && (
            <CartSummary
              data={cartData?.billing_details ?? {}}
              handleChangeDate={handleChangeDate}
              handleChangeTime={handleChangeTime}
              deliveryDate={cartData?.delivery_date}
              deliveryTime={cartData?.delivery_time}
            />
          )}
        </div>
      </div>
      <div
        className="w-full mt-2 flex md:hidden bg-white flex-row gap-3 p-4 justify-between sticky bottom-0"
        style={{ boxShadow: " 0px -1px 8px 0px #0000001A" }}
      >
        <button
          className=" border-[1px] py-2 px-4 sm:py-3 sm:px-8 rounded-lg font-medium border-[#B42318] flex justify-center items-center text-color-primary"
          onClick={() => {
            handleRemoveCart();
          }}
        >
          {"Remove all"}
        </button>
        <button
          onClick={() => {
            handlePlaceOrder();
          }}
          className="bg-primary rounded-lg text-white py-2 px-4 sm:py-3 sm:px-8 flex justify-center items-center font-medium  "
        >
          {"Place Order"}
        </button>
      </div>
    </div>
  );
}
export default Cart;
