import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';
import { Jumbotron } from 'react-bootstrap';

function App({tripPlanner, calculate}) {
  const [numCornInput, setNumCornInput] = useState(0);
  const [numGeeseInput, setNumGeeseInput] = useState(0);
  const [costOfTrip, setCostOfTrip] = useState(0);
  const [numTrips, setNumTrips] = useState(0);
  const [clear, setClear] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [impossibleTrip, setImpossibleTrip] = useState(false);
  const numBagsSelector = "#num-bags";
  const numGeeseSelector = "#num-geese";
  const [tripDetails, setTripDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const [numPages, setNumPages] = useState(0)

  const pageLength = 10;


  const Calculate = (e) => {
    e.preventDefault();
    if(clear) setClear(false);
    let numBags = document.querySelector(numBagsSelector).value || 0;
    let numGeese = document.querySelector(numGeeseSelector).value || 0;
    let possibleTrips = tripPlanner(numBags, numGeese).map(trip => trip.trip);
    setNumCornInput(numBags);
    setNumGeeseInput(numGeese);
    setCurrentPage(0)
    setNumPages(0)
    if(possibleTrips.length > 0) {
      let trip = possibleTrips[0];
      setCostOfTrip(calculate(trip.length));
      setTripDetails(trip);
      setNumTrips(trip.length);
      setShowResults(true);
      setImpossibleTrip(false);
      if(trip.length > pageLength) {
        setNumPages(Math.ceil(trip.length/pageLength))
      }
    } else {
      setCostOfTrip(0);
      setTripDetails([]);
      setNumTrips(0);
      setShowResults(true);
      setImpossibleTrip(true);
    }
    
    document.querySelector(numBagsSelector).value = "";
    document.querySelector(numGeeseSelector).value = "";
  }

  const ItemName = (element) => {
    if (element === "g") return "a goose";
    if (element === "c") return "a sack of corn";
    if (element === "e") return "nothing";
  }

  const DisplayError = () => (
    <div className="d-flex p-12 result-pad">
      <Form>
        <DisplayInput />
        <Row id="not-possible">
            <h3>Not possible!</h3>
        </Row>
      </Form>
    </div>
  )

  function TripInstructions() {

    let trips = tripDetails;

    let tripDescriptions = trips.map ( function(trip, index) {
      const direction = (index % 2 === 0) ? " to the market shore" : " back home";
      return "Carry " + ItemName(trip) + direction;
    });

    if(trips.includes("x")) return ( <div>Not possible!</div>);

    if(numPages > 0) {
      tripDescriptions = tripDescriptions.slice(currentPage*pageLength, (currentPage+1)*pageLength)
    }
    
    return (
        <ol start={(currentPage*pageLength)+1}>
            {
            tripDescriptions.map ( function(description, index) {
              return (
                <li key={index}>
                  {description}
                </li>
              );
            })
          }
        </ol>
    )
  }
  function Pagination() {
    let page = currentPage;
    if(numPages > 0) {
      return (
        <div className="paginate">
          <button className="btn btn-page"
                  onClick={previousPage}
                  disabled={currentPage === 0}>
            Previous
          </button>
          <span id="page-num">Page {currentPage+1} of {numPages-1}</span>
          <button className="btn btn-page"
                  disabled={currentPage >= numPages-1}
                  onClick={nextPage}>
            Next
          </button>
        </div>
      );
    } else {
      return (<div></div>)
    }
  }

  const nextPage = (e) => {
    e.preventDefault();

    setCurrentPage(currentPage+1);
  }
  const previousPage = (e) => {
    e.preventDefault();

    setCurrentPage(currentPage-1);
  }

  const Instructions = () => (
    <Row className="result-row">
      <Col md lg="12" className="result">
        <Form.Label >
          <h3>Trip instructions</h3>
        </Form.Label>
        <TripInstructions />
      </Col>
    </Row>
  )

  const DisplayInput = () => (
    <Row id="display-input" className="result-row result">
      <h4>
        Result for {numCornInput} { numCornInput === '1' ? 'bag ' : 'bags '}
        of corn and {numGeeseInput} { numGeeseInput === '1' ? 'goose' : 'geese'}:
      </h4>
    </Row>
  )

  const Results = () => (
    <div className="d-flex p-12">
      <Form>
        <DisplayInput />
        <Instructions />
        <Pagination/>
        <Row className="result-row" id="cost">
          <Col md lg="6" className="result">
            <Form.Label >
              It will take
            </Form.Label>
            <Form.Control readOnly id="result-num-trips" value={numTrips + ' ferry trips'}/>
          </Col>

          <Col md lg="6" className="result">
            <Form.Label >
              At a cost of
            </Form.Label>
            <Form.Control readOnly id="result" value={'£' + costOfTrip.toFixed(2)}/>
          </Col>
        </Row>
      </Form>
    </div>
  )

  return (
    <Jumbotron>
      <img src={"./corn.png"} id="corn"/>
      <div className="d-flex p-12">
        <h1 className="text-center">Corn & Geese Trip Calculator</h1>
      </div>
      <div className="d-flex p-12">
        <Form>
          <Row>
            <Col xs lg="12">
              <Form.Group controlId="num-bags">
                <Form.Control type="number" placeholder="Number of bags of corn" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs lg="12">
              <Form.Group controlId="num-geese">
                <Form.Control type="number" placeholder="Number of geese" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="result-row">
            <Col xs lg="12">
              <Button variant="primary" type="submit" onClick={Calculate}>
                Calculate
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      { showResults ? (impossibleTrip ? <DisplayError /> : <Results />) : null }

    </Jumbotron>
  );
}

export default App;
