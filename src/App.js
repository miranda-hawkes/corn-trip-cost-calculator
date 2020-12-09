import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';

function App() {
  const [costOfTrip, setCostOfTrip] = useState(0);
  const [clear, setClear] = useState(false);

  useEffect( () => {
    document.querySelector('#result').value = "";
  },[])
  
  useEffect( () => {
    if(clear)
    document.querySelector('#result').value = "";
  })

  const Calculate = (e) => {
    e.preventDefault();
    if(clear) setClear(false);
    let numBags = document.querySelector('#num-bags').value
    if(numBags == '')
    return;
    let sum = numBags * 0.25
    setCostOfTrip(sum);
    document.querySelector('#num-bags').value = "";
  }

  return (

    <Container>

      <h1 className="header">Corn Trip Cost Calculator</h1>
    
      <Container>

        <Form>
          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <Form.Group controlId="num-bags">
                <Form.Control type="number" placeholder="Enter number of bags of corn" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col xs lg="4">
              <Button variant="primary" type="submit" onClick={Calculate}>
                Calculate
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>

        <Form>
          <Row className="justify-content-md-center">

            <Col xs lg="4">

              <Form.Label >
                At a cost of
              </Form.Label>
              <Form.Control plaintext readOnly defaultValue="email@example.com" id="result" value={'£' + costOfTrip}/>

            </Col>
          </Row>
        </Form>
      </Container>
    </Container> 
  );
}

export default App;
