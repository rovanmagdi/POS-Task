import { GET_PRODUCTS } from "../actions/typesAction";

const initialState = null;


const productsReducer = (state=initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.payload;
		
		default:
			return state;
	}
};

export default productsReducer;