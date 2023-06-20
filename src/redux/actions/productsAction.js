import productsApi from "../../Api/productsApi";
import {showSuccess,showError} from './statusAction'
import { GET_PRODUCTS } from "./typesAction";
export  function  productsAction ( ){
    return (dispatch)=>{
        productsApi.get('/products')
        .then(({data})=>{
            dispatch(showSuccess());      
            dispatch( getProducts(data) )    

        }).catch((error)=>{
            dispatch(showError(error.response.data.message));
        })
    }
}

export const getProducts = (info) => ({
	type: GET_PRODUCTS,
	payload: info,
});