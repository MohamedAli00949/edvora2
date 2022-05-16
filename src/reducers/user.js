import { START_LOADING, END_LOADING, GET_USER } from './../utils/actions';

const user = (state = { user: {}, isLoading: true }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_USER:
            return { ...state, user: action.data };
        default:
            return state;
    }
}

export default user;