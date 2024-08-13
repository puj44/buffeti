import { get, post } from "../api/apiWrapper";

export const placeOrderApi = ({payload}) =>{
    return post(`/order/place-order`,payload);
}
export const getOrdersApi = ({payload}) =>{
    return get(`/order/get-order`,payload);
}