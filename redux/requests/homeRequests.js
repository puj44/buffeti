import {post,get} from "../api/apiWrapper"

export const getDataApi = ({payload}) =>{

    return get("/home/get-data"+(payload??""));
}