const { createSlice } = require("@reduxjs/toolkit");

export const packagesSlice = createSlice({
    name:"packages",
    initialState:{
        isLoading:false,
        filters:{},
        packages:{},
        response:false,
    },
    reducers:{
        getFilters:(state) =>{

        },
        getPackagesData:(state) =>{
            state.isLoading = true;
        },


        setFilters:(state,{payload}) =>{
            state.filters = {...payload?.data?.filters ?? {}}
        },
        
        setPackages:(state,{payload}) =>{
            state.isLoading = false;
            state.response = true;
            state.filters = {...payload?.data?.filters ?? {}}
            state.packages = {...payload?.data?.packages ?? {}} 
        },
        resetAction:(state) =>{
            state.response = false
        }
    }
});

export const {getPackagesData,getFilters,setPackages,setFilters,resetAction} = packagesSlice.actions;

export default packagesSlice.reducer;