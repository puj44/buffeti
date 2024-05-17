import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse } from "../reducers/authReducer";
import { getOtpApi } from "../requests/authRequests";


export function* handleGetMobileOtp(action){
    try{
        
        const response = yield call(getOtpApi,action);
        yield put(setMobileOtpResponse());
    }catch(err){
        console.log(err);
    }
}

