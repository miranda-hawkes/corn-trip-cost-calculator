import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';
import { Jumbotron } from 'react-bootstrap';

function App() {
  const [costOfTrip, setCostOfTrip] = useState(0);
  const [numTrips, setNumTrips] = useState(0);
  const [clear, setClear] = useState(false);
  const [showResults, setShowResults] = useState(false)

  const Calculate = (e) => {
    e.preventDefault();
    if(clear) setClear(false);
    let numBags = document.querySelector('#num-bags').value
    if(numBags == '')
    return;
    let sum = numBags * 0.25
    let numTrips = numBags
    setCostOfTrip(sum);
    setNumTrips(numTrips);
    setShowResults(true);
    document.querySelector('#num-bags').value = "";
  }

  const Results = () => (
    <div>
      <Row >
        <Col xs lg="6" className="result">
          <Form.Label >
            Will take
          </Form.Label>
          <Form.Control readOnly id="result-num-trips" value={numTrips + ' trips'}/>
        </Col>
      </Row>

      <Row>
        <Col xs lg="6" className="result">
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
      <div class="d-flex p-8">
        <h1 className="text-center">Corn Trip Cost Calculator</h1>
      </div>

      <div class="d-flex p-8">
          <Form>
            <Row>
              <Col xs lg="6">
                <Form.Group controlId="num-bags">
                  <Form.Control type="number" placeholder="Enter number of bags of corn" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs lg="6">
                <Button variant="primary" type="submit" onClick={Calculate}>
                  Calculate
                </Button>
              </Col>
            </Row>

            { showResults ? <Results /> : null }

          </Form>
      </div>

    </Jumbotron>
     

  );
}

export default App;
