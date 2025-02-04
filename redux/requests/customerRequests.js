import {post,get, put} from "../api/apiWrapper"

export const getCustomerDetailsApi = ({payload}) =>{

    return get("/customers/get-customer-details");
}
export const updateProfileApi = ({payload}) =>{

    return put("/profile/update-profile", payload);
}

export const sendEmailOtpApi = () =>{
    return post("/profile/send-otp-email");
}
export const verifyOtpApi = ({payload}) =>{
    return post("/profile/verify-email",payload);
}