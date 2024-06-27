const { createSlice } = require("@reduxjs/toolkit");

export const itemsSlice = createSlice({
    name:"items",
    initialState:{
        isLoading:false,
        isSearchLoading:false,
        items:{},
        response:false,
        searchResponse:false,
        categories:{},
        searchedItems:{},
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
        searchItems:(state) =>{
            state.isSearchLoading = true;
        },

        setSearchItems:(state,{payload}) =>{
            state.isSearchLoading = false;
            state.searchedItems = {...payload?.data?.items ?? {}}
            state.searchResponse = true;
        },
        resetSearch:(state) =>{
            state.searchedItems = {};
        },
        resetAction:(state) =>{
            state.isLoading = false;
            state.response = false;
            state.searchResponse = false;
            
        }
    }
});

export const {setItemsData,getItemsData,resetAction, setCategories, setSearchItems, searchItems, resetSearch,
    getCategories} = itemsSlice.actions;

export default itemsSlice.reducer;