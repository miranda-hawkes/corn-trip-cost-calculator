import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';
import { Jumbotron } from 'react-bootstrap';

function App({calculate}) {
  const [costOfTrip, setCostOfTrip] = useState(0);
  const [numTrips, setNumTrips] = useState(0);
  const [clear, setClear] = useState(false);
  const [showResults, setShowResults] = useState(false)

  const Calculate = (e) => {
    e.preventDefault();
    if(clear) setClear(false);
    let numBags = document.querySelector('#num-bags').value
    if(numBags === '' || numBags < 1) return;
    let {numTrips, sum} = calculate(numBags)
    setCostOfTrip(sum);
    setNumTrips(numTrips);
    setShowResults(true);
    
    document.querySelector('#num-bags').value = "";
  }

  const ItemName = (element) => {
    if (element === "g") return "a goose";
    if (element === "c") return "a sack of corn";
    if (element === "e") return "nothing";
  }

  function TripInstructions() {

    // temporary array
    const trips = ["g", "e", "c", "g", "c", "e", "g"];

    let tripDescriptions = trips.map ( function(trip, index) {
      const direction = (index % 2 === 0) ? " to the market shore" : " back home";

      return "Carry " + ItemName(trip) + direction;
    });

    if(trips.includes("x")) return (
      <div>
        Not possible!
      </div>
    );
    
    return (
      <ol>
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
    );
  }

  const Results = () => (
    <div id="final-result">
      <Row className="result-row">
        <Col md lg="12" className="result">
          <Form.Label >
            Trip instructions
          </Form.Label>

          <TripInstructions />
        </Col>
      </Row>
      <Row className="result-row">
        <Col md lg="12" className="result">
          <Form.Label >
            Will take
          </Form.Label>
          <Form.Control readOnly id="result-num-trips" value={numTrips + ' ferry trips'}/>
        </Col>
      </Row>
      <Row className="result-row">
        <Col md lg="12" className="result">
          <Form.Label >
            At a cost of
          </Form.Label>
          <Form.Control readOnly id="result" value={'£' + costOfTrip.toFixed(2)}/>
        </Col>
      </Row>
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
                <Form.Group controlId="num-bags">
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

      { showResults ? <Results /> : null }

    </Jumbotron>
  );
}

export default App;
