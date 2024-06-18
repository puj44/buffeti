import {post,get} from "../api/apiWrapper"

export const getItemsDataApi = ({payload}) =>{
    return get(`/items/get-items/${payload?.menuOption}/${payload?.category ?? (payload?.menuOption === "catering" ?"starters":"beverages")}`,payload?.location);
}

export const getCategoriesApi = ({payload}) =>{
        return get(`/items/get-categories/${payload?.menuOption}`,payload?.location);
    }