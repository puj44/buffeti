import { put, call } from "redux-saga/effects";
import { setData } from "../reducers/homeReducer";
import { getDataApi } from "../requests/homeRequests";


export function* handleGetData(action){
    try{
        const response = yield call(getDataApi,action);
        yield put(setData(response?.response?.data || response?.data));
    }catch(err){
        console.log(err);
    }
}