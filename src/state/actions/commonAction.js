export const setNotification = (notification) => {
    return async (dispatch) => {
        dispatch({ type: "SET_NOTIFICATION", payload: notification });
        setTimeout(() => {
            dispatch({ type: "SET_NOTIFICATION", payload: null });
        }, 2000);
    }
}
export const setLoader = (status) => {
    return async (dispatch) => {
        dispatch({ type: "SET_LOADER", payload: status });
    }
}