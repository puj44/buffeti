import { takeLatest, all, takeEvery } from "redux-saga/effects";
//AUTH HANDLERS
import {handleGetMobileOtp, handleGetTokenStatus, handleSignup, handleVerifyOtp} from "../handlers/authHandler";

export function* watcherSaga() {
    yield all([
        //AUTH
        yield takeLatest('auth/signup',handleSignup),
        yield takeLatest('auth/getMobileOtp',handleGetMobileOtp),
        yield takeLatest('auth/verifyOtp',handleVerifyOtp),
        yield takeLatest('auth/getTokenStatus',handleGetTokenStatus),
    ]);
}