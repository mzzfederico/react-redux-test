import { createAction, createSlice } from "@reduxjs/toolkit";

export const addToast = createAction("toasts/addToast");
export const removeToast = createAction("toasts/removeToast");

export default createSlice({
    name: "toasts",
    initialState: { list: [] },
    extraReducers: (builder) => {
        builder.addCase(addToast, (draft, action) => {
            draft.list.push({ id: Date.now(), text: action.payload.text });
        }).addCase(removeToast, function (draft, action) {
            draft.list = draft.list.filter(toast => toast.id !== action.payload.id);
        })
    }
})
