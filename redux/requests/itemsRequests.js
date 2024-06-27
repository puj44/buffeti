import {post,get} from "../api/apiWrapper"

export const getItemsDataApi = ({payload}) =>{
    return get(`/items/get-items/${payload?.menuOption}/${payload?.category ?? (payload?.menuOption === "catering" ?"starters":"beverages")}?is_jain=${payload?.jain ?? false}`,payload?.location);
}
export const searchItemsApi = ({payload}) =>{
    return get(`/items/get-items/${payload?.menuOption}/${payload?.category ?? (payload?.menuOption === "catering" ?"starters":"beverages")}?search=${payload?.search}&is_jain=${payload?.jain ?? false}`,payload?.location);
}

export const getCategoriesApi = ({payload}) =>{
        return get(`/items/get-categories/${payload?.menuOption}`,payload?.location);
    }