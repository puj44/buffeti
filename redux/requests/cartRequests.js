import { get, post } from "../api/apiWrapper";


export const getCartDetailsApi = ({payload}) =>{
    return get("/cart/get-information");
}

export const addToCartApi = ({payload}) =>{
    return post("/cart/add-to-cart",payload);
}