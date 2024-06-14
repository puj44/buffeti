const { createSlice } = require("@reduxjs/toolkit");

export const homeSlice = createSlice({
    name:"home",
    initialState:{
        isLoading:false,
        locations:[]
    },
    reducers:{
        getData:(state) =>{
            state.isLoading = true;
        },
        setData:(state,action) =>{
            state.isLoading = false;
            if(action?.payload?.statusCode === 200){
                state.locations = action?.payload?.data?.locations ?? [];
            }
        },
        getMenuOptions:(state) =>{
            state.isLoading = true;
        },
        setMenuOptions:(state) =>{
            state.isLoading = false;
        }
    }
});

export const {getData,setData,setMenuOptions,getMenuOptions} = homeSlice.actions;

export default homeSlice.reducer;