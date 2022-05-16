export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const GET_USER = 'GET_USER';
export const GET_RIDES = 'GET_RIDES';
export const FILTER_STATE = 'FILTER_STATE';
export const FILTER_CITY = 'FILTER_CITY';

export const getData = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING});
        let user = {};
        console.log("suser");

        await fetch('https://assessment.api.vweb.app/user', { method: 'GET', cache: "no-cache" }).then((data) => data.json()).then((data) => {
            user = data;
            dispatch({ type: GET_USER, data});
        });

        await fetch(`https://assessment.api.vweb.app/rides`, { method: 'GET', cache: "no-cache" }).then((data) => data.json()).then((data) => {
            dispatch({ type: GET_RIDES, data: {data, station_code: user.station_code}});
        });

        dispatch({ type: END_LOADING});
    } catch (error) {
        console.error(error);
        dispatch({ type: END_LOADING });
    }
}

export const filterStates = (section, values) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        dispatch({type: section === "state" ? FILTER_STATE : FILTER_CITY, data: values })

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.error(error);
        dispatch({ type: END_LOADING });
    }
}