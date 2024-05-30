// const { post,get } = require("../api/apiWrapper");
import {post,get} from "../api/apiWrapper"

export const getOtpApi = ({payload}) =>{

    return post("/auth/sendOtp",payload);
}

export const getTokenStatusApi = ({payload}) =>{

    return get("/auth/check-status",payload);
}