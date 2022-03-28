export const GET_CURRENT_FORECAST = 'GET_CURRENT_FORECAST';
export const GET_FIVE_DAY_FORECAST = 'GET_FIVE_DAY_FORECAST';

const API_URL = 'https://community-open-weather-map.p.rapidapi.com';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
		'X-RapidAPI-Key': '1444f794f4mshed92bebd8d87561p106182jsn34b8c5820478'
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
                console.log('Unable to fetch!');
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
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}