import { put, call } from "redux-saga/effects";
import { addAddressesApi, deleteAddressesApi, detectLocationApi, editAddressesApi, getAddressesApi } from "../requests/addressRequests";
import { setAddAddress, setAddresses, setDeleteAddress, setEditAddress, setLocation } from "../reducers/addressReducer";
import { setToaster } from "../reducers/uiReducer";


export function* handleGetAddresses(action){
    try{
       
        const response = yield call(getAddressesApi,action);
        yield put(setAddresses(response?.response?.data || response?.data));
    }catch(err){
    }
}
export function* handleAddAddress(action){
    try{
        const response = yield call(addAddressesApi,action);
        yield put(setAddAddress(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleEditAddress(action){
    try{
        const response = yield call(editAddressesApi,action);
        yield put(setEditAddress(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleDeleteAddress(action){
    try{
        const response = yield call(deleteAddressesApi,action);
        yield put(setDeleteAddress(response?.response?.data || response?.data));
    }catch(err){
        
    }
}

export function* handleDetectLocation(action){
    try{
        const response = yield call(detectLocationApi,action);
        const data = response?.response?.data || response?.data;
        if( data?.statusCode >= 400 && data?.statusCode <= 500){
            yield put(setToaster({type:"error",message:"Something went wrong!"}))
        }
        yield put(setLocation(data));
    }catch(err){
        
    }
}

