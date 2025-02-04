import { put, call } from "redux-saga/effects";
import { setData } from "../reducers/homeReducer";
import { getDataApi } from "../requests/homeRequests";
import { getCustomerDetailsApi, sendEmailOtpApi, updateProfileApi, verifyOtpApi } from "../requests/customerRequests";
import { sendEmailOtpResponse, setProfile, updateProfileResponse, verifyEmailOtpResponse } from "../reducers/customerReducer";
import { setToaster } from "../reducers/uiReducer";


export function* handleGetCustomerDetails(action){
    try{
        const response = yield call(getCustomerDetailsApi,action);
        yield put(setProfile(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleUpdateProfile(action){
    try{
        const response = yield call(updateProfileApi,action);
        yield put(updateProfileResponse(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleSendOtpEmail(action){
    try{
        const response = yield call(sendEmailOtpApi,action);
        const data = response?.response?.data || response?.data
        const message = data?.status === 200 || data?.statusCode === 200 ? "Check your mail for OTP." : data?.status === 400 || data?.statusCode === 400 ? data?.message : "Something went wrong!";
     
        yield put(setToaster({
            type:data?.status === 200 || data?.statusCode === 200 ? "success":"error",
            message:message
        }))
        yield put(sendEmailOtpResponse(data));
    }catch(err){
        
    }
}
export function* handleVerifyEmail(action){
    try{
        const response = yield call(verifyOtpApi,action);
        const data = response?.response?.data || response?.data
        const message = data?.status === 200 || data?.statusCode === 200 ? "Email verified successfully!" : data?.status === 400 || data?.statusCode === 400 ? data?.message : "Something went wrong!";
        yield put(setToaster({
            type:data?.status === 200 || data?.statusCode === 200 ? "success":"error",
            message:message
        }))
        yield put(verifyEmailOtpResponse(data));
    }catch(err){
        
    }
}