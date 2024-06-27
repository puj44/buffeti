import {post,get} from "../api/apiWrapper"

export const getFiltersApi = ({payload}) =>{
    
    return get("/packages/get-filters/"+payload?.menuOption,payload?.location ?? null);
}
export const getPackagesApi = ({payload}) =>{
    
    return get("/packages/get-packages/"+payload?.menuOption,payload?.location ?? null);
}
export const getPackageApi = ({payload}) =>{
    
    return get("/packages/get-package/"+payload?.menuOption+"/"+payload?.packageSlug,payload?.location ?? null);
}