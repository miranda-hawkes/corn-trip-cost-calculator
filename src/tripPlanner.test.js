import tripPlanner from './tripPlanner';

describe('tripPlanner', () => {
    it('should produce empty trip for no goods', () => {
        let trips = tripPlanner(0,0);
        expect(trips).toHaveLength(1);
        expect(trips[0].trip).toHaveLength(1);
        expect(trips[0].trip[0]).toBe('e')
    })
    it('should produce single trip for singluar goods', () => {
        let trips = tripPlanner(1,0);
        expect(trips).toHaveLength(1);
        expect(trips[0].trip).toHaveLength(1);
        expect(trips[0].trip[0]).toBe('c')

        trips = tripPlanner(0,1);
        expect(trips).toHaveLength(1);
        expect(trips[0].trip).toHaveLength(1);
        expect(trips[0].trip[0]).toBe('g')
    })
    it('should produce double trip for dual goods', () => {
        let trips = tripPlanner(1,1);
        expectTwoPossibleSolutions(trips)
        trips = trips.map(trip => trip.trip.join('')).sort();
        expect(trips).toEqual(['ceg', 'gec'])
    })
    it('should produce no trips for impossible states', () => {
        let trips = tripPlanner(1,3);
        expectNoSolutions(trips)
        trips = tripPlanner(3,1);
        expectNoSolutions(trips)
    })
    it('should produce no trips for impossible states', () => {
        let trips = tripPlanner(1,2);
        expectOneSolution(trips);
        expect(trips[0].trip.join('')).toBe('cegcgec')
    })
})

const expectOneSolution = (trips) => expect(trips).toHaveLength(1);
const expectTwoPossibleSolutions = (trips) => expect(trips).toHaveLength(2);
const expectNoSolutions = (trips) => expect(trips).toHaveLength(0);