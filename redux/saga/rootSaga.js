import { takeLatest, all, takeEvery } from "redux-saga/effects";
//AUTH HANDLERS
import {handleGetMobileOtp, handleGetTokenStatus, handleSignup, handleVerifyOtp} from "../handlers/authHandler";
import { handleGetData } from "../handlers/homeHandler";
import { handleGetFilters, handleGetPackagesData } from "../handlers/packageHandler";

export function* watcherSaga() {
    try{

        yield all([
            //AUTH
            yield takeLatest('auth/signup',handleSignup),
            yield takeLatest('auth/getMobileOtp',handleGetMobileOtp),
            yield takeLatest('auth/verifyOtp',handleVerifyOtp),
            yield takeLatest('auth/getTokenStatus',handleGetTokenStatus),
            //HOME
            yield takeLatest('home/getData',handleGetData),
            //PACKAGES
            yield takeEvery('packages/getPackagesData',handleGetPackagesData),
            yield takeLatest('packages/getFilters',handleGetFilters),
        ]);
    }catch(err){
        console.log("SAGA ERR:",err)
    }
}