export const GET_CURRENT_FORECAST = 'GET_CURRENT_FORECAST';
export const GET_FIVE_DAY_FORECAST = 'GET_FIVE_DAY_FORECAST';

const API_URL = 'https://community-open-weather-map.p.rapidapi.com';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
		'X-RapidAPI-Key': '42aadb5e30msh3fcef82e3ec801cp1e1dffjsn4f7f47e1b97b'
	}
};

export const getCurrentForecast = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL + "/weather?q=London%2Cuk&lat=0&lon=0&id=2172797&lang=null&units=imperial", options);
            const json = await result.json();

            if (json) {
                dispatch({
                    type: GET_CURRENT_FORECAST,
                    payload: json
                });
            } else {
                console.log('Unable to fetch. You have exceeded the rate limit per minute for your plan, BASIC, by the API provider');
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const getFiveDaysForecast = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL + "/forecast?q=London%2Cuk", options);
            const json = await result.json();

            if (json && json.list) {
                dispatch({
                    type: GET_FIVE_DAY_FORECAST,
                    payload: json.list
                });
            } else {
                console.log('Unable to fetch. You have exceeded the rate limit per minute for your plan, BASIC, by the API provider');
            }
        }
    } catch (error) {
        console.log(error);
    }
}