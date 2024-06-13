// const { post,get } = require("../api/apiWrapper");
import {post,get} from "../api/apiWrapper"

export const signupApi = ({payload}) =>{

    return post("/customers/sign-up",payload);
}

export const getOtpApi = ({payload}) =>{

    return post("/auth/sign-in",payload);
}

export const verifyOtpApi = ({payload}) =>{

    return post("/auth/verify",payload);
}

export const getTokenStatusApi = ({payload}) =>{

    return get("/auth/check-status",payload);
}