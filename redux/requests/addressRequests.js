import {post,get,remove,put} from "../api/apiWrapper"

export const getAddressesApi = ({payload}) =>{
    
    return get("/profile/addresses/list",payload?.location ?? null, payload?.token ?? null);
}
export const addAddressesApi = ({payload}) =>{
    let obj = JSON.parse(JSON.stringify(payload));
    delete obj.location;
    delete obj.token;
    return post("/profile/addresses/add",obj,payload?.location ?? null, payload?.token ?? null);
}
export const editAddressesApi = ({payload}) =>{
    let obj = JSON.parse(JSON.stringify(payload));
    delete obj.location;
    delete obj.token;
    delete obj.id;
    return put("/profile/addresses/edit/"+payload.id,obj,payload?.location ?? null, payload?.token ?? null);
}
export const deleteAddressesApi = ({payload}) =>{
    
    return remove("/profile/addresses/delete"+payload.id,payload?.location ?? null, payload?.token ?? null);
}