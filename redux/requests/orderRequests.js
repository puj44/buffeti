import { get, post } from "../api/apiWrapper";

export const placeOrderApi = ({payload}) =>{
    return post(`/order/place-order`,payload);
}

export const orderPaymentApi = ({payload}) =>{
    return post(`/payment/create-payment/${payload?.order_number}`,payload);
}

export const getOrdersApi = ({payload}) =>{
    return get(`/order/get-order`,payload);
}

export const getOrderDetailsApi = ({payload}) =>{
    return get(`/order/get-order-info/${payload}`);
}