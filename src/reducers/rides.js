import { START_LOADING, END_LOADING, GET_RIDES, FILTER_STATE, FILTER_CITY } from './../utils/actions';

const rides = (state = { nearest: [], upcoming: [], past: [], cities: [], states: [], selectedStates: [], isLoading: true, all: [], }, action) => {
    const values = action.data;
    let data = state.all;
    let nearest = [];
    const upcoming = [];
    const past = [];
    const date1 = new Date();
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case GET_RIDES:
            const station = action.data.station_code;
            let rides = action.data.data.map((ride) => {
                const stations = ride.station_path.filter(s => s - station >= 0).map((s) => s - station).sort((a, b) => a - b);

                ride.distance = stations[0];

                return ride;
            });
            let cities = [rides[0].city];
            let rStates = [{ id: 0, value: rides[0].state, cities: [rides[0].city] }];

            rides.forEach((ride) => {
                let rState = rStates.filter(s => s.value === ride.state)[0];
                if (!cities.find(c => c === ride.city)) {
                    cities.push(ride.city);
                }

                if (rState === undefined) {
                    rState = { id: rStates.length, value: ride.state, cities: [ride.city] };
                    rStates.push(rState);
                } else {
                    if (!rState.cities.includes(ride.city)) {
                        rState.cities = [...rState.cities, ride.city];
                    }
                    rStates = [...rStates.filter(s => s.value !== ride.state), rState];
                }

                const date2 = new Date(ride.date);

                if (date2.valueOf() < date1.valueOf() + 3600000) {
                    past.push(ride);
                } else if (date2.valueOf() > date1.valueOf() + 3600000) {
                    upcoming.push(ride);
                }
            })

            return { ...state, all: rides, nearest: rides.filter((r) => r.distance >= 0), upcoming: upcoming, past: past, cities: cities.sort(), states: rStates, selectedStates: rStates };
        case FILTER_STATE:
            let citiesFilter = state.states.filter(s => values.includes(s.value)).map((rS) => rS.cities).flat().sort();
            if (values.length !== 0) {
                nearest = [];
                values.forEach((value) => {
                    nearest = [...data.filter((ride) => ride.state === value).map((ride) => {
                        const date2 = new Date(ride.date);

                        if (date2.valueOf() < date1.valueOf() + 3600000) {
                            past.push(ride);
                        } else if (date2.valueOf() > date1.valueOf() + 3600000) {
                            upcoming.push(ride);
                        }
                        return ride;
                    }), ...nearest]
                });
            } else {
                citiesFilter = state.states.map(s => s.cities).flat().sort();
                nearest = state.all.map((ride) => {
                    const date2 = new Date(ride.date);

                    if (date2.valueOf() < date1.valueOf() + 3600000) {
                        past.push(ride);
                    } else if (date2.valueOf() > date1.valueOf() + 3600000) {
                        upcoming.push(ride);
                    }

                    return ride;
                })
            }

            return { ...state, cities: citiesFilter, selectedStates: values.length > 0 ? state.states.filter(state => values.includes(state.value)) : state.states, nearest: nearest.filter((r) => r.distance >= 0), upcoming: upcoming, past: past };
        case FILTER_CITY:
            if (values.length !== 0) {
                nearest = data.filter((ride) => values.includes(ride.city)).map((ride) => {
                    const date2 = new Date(ride.date);

                    if (date2.valueOf() < date1.valueOf() + 3600000) {
                        past.push(ride);
                    } else if (date2.valueOf() > date1.valueOf() + 3600000) {
                        upcoming.push(ride);
                    }
                    return ride;
                });
            } else {
                nearest = data.filter((ride) => state.selectedStates.map((state) => state.value).includes(ride.state)).map((ride) => {
                    const date2 = new Date(ride.date);

                    if (date2.valueOf() < date1.valueOf() + 3600000) {
                        past.push(ride);
                    } else if (date2.valueOf() > date1.valueOf() + 3600000) {
                        upcoming.push(ride);
                    }

                    return ride;
                })
            }

            return { ...state, nearest: nearest.filter((r) => r.distance >= 0), upcoming: upcoming, past: past };
        default:
            return state;
    }
}

export default rides;