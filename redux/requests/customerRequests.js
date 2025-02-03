import {post,get, put} from "../api/apiWrapper"

export const getCustomerDetailsApi = ({payload}) =>{

    return get("/customers/get-customer-details");
}
export const updateProfileApi = ({payload}) =>{

    return put("/profile/update-profile", payload);
}