import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { default as Account } from './slice/account';
import { default as Movies } from './slice/movies';
import * as reduxThunk from "redux-thunk/extend-redux";
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const reducers = combineReducers({
    Account,
    Movies
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
};
