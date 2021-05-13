const initialState = {
    notification: null,
    loader: false,
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return {
                ...state,
                notification: action.payload,
            };
        case "SET_LOADER":
            return {
                ...state,
                loader: action.payload,
            };
        default:
            return state;
    }
};
export default commonReducer;