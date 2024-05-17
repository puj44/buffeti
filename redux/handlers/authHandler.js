import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse } from "../reducers/authReducer";


export function* handleGetMobileOtp(){
    try{
        yield put(setMobileOtpResponse());
    }catch(err){
        console.log(err);
    }
}

