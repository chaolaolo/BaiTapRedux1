import { configureStore } from "@reduxjs/toolkit";
import thuChiSlice from "../reducers/QLTCReducer";
export default configureStore({
    reducer: {
        listThuChi: thuChiSlice,
    }
});