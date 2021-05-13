const initialState = {
    tempEmail: null,
    tempPassword: null,
    email: null,
    loggedin: null,
    token: null,
    userType: null,
    userName: null,
    userDesignation: null,
    student: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TEMP_EMAIL":
            return {
                ...state,
                tempEmail: action.payload,
            };
        case "SET_TEMP_PASSWORD":
            return {
                ...state,
                tempPassword: action.payload,
            };
        case "HANDLE_SIGNIN":
            return {
                ...state,
                loggedin: action.payload,
            };
        case "HANDLE_SIGNOUT":
            return {
                ...state,
                loggedin: false
            }
        case "SET_EMAIL":
            return {
                ...state,
                email: action.payload,
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.payload,
            }
        case "SET_USER_TYPE":
            return {
                ...state,
                userType: action.payload
            }
        case "SET_USER_NAME":
            return {
                ...state,
                userName: action.payload
            }
        case "SET_USER_DESIGNATION":
            return {
                ...state,
                userDesignation: action.payload
            }
        case "SET_STUDENT":
            return {
                ...state,
                student: action.payload
            }
        default:
            return state;
    }
};
export default authReducer;