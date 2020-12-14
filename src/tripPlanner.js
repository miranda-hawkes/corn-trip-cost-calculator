import _ from "lodash";

const CORN = 'c';
const GEESE = 'g';
const FOXES = 'f';
const EMPTY = 'e';

const stockTypes = [CORN, GEESE, FOXES];
const eatConditions = [
    stock => stock[GEESE] > 0 && stock[CORN] > 0,
    stock => stock[FOXES] > 0 && stock[GEESE] > 0,
];

const tripPlanner = (numberOfBagsOfCorn = 0, numberOfGeese = 0, numberOfFoxes = 0) => {
    let state = {
        homeShoreStock: { c: numberOfBagsOfCorn, g: numberOfGeese, f: numberOfFoxes },
        marketShoreStock: { c: 0, g: 0, f: 0 },
        trip: []
    }
    let toProcess = [];
    let computedStates = addComputedStates([state], {});
    while (state !== undefined) {
        let nextStates = stateGenerator(state);
        toProcess = toProcess.concat(nextStates.filter(haltingConditions(computedStates)))
        computedStates = addComputedStates(nextStates, computedStates)
        state = toProcess.pop();
    }

    return getCompletedStates(computedStates);
};

const stateGenerator = state => {
    let nextStates = [];
    if (weAreOnHomeShore(state)) {
        nextStates = stockTypes.filter(
            hasStock(state.homeShoreStock)
        ).reduce(
            (states, stockType) => states.concat(moveStockToMarketShore(stockType, state)),
            nextStates)
        nextStates = nextStates.concat([addEmptyTrip(state)])
    } else {
        nextStates = stockTypes.filter(
            hasStock(state.marketShoreStock)
        ).reduce(
            (states, stockType) => states.concat(moveStockToHomeShore(stockType, state)),
            nextStates)
        nextStates = nextStates.concat([addEmptyTrip(state)])
    }
    return nextStates;
};

const getCompletedStates = computedStates => Object.values(computedStates).reduce((array, values) => array.concat(values), []).filter(isCompleted);

const isCompleted = state => homeShoreIsEmpty(state) && weAreOnMarketShore(state)
const isNotComplete = state => !isCompleted(state)
const noOneIsEaten = state => !eatConditions.reduce((passed, condition) => condition(weAreOnHomeShore(state) ? state.marketShoreStock : state.homeShoreStock) || passed, false);
const haltingConditions = computedStates => state => computedStates[keyFor(state)] === undefined && noOneIsEaten(state) && isNotComplete(state);
const addComputedStates = (newStates, completedStates) => newStates.reduce((completed, state) => _.set({ ...completed }, keyFor(state), (completed[keyFor(state)] || []).concat([state])), completedStates);
const keyFor = state => `b=${state.trip.length % 2},h=${stockTypes.map(sType => state.homeShoreStock[sType]).join('')},m=${stockTypes.map(sType => state.marketShoreStock[sType]).join('')}`

const hasStock = store => stockType => store[stockType] !== undefined && store[stockType] > 0;

const moveStockToMarketShore = (stock, state) => ({
    ...state,
    homeShoreStock: _.set({ ...state.homeShoreStock }, stock, state.homeShoreStock[stock] - 1),
    marketShoreStock: _.set({ ...state.marketShoreStock }, stock, state.marketShoreStock[stock] + 1),
    trip: state.trip.concat(stock)
})
const moveStockToHomeShore = (stock, state) => ({
    ...state,
    homeShoreStock: _.set({ ...state.homeShoreStock }, stock, state.homeShoreStock[stock] + 1),
    marketShoreStock: _.set({ ...state.marketShoreStock }, stock, state.marketShoreStock[stock] - 1),
    trip: state.trip.concat(stock)
})

const homeShoreIsEmpty = state => Object.keys(state.homeShoreStock).reduce((count, stockType) => count + state.homeShoreStock[stockType], 0) === 0;

const weAreOnHomeShore = state => state.trip.length % 2 === 0;
const weAreOnMarketShore = state => state.trip.length % 2 === 1;

const addEmptyTrip = state => ({ ...state, trip: state.trip.concat([EMPTY]) })

export default tripPlanner;