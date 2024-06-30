const { createSlice } = require("@reduxjs/toolkit");

export const homeSlice = createSlice({
    name:"home",
    initialState:{
        isLoading:false,
        locations:[],
        filters:{},
        currentLocation:"",
        loginModel:false
    },
    reducers:{
        getData:(state) =>{
            state.isLoading = true;
        },
        setData:(state,action) =>{
            
            state.isLoading = false;
            state.locations = action?.payload?.data?.locations ?? [];
        },
        getMenuOptions:(state) =>{
            state.isLoading = true;
        },
        setMenuOptions:(state) =>{
            state.isLoading = false;
        },
        setCurrentLocation:(state,{payload}) =>{
            state.currentLocation = payload?.location ?? null;
        },
        setLoginModel:(state,{payload}) =>{
            state.loginModel = payload?.open ?? false;
        }
    }
});

export const {getData,setData,setMenuOptions,getMenuOptions,setCurrentLocation,setLoginModel} = homeSlice.actions;

export default homeSlice.reducer;