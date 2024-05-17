import { takeLatest, all, takeEvery } from "redux-saga/effects";
//AUTH HANDLERS
import {handleGetMobileOtp, handleGetTokenStatus} from "../handlers/authHandler";

export function* watcherSaga() {
    yield all([
        //AUTH
        yield takeLatest('auth/getMobileOtp',handleGetMobileOtp),
        yield takeLatest('auth/getTokenStatus',handleGetTokenStatus),
    ]);
}