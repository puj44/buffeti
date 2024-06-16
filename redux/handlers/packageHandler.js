import { put, call } from "redux-saga/effects";
import { getFiltersApi, getPackagesApi } from "../requests/packageRequests";
import { setFilters, setPackages } from "../reducers/packageReducer";


export function* handleGetFilters(action){
    try{
        const response = yield call(getFiltersApi,action);
        yield put(setFilters(response?.response?.data || response?.data));
    }catch(err){
        console.log(err);
    }
}
export function* handleGetPackagesData(action){
    try{
        const response = yield call(getPackagesApi,action);
        yield put(setPackages(response?.response?.data || response?.data));
    }catch(err){
        console.log(err);
    }
}