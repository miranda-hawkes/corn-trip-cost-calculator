
const homeShoreIsEmpty = (tripState) => tripState.homeShore.numBagsOfCorn == 0 && tripState.homeShore.numberOfGeese == 0;

const tripPlanner = (numBagsOfCorn = 0, numberOfGeese = 0) => {
    let state = {
        homeShore: { numBagsOfCorn, numberOfGeese },
        marketShore: { numBagsOfCorn: 0, numberOfGeese: 0 },
        trip: []
    }

    return moveSearcher(state).filter(notFailedTrip);
};

const notFailedTrip = tripState => !tripState.trip.join('').endsWith('x');

const weAreOnHomeShore = (tripState) => tripState.trip.length % 2 === 0;
const weAreOnMarketShore = (tripState) => tripState.trip.length % 2 === 1;

const marketShoreHasCorn = (tripState) => tripState.marketShore.numBagsOfCorn > 0;
const marketShoreHasGoose = (tripState) => tripState.marketShore.numberOfGeese > 0;

const homeShoreHasCorn = (tripState) => tripState.homeShore.numBagsOfCorn > 0;
const homeShoreHasGoose = (tripState) => tripState.homeShore.numberOfGeese > 0;

const weDidTwoEmptyTrips = (tripState) => tripState.trip.join('').endsWith('ee')
const weDidTwoCornTrips = (tripState) => tripState.trip.join('').endsWith('cc')
const weDidTwoGeeseTrips = (tripState) => tripState.trip.join('').endsWith('gg')

const theTripHasFailed = (tripState) => 
    weAreOnHomeShore(tripState) && marketShoreHasCorn(tripState) && marketShoreHasGoose(tripState) ||
    weAreOnMarketShore(tripState) && homeShoreHasCorn(tripState) && homeShoreHasGoose(tripState) ||
    weDidTwoEmptyTrips(tripState) ||
    weDidTwoCornTrips(tripState) ||
    weDidTwoGeeseTrips(tripState);

const gotCorn = (tripState) => weAreOnHomeShore(tripState) ? tripState.homeShore.numBagsOfCorn > 0 : tripState.marketShore.numBagsOfCorn > 0
const gotGoose = (tripState) => weAreOnHomeShore(tripState) ? tripState.homeShore.numberOfGeese > 0 : tripState.marketShore.numberOfGeese > 0

const theTripIsComplete = (tripState) => homeShoreIsEmpty(tripState) && weAreOnMarketShore(tripState);

const moveGooseToHomeShore = (tripState) => ({
    homeShore: {
        numBagsOfCorn: tripState.homeShore.numBagsOfCorn,
        numberOfGeese: tripState.homeShore.numberOfGeese + 1
    },
    marketShore: {
        numBagsOfCorn: tripState.marketShore.numBagsOfCorn,
        numberOfGeese: tripState.marketShore.numberOfGeese - 1
    },
    trip: tripState.trip.concat(['g'])
});

const moveGooseToMarketShore = (tripState) => ({
    homeShore: {
        numBagsOfCorn: tripState.homeShore.numBagsOfCorn,
        numberOfGeese: tripState.homeShore.numberOfGeese - 1
    },
    marketShore: {
        numBagsOfCorn: tripState.marketShore.numBagsOfCorn,
        numberOfGeese: tripState.marketShore.numberOfGeese + 1
    },
    trip: tripState.trip.concat(['g'])
});

const moveCornToHomeShore = (tripState) => ({
    homeShore: {
        numBagsOfCorn: tripState.homeShore.numBagsOfCorn + 1,
        numberOfGeese: tripState.homeShore.numberOfGeese
    },
    marketShore: {
        numBagsOfCorn: tripState.marketShore.numBagsOfCorn - 1,
        numberOfGeese: tripState.marketShore.numberOfGeese
    },
    trip: tripState.trip.concat(['c'])
});

const moveCornToMarketShore = (tripState) => ({
    homeShore: {
        numBagsOfCorn: tripState.homeShore.numBagsOfCorn - 1,
        numberOfGeese: tripState.homeShore.numberOfGeese
    },
    marketShore: {
        numBagsOfCorn: tripState.marketShore.numBagsOfCorn + 1,
        numberOfGeese: tripState.marketShore.numberOfGeese
    },
    trip: tripState.trip.concat(['c'])
});

const addEmptyTrip = tripState => ({ ...tripState, trip: tripState.trip.concat(['e']) })
const failTrip = tripState => ({...tripState, trip: tripState.trip.concat(['x'])})

const moveSearcher = (tripState) => {
    if (theTripIsComplete(tripState)) {
        return [tripState];
    }
    if (theTripHasFailed(tripState)) {
        return [failTrip(tripState)];
    }
    let nextStates = [];
    if (weAreOnHomeShore(tripState)) {
        if (gotCorn(tripState)) {
            nextStates = nextStates.concat([moveCornToMarketShore(tripState)])
        }
        if (gotGoose(tripState)) {
            nextStates = nextStates.concat([moveGooseToMarketShore(tripState)])
        }
        nextStates = nextStates.concat([addEmptyTrip(tripState)])
        
    } else {
        if (gotCorn(tripState)) {
            nextStates = nextStates.concat([moveCornToHomeShore(tripState)])
        }
        if (gotGoose(tripState)) {
            nextStates = nextStates.concat([moveGooseToHomeShore(tripState)])
        }
        nextStates = nextStates.concat([addEmptyTrip(tripState)])
    }
    return nextStates.reduce((acc, trip) => acc.concat(moveSearcher(trip)), []);
};
/*
g or c per trip

0 c, 0 g = [e]
0 c, 1 g = [g]
0 c, 2 g = [g,e,g]
0 c, 3 g = [g,e,g,e,g]
1 c, 0 g = [c]
1 c, 1 g = [c,e,g]
1 c, 2 g = [c,e,g,c,g,e,c]
1 c, 3 g = [x] //[c,e,g,c,x]
2 c, 0 g = [c,e,c]
2 c, 1 g = [g,e,c,g,c,e,g]
2 c, 2 g = [x]
2 c, 3 g = [x]
3 c, 0 g = [c,e,c,e,c]
3 c, 1 g = [x] //[g,e,c,g,x]
3 c, 2 g = [x]
3 c, 3 g = [x]
*/

/*
g and/or c per trip

0 c, 0 g = [e]
0 c, 1 g = [g]
0 c, 2 g = [g,e,g]
0 c, 3 g = [g,e,g,e,g]
1 c, 0 g = [c]
1 c, 1 g = [cg]
1 c, 2 g = [cg,c,cg]
1 c, 3 g = [cg,c,cg,c,cg]
2 c, 0 g = [c,e,c]
2 c, 1 g = [cg,g,cg]
2 c, 2 g = [x]
2 c, 3 g = [x]
3 c, 0 g = [c,e,c,e,c]
3 c, 1 g = [cg,g,cg,g,cg]
3 c, 2 g = [x]
3 c, 3 g = [x]

*/

export default tripPlanner;