import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './App.css';

const App = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header">Corn Trip Cost Calculator</h1>

      <Row className="justify-content-md-center">
        <Col xs lg="4">
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter number of bags"
              aria-label="Number of bags"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>
      </Row>

    </Jumbotron>
  </Container>
);

export default App;
