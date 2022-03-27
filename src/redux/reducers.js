import { GET_CURRENT_FORECAST, GET_FIVE_DAY_FORECAST } from './actions';

const initialState = {
    weatherData: []
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_FORECAST:
            return { ...state, weatherData: action.payload };
        case GET_FIVE_DAY_FORECAST:
            return { ...state, weatherData: action.payload };
        default:
            return state;
    }
}

export default userReducer;