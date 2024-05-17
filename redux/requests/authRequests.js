const { post,get } = require("../api/apiWrapper");

export const getOtpApi = ({payload}) =>{

    return post("/auth/signin",payload);
}