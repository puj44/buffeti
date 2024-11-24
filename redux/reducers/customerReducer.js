const { createSlice } = require("@reduxjs/toolkit");

export const customerSlice = createSlice({
    name:"customer",
    initialState:{
        profile:{}
    },
    reducers:{
        getProfile:(state) =>{
        },
        setProfile:(state,action) =>{
            
            state.profile = action?.payload?.profile ?? {};
        },
    }
});

export const {getProfile,setProfile} = customerSlice.actions;

export default customerSlice.reducer;