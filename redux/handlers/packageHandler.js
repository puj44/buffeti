import { put, call } from "redux-saga/effects";
import { getFiltersApi, getPackageApi, getPackagesApi } from "../requests/packageRequests";
import { setFilters, setPackage, setPackages } from "../reducers/packageReducer";


export function* handleGetFilters(action){
    try{
        const response = yield call(getFiltersApi,action);
        yield put(setFilters(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleGetPackagesData(action){
    try{
        const response = yield call(getPackagesApi,action);
        yield put(setPackages(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleGetPackage(action){
    try{
        const response = yield call(getPackageApi,action);
        yield put(setPackage(response?.response?.data || response?.data));
    }catch(err){
        
    }
}