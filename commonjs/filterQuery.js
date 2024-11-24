const queries = [{field:"category"}, {field:"pricing",isArray:true}, {field:"no_of_people"}];
function filterQuery(filters,arr) {    
 let apiQuery = "";
    queries.filter((d, i) => {
        const field = d.field;
        apiQuery = apiQuery !== "" && apiQuery.charAt(apiQuery.length - 1) !== "&" ? apiQuery.concat("&") : apiQuery.concat("");
        const val = filters[field];
        if(d.isArray  && (filters[field] === 0 || filters[field])){
            if(d.field === "pricing"){
                const value = arr[field][val];
                apiQuery = apiQuery.concat(`min=${value?.min}${value?.max ? ("&max="+value.max):""}`)
            }else{
                apiQuery = apiQuery.concat(`${field}=${arr[field][val]}`)
            }
        }else if(filters?.[field] && filters[field] !== ""){
            apiQuery = apiQuery.concat(`${field}=${val}`)
        }
    });
    return apiQuery;
}
export default filterQuery;