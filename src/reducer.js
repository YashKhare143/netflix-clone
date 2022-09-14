export const initialState = {
    trailerURL:null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type){
        case actionTypes.SET_trailerURL:
            return{
                ...state,
                trailerURL: action.trailerURL,
            };
        default:
            return state;
    }
};

export default reducer;