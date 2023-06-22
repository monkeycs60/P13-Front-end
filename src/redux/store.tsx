import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { userApiSlice } from "./apiSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

export type RootState = {
	userDatas: ReturnType<typeof userSlice>;
	[userApiSlice.reducerPath]: ReturnType<typeof userApiSlice.reducer>;
};

export const store = configureStore({
	reducer: {
		userDatas: persistedReducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
			},
		}).concat(userApiSlice.middleware),
});

export const persistor = persistStore(store);
