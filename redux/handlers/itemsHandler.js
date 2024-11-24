import { put, call } from "redux-saga/effects";
import { setCategories, setItemsData, setSearchItems } from "../reducers/itemsReducer";
import { getCategoriesApi, getItemsDataApi, searchItemsApi } from "../requests/itemsRequests";


export function* handleGetItemsData(action){
    try{
        const response = yield call(getItemsDataApi,action);
        yield put(setItemsData(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleSearchItems(action){
    try{
        const response = yield call(searchItemsApi,action);
        yield put(setSearchItems(response?.response?.data || response?.data));
    }catch(err){
        
    }
}
export function* handleGetCategories(action){
    try{
        const response = yield call(getCategoriesApi,action);
        yield put(setCategories(response?.response?.data || response?.data));
    }catch(err){
        
    }
}