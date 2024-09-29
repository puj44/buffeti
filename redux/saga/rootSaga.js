import { takeLatest, all, takeEvery } from "redux-saga/effects";
//AUTH HANDLERS
import {handleGetMobileOtp, handleGetTokenStatus, handleSignout, handleSignup, handleVerifyOtp} from "../handlers/authHandler";
import { handleGetData } from "../handlers/homeHandler";
import { handleGetFilters, handleGetPackage, handleGetPackagesData } from "../handlers/packageHandler";
import { handleGetCategories, handleGetItemsData, handleSearchItems } from "../handlers/itemsHandler";
import { handleAddAddress, handleDeleteAddress, handleEditAddress, handleGetAddresses } from "../handlers/addressHandler";
import { handleAddToCart, handleApplyCoupon, handleCartDelete, handleCartItemDelete, handleCartItemUpdate, handleCartUpdate, handleGetCartData, handleGetCartDetails, handleGetExtraServices, handleRemoveCoupon } from "../handlers/cartHandler";
import { handleGetCustomerDetails } from "../handlers/customerHandler";
import { handleGetOrderDetails, handleGetOrders, handleOrderPayment, handlePlaceOrder } from "../handlers/orderHandler";

export function* watcherSaga() {
    try{

        yield all([
            //AUTH
            yield takeLatest('auth/signup',handleSignup),
            yield takeLatest('auth/getMobileOtp',handleGetMobileOtp),
            yield takeLatest('auth/verifyOtp',handleVerifyOtp),
            yield takeLatest('auth/getTokenStatus',handleGetTokenStatus),
            yield takeLatest('auth/signout',handleSignout),
            //HOME
            yield takeLatest('home/getData',handleGetData),
            //PACKAGES
            yield takeLatest('packages/getPackagesData',handleGetPackagesData),
            yield takeLatest('packages/getFilters',handleGetFilters),
            yield takeLatest('packages/getPackage',handleGetPackage),
            //ITEMS
            yield takeLatest('items/getItemsData',handleGetItemsData),
            yield takeLatest('items/searchItems',handleSearchItems),
            yield takeLatest('items/getCategories',handleGetCategories),
            //ADDRESS
            yield takeLatest('address/getAddresses',handleGetAddresses),
            yield takeLatest('address/addAddress',handleAddAddress),
            yield takeLatest('address/editAddress',handleEditAddress),
            yield takeLatest('address/deleteAddress',handleDeleteAddress),
            //CART
            yield takeLatest('cart/getCartDetails',handleGetCartDetails),
            yield takeLatest('cart/addToCart',handleAddToCart),
            yield takeLatest('cart/getCart',handleGetCartData),
            yield takeLatest('cart/getExtraServices',handleGetExtraServices),
            yield takeLatest('cart/updateCart',handleCartUpdate),
            yield takeLatest('cart/updateCartItem',handleCartItemUpdate),
            yield takeLatest('cart/deleteCart',handleCartDelete),
            yield takeLatest('cart/deleteCartItem',handleCartItemDelete),
            yield takeLatest('cart/applyCoupon',handleApplyCoupon),
            yield takeLatest('cart/removeCoupon',handleRemoveCoupon),
            //CUSTOMER
            yield takeLatest('customer/getProfile', handleGetCustomerDetails),

            //ORDERS
            yield takeLatest('order/placeOrder',handlePlaceOrder),
            yield takeLatest('order/getOrders',handleGetOrders),
            yield takeLatest('order/orderPayment',handleOrderPayment),
            yield takeLatest('order/getOrderDetails',handleGetOrderDetails),
        ]);
    }catch(err){
        console.log("ROOT SAGA ERROR:", err)
    }
}