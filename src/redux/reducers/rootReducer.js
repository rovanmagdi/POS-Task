import { combineReducers } from "redux";

import productsReducer from './productsReducer'
import productsDetailsReducer from "./productDetail";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetail: productsDetailsReducer
 
});

export default rootReducer;