import {post,get} from "../api/apiWrapper"

export const getCustomerDetailsApi = ({payload}) =>{

    return get("/customers/get-customer-details");
}