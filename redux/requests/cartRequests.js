import { get, post, put, remove } from "../api/apiWrapper";


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

export const updateCartItemApi = ({payload}) =>{
    return put("/cart/cart-items-update/"+payload.cart_item_id,payload);
}
export const updateCartApi = ({payload}) =>{
    return put("/cart/cart-update/"+payload.cart_id,payload);
}
export const deleteCartApi = ({payload}) =>{
    return remove("/cart/cart-delete/"+payload.cart_id,payload);
}
export const deleteCartItemApi = ({payload}) =>{
    return remove("/cart/cart-items-delete/"+payload.cart_item_id);
}