export default (ferryCostPerTrip) => (numBags) => {
    let numTrips = numBags * 2  - 1;
    return {
        numTrips,
        sum: numTrips * ferryCostPerTrip
    };
};
