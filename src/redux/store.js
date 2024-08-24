// retudx toolkit store

import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./slides/orderSlice";
import vaccineSlice from "./slides/vaccineSlice";
import userSlice from "./slides/userSlice";

export default configureStore({
  reducer: {
    order: orderSlice,
    vaccine: vaccineSlice,
    user: userSlice,
  },
});
