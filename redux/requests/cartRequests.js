import { get, post } from "../api/apiWrapper";


export const getCartDetailsApi = ({payload}) =>{
    return get("/cart/get-information");
}
export const getCartApi = ({payload}) =>{
    return get("/cart/get-cart");
}

export const addToCartApi = ({payload}) =>{
    return post("/cart/add-to-cart",payload);
}
export const extraServicesApi = ({payload}) =>{
    return get("/cart/get-extra-services");
}