import { put, call } from "redux-saga/effects";
import { addAddressesApi, deleteAddressesApi, editAddressesApi, getAddressesApi } from "../requests/addressRequests";
import { setAddAddress, setAddresses, setDeleteAddress, setEditAddress } from "../reducers/addressReducer";


export function* handleGetAddresses(action){
    try{
       
        const response = yield call(getAddressesApi,action);
        yield put(setAddresses(response?.response?.data || response?.data));
    }catch(err){
        console.log("HERE",err);
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
