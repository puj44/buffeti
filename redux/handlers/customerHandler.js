import { put, call } from "redux-saga/effects";
import { setData } from "../reducers/homeReducer";
import { getDataApi } from "../requests/homeRequests";
import { getCustomerDetailsApi, updateProfileApi } from "../requests/customerRequests";
import { setProfile, updateProfileResponse } from "../reducers/customerReducer";


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