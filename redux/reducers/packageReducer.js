const { createSlice } = require("@reduxjs/toolkit");

export const packagesSlice = createSlice({
    name:"packages",
    initialState:{
        isLoading:false,
        filters:{},
        packages:{}
    },
    reducers:{
        getFilters:(state) =>{

        },
        getPackagesData:(state) =>{
        },


        setFilters:(state,{payload}) =>{
            state.filters = payload?.data?.filters ?? {}
        },
        
        setPackages:(state,{payload}) =>{
            state.packages = payload?.data?.packages ?? {}
        },
    }
});

export const {getPackagesData,getFilters,setPackages,setFilters} = packagesSlice.actions;

export default packagesSlice.reducer;