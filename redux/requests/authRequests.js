const { post,get } = require("../api/apiWrapper");

export const getOtpApi = ({payload}) =>{

    return post("/auth/signin",payload);
}

export const getTokenStatusApi = ({payload}) =>{

    return get("/auth/check-status",payload);
}