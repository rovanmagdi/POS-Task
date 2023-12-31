import { START_LOADING, SHOW_ERROR, SHOW_SUCCESS } from "./typesAction";

export const startLoading = () => ({ type: START_LOADING });

export const showSuccess = () => ({ type: SHOW_SUCCESS });

export const showError = (status) => ({ type: SHOW_ERROR, payload: status });