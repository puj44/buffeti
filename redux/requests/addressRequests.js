import {post,get,remove,put} from "../api/apiWrapper"

export const getAddressesApi = ({payload}) =>{
    
    return get("/profile/address/list",payload?.location ?? null);
}
export const addAddressesApi = ({payload}) =>{
    let obj = JSON.parse(JSON.stringify(payload));
    delete obj.location;
    delete obj.token;
    return post("/profile/address/add",obj,payload?.location ?? null);
}
export const editAddressesApi = ({payload}) =>{
    let obj = JSON.parse(JSON.stringify(payload));
    delete obj.location;
    delete obj.token;
    delete obj.id;
    delete obj._id;
    return put("/profile/address/edit/"+payload?.id,obj,payload?.location ?? null);
}
export const deleteAddressesApi = ({payload}) =>{
    
    return remove("/profile/address/delete/"+payload?.id,payload?.location ?? null);
}