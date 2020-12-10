import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
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

  const Results = () => (
    <div>
      <Row >
        <Col md lg="12" className="result">
          <Form.Label >
            Will take
          </Form.Label>
          <Form.Control readOnly id="result-num-trips" value={numTrips + ' ferry trips'}/>
        </Col>
      </Row>

      <Row>
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
        <h1 className="text-center">Corn Trip Cost Calculator</h1>
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
