import {combineReducers, applyMiddleware} from 'redux';
import {thunkMiddleware} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {configureStore} from '@reduxjs/toolkit';
import {cartItems} from './reducers/cart-item.reducer';

const reducers = combineReducers({
  cart: cartItems,
});

const store = configureStore(
  {reducer: reducers},
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
