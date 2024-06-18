const { createSlice } = require("@reduxjs/toolkit");

export const itemsSlice = createSlice({
    name:"items",
    initialState:{
        isLoading:false,
        items:{},
        response:false,
        categories:{},
    },
    reducers:{
        getCategories:(state) =>{
        },

        setCategories:(state,{payload}) =>{
            state.isLoading = false
            state.categories = {...payload?.data?.categories ?? {}}
        },
        getItemsData:(state) =>{
            state.isLoading = true;
        },

        setItemsData:(state,{payload}) =>{
            state.isLoading = false
            state.items = {...payload?.data?.items ?? {}}
            state.response = true;
        },
    
        resetAction:(state) =>{
            state.isLoading = false;
            state.response = false
        }
    }
});

export const {setItemsData,getItemsData,resetAction, setCategories,
    getCategories} = itemsSlice.actions;

export default itemsSlice.reducer;