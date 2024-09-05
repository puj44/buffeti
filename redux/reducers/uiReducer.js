const { createSlice } = require("@reduxjs/toolkit");

export const uiSlice = createSlice({
    name:"order",
    initialState:{
        toasterPayload:{},
    },
    reducers:{
        setToaster:(state,{payload}) =>{
            state.toasterPayload = {
                type:payload?.type,
                message:payload?.message ?? null
            }
        },
        resetAction:(state) =>{
            state.toasterPayload = {};
        }
    }
});

export const {setToaster,resetAction} = uiSlice.actions;

export default uiSlice.reducer;