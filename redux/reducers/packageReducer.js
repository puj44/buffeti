const { createSlice } = require("@reduxjs/toolkit");

export const packagesSlice = createSlice({
    name:"packages",
    initialState:{
        isLoading:false,
        filters:{},
        packages:{},
        response:false,
        packageData:{}
    },
    reducers:{
        getFilters:(state) =>{

        },
        getPackagesData:(state) =>{
            state.isLoading = true;
        },

        getPackage:(state) =>{
            state.isLoading = true;
        },

        setPackage:(state,{payload}) =>{
            state.isLoading = false;
            state.packageData = {...payload?.data?.package}
        },
        setFilters:(state,{payload}) =>{
            state.filters = {...payload?.data?.filters ?? {}}
        },
        
        setPackages:(state,{payload}) =>{
            state.filters = {...payload?.data?.filters ?? {}}
            state.packages = {...payload?.data?.packages ?? {}} 
            state.response = true;
            state.isLoading = false;
        },
        resetAction:(state) =>{
            state.response = false;
            state.isLoading = false;
        }
    }
});

export const {getPackagesData,getFilters,setPackages,setFilters,resetAction,getPackage,setPackage} = packagesSlice.actions;

export default packagesSlice.reducer;