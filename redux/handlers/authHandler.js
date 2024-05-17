import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse } from "../reducers/authReducer";
import { getOtpApi, getTokenStatusApi } from "../requests/authRequests";


export function* handleGetMobileOtp(action){
    try{
        const response = yield call(getOtpApi,action);
        yield put(setMobileOtpResponse());
    }catch(err){
        console.log(err);
    }
}

export function* handleGetTokenStatus(action){
    try{
        const response = yield call(getTokenStatusApi,action);
        let isAuthenticated = response.status === 200 ?? false
        yield put(isAuthenticated({isAuthenticated}));
    }catch(err){
        console.log(err);
    }
}


