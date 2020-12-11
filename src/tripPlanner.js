import _ from "lodash";

const CORN = 'c';
const GEESE = 'g';
const EMPTY = 'e';
const FAILED = 'x';

const stockTypes = [CORN, GEESE];

const tripPlanner = (numberOfBagsOfCorn = 0, numberOfGeese = 0) => {
    let state = {
        homeShoreStock: { c: numberOfBagsOfCorn, g: numberOfGeese },
        marketShoreStock: { c: 0, g: 0 },
        trip: []
    }

    return moveSearcher(state).filter(notFailedTrip);
};
const moveSearcher = (tripState) => {
    if (theTripIsComplete(tripState)) {
        return [tripState];
    }
    if (theTripHasFailed(tripState)) {
        return [failTrip(tripState)];
    }
    let nextStates = [];
    if (weAreOnHomeShore(tripState)) {
        nextStates = stockTypes.filter(
            hasStock(tripState.homeShoreStock)
            ).reduce(
                (states, stockType) => states.concat(moveStockToMarketShore(stockType, tripState)), 
                nextStates)
        nextStates = nextStates.concat([addEmptyTrip(tripState)])
    } else {
        nextStates = stockTypes.filter(
            hasStock(tripState.marketShoreStock)
            ).reduce(
                (states, stockType) => states.concat(moveStockToHomeShore(stockType, tripState)), 
                nextStates)
        nextStates = nextStates.concat([addEmptyTrip(tripState)])
    }
    return nextStates.reduce((acc, trip) => acc.concat(moveSearcher(trip)), []);
};

const hasStock = store => stockType => store[stockType] !== undefined && store[stockType] > 0;

const moveStockToMarketShore = (stock, state) => ({
    ...state, 
    homeShoreStock: _.set({...state.homeShoreStock}, stock, state.homeShoreStock[stock] - 1), 
    marketShoreStock: _.set({...state.marketShoreStock}, stock, state.marketShoreStock[stock] + 1), 
    trip: state.trip.concat(stock)
})
const moveStockToHomeShore = (stock, state) => ({
    ...state, 
    homeShoreStock: _.set({...state.homeShoreStock}, stock, state.homeShoreStock[stock] + 1), 
    marketShoreStock: _.set({...state.marketShoreStock}, stock, state.marketShoreStock[stock] - 1), 
    trip: state.trip.concat(stock)
})

const homeShoreIsEmpty = (tripState) => Object.keys(tripState.homeShoreStock).reduce((count, stockType) => count + tripState.homeShoreStock[stockType], 0) == 0;

const notFailedTrip = tripState => !tripState.trip.join('').endsWith(FAILED);

const weAreOnHomeShore = (tripState) => tripState.trip.length % 2 === 0;
const weAreOnMarketShore = (tripState) => tripState.trip.length % 2 === 1;

const marketShoreHas = (tripState, stockType) => tripState.marketShoreStock[stockType] > 0;

const homeShoreHas = (tripState, stockType) => tripState.homeShoreStock[stockType] > 0;

const weDidTwoEmptyTrips = (tripState) => tripState.trip.join('').endsWith(EMPTY + EMPTY)
const weDidTwoCornTrips = (tripState) => tripState.trip.join('').endsWith(CORN + CORN)
const weDidTwoGeeseTrips = (tripState) => tripState.trip.join('').endsWith(GEESE + GEESE)

const theTripHasFailed = (tripState) =>
    weAreOnHomeShore(tripState) && marketShoreHas(tripState, CORN) && marketShoreHas(tripState, GEESE) ||
    weAreOnMarketShore(tripState) && homeShoreHas(tripState, CORN) && homeShoreHas(tripState, GEESE) ||
    weDidTwoEmptyTrips(tripState) ||
    weDidTwoCornTrips(tripState) ||
    weDidTwoGeeseTrips(tripState);

const theTripIsComplete = (tripState) => homeShoreIsEmpty(tripState) && weAreOnMarketShore(tripState);

const addEmptyTrip = tripState => ({ ...tripState, trip: tripState.trip.concat([EMPTY]) })
const failTrip = tripState => ({ ...tripState, trip: tripState.trip.concat([FAILED]) })

export default tripPlanner;