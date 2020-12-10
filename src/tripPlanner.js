
const startBankIsEmpty = (tripState) => tripState.startBank.numBagsOfCorn == 0 && tripState.startBank.numberOfGeese == 0;

const tripPlanner = (numBagsOfCorn = 0, numberOfGeese = 0) => {
    let state = {
        startBank: { numBagsOfCorn, numberOfGeese },
        destinationBank: { numBagsOfCorn: 0, numberOfGeese: 0 },
        trip: []
    }

    let states = moveSearcher(state);
    return states.filter(tripState => !tripState.trip.join('').endsWith('x'));
};

const weAreOnStartBank = (tripState) => tripState.trip.length % 2 === 0;
const weAreOnDestinationBank = (tripState) => tripState.trip.length % 2 === 1;

const destinationBankHasCorn = (tripState) => tripState.destinationBank.numBagsOfCorn > 0;
const destinationBankHasGoose = (tripState) => tripState.destinationBank.numberOfGeese > 0;

const startBankHasCorn = (tripState) => tripState.startBank.numBagsOfCorn > 0;
const startBankHasGoose = (tripState) => tripState.startBank.numberOfGeese > 0;

const weDidTwoEmptyTrips = (tripState) => tripState.trip.join('').endsWith('ee')
const weDidTwoCornTrips = (tripState) => tripState.trip.join('').endsWith('cc')
const weDidTwoGeeseTrips = (tripState) => tripState.trip.join('').endsWith('gg')

const weFailedTrip = (tripState) => 
    weAreOnStartBank(tripState) && destinationBankHasCorn(tripState) && destinationBankHasGoose(tripState) ||
    weAreOnDestinationBank(tripState) && startBankHasCorn(tripState) && startBankHasGoose(tripState) ||
    weDidTwoEmptyTrips(tripState) ||
    weDidTwoCornTrips(tripState) ||
    weDidTwoGeeseTrips(tripState);

const gotCorn = (tripState) => weAreOnStartBank(tripState) ? tripState.startBank.numBagsOfCorn > 0 : tripState.destinationBank.numBagsOfCorn > 0
const gotGoose = (tripState) => weAreOnStartBank(tripState) ? tripState.startBank.numberOfGeese > 0 : tripState.destinationBank.numberOfGeese > 0

const theTripIsComplete = (tripState) => startBankIsEmpty(tripState) && weAreOnDestinationBank(tripState);

const moveSearcher = (tripState) => {
    if (theTripIsComplete(tripState)) {
        return [tripState];
    }
    if (weFailedTrip(tripState)) {
        return [{...tripState, trip: tripState.trip.concat(['x'])}];
    }
    let nextStates = [];
    if (weAreOnStartBank(tripState)) {
        if (gotCorn(tripState)) {
            nextStates = nextStates.concat([{
                startBank: {
                    numBagsOfCorn: tripState.startBank.numBagsOfCorn - 1,
                    numberOfGeese: tripState.startBank.numberOfGeese
                },
                destinationBank: {
                    numBagsOfCorn: tripState.destinationBank.numBagsOfCorn + 1,
                    numberOfGeese: tripState.destinationBank.numberOfGeese
                },
                trip: tripState.trip.concat(['c'])
            }])
        }
        if (gotGoose(tripState)) {
            nextStates = nextStates.concat([{
                startBank: {
                    numBagsOfCorn: tripState.startBank.numBagsOfCorn,
                    numberOfGeese: tripState.startBank.numberOfGeese - 1
                },
                destinationBank: {
                    numBagsOfCorn: tripState.destinationBank.numBagsOfCorn,
                    numberOfGeese: tripState.destinationBank.numberOfGeese + 1
                },
                trip: tripState.trip.concat(['g'])
            }])
        }
        nextStates = nextStates.concat([{ ...tripState, trip: tripState.trip.concat(['e']) }])
        
    } else {
        if (gotCorn(tripState)) {
            nextStates = nextStates.concat([{
                startBank: {
                    numBagsOfCorn: tripState.startBank.numBagsOfCorn + 1,
                    numberOfGeese: tripState.startBank.numberOfGeese
                },
                destinationBank: {
                    numBagsOfCorn: tripState.destinationBank.numBagsOfCorn - 1,
                    numberOfGeese: tripState.destinationBank.numberOfGeese
                },
                trip: tripState.trip.concat(['c'])
            }])
        }
        if (gotGoose(tripState)) {
            nextStates = nextStates.concat([{
                startBank: {
                    numBagsOfCorn: tripState.startBank.numBagsOfCorn,
                    numberOfGeese: tripState.startBank.numberOfGeese + 1
                },
                destinationBank: {
                    numBagsOfCorn: tripState.destinationBank.numBagsOfCorn,
                    numberOfGeese: tripState.destinationBank.numberOfGeese - 1
                },
                trip: tripState.trip.concat(['g'])
            }])
        }
        nextStates = nextStates.concat([{ ...tripState, trip: tripState.trip.concat(['e']) }])
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