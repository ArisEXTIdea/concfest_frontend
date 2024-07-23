import { createStore } from "redux";
import appReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const pReducer = persistReducer(persistConfig, appReducer);

const store = createStore(pReducer);
let persistor = persistStore(store);

export { store, persistor };
