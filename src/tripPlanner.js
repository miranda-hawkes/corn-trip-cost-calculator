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
    let toProcess = [];
    let computedStates = addComputedStates([state], {});
    let next = state;
    let count = 0;
    do {
        let nextStates = moveSearcher(next);
        let activeStates = nextStates.filter(haltingConditions(computedStates));
        toProcess = toProcess.concat(activeStates.filter(isNotComplete))
        computedStates = addComputedStates(nextStates, computedStates)
        next = toProcess.pop(); // find shortest trip
    } while(next !== undefined && count++ < 100)

    return Object.values(computedStates).reduce((array, values) => array.concat(values), []).filter(notFailedTrip).filter(isCompleted);
};

const isCompleted = (state) => homeShoreIsEmpty(state) && weAreOnMarketShore(state)
const isNotComplete = (state) => !isCompleted(state)
const eat_conditions = [
    stock => stock[GEESE] > 0 && stock[CORN] > 0,
];
const haltingConditions = computedStates => state => computedStates[keyFor(state)] === undefined && !eat_conditions.reduce((passed, condition) => condition(weAreOnHomeShore(state)?state.marketShoreStock:state.homeShoreStock) && passed, true);
const addComputedStates = (newStates, completedStates) => newStates.reduce((completed, state) => {
    let key = keyFor(state);
    let existing = completed[key] || [];
    return _.set({...completed}, key, existing.concat([state]))
}, completedStates);
const keyFor = (state) => `b=${state.trip.length % 2},h=${stockTypes.map(sType => state.homeShoreStock[sType]).join('')},m=${stockTypes.map(sType => state.marketShoreStock[sType]).join('')}`

const moveSearcher = (tripState) => {
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
    return nextStates;
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

const addEmptyTrip = tripState => ({ ...tripState, trip: tripState.trip.concat([EMPTY]) })

export default tripPlanner;