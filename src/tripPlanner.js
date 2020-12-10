const tripPlanner = (numBagsOfCorn=0, numberGeese=0) => {};

const nextMoveCalculator = (nearBank, farBank) => {

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