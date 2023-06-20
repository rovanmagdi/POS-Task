import { GET_PRODUCT_DETAILS } from "../actions/typesAction";

const initialState = null;


const productsDetailsReducer = (state=initialState, action) => {
	switch (action.type) {
		case GET_PRODUCT_DETAILS:
			return action.payload;
		
		default:
			return state;
	}
};

export default productsDetailsReducer;