import { put, call } from "redux-saga/effects";
import { setMobileOtpResponse,isAuthenticated } from "../reducers/authReducer";
import { getOtpApi, getTokenStatusApi} from "../requests/authRequests";


export function* handleGetMobileOtp(action){
    try{
        const response = yield call(getOtpApi,action);
        console.log("here22",response);
        yield put(setMobileOtpResponse());
    }catch(err){
        console.log(err);
    }
}

export function* handleGetTokenStatus(action){
    try{
        
        const response = yield call(getTokenStatusApi,action);
        
        let authenticated = response.status === 200 ?? false
        yield put(isAuthenticated({authenticated}));
    }catch(err){
        console.log(err);
    }
}


