
import productsApi from "../../Api/productsApi";
import {showSuccess,showError} from './statusAction'
import { GET_PRODUCT_DETAILS } from "./typesAction";
export  function  productsDetailsAction (id){
    return (dispatch)=>{
        productsApi.get(`/products/${id}`)
        .then(({data})=>{
            dispatch(showSuccess());      
            dispatch( getProductDetail(data) )    

        }).catch((error)=>{
            dispatch(showError(error.response.data.message));
        })
    }
}

export const getProductDetail = (info) => ({
	type: GET_PRODUCT_DETAILS,
	payload: info,
});