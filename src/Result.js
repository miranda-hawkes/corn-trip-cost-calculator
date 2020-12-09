import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './App.css';

// const App = () => (

//   <Container>
    
//       <h1 className="header">Corn Trip Cost Calculator</h1>
      
//       <Container>

//       <Form>
//         <Row className="justify-content-md-center">
//           <Col xs lg="4">
//             <Form.Group controlId="numBags">
//               <Form.Control type="num-bags" placeholder="Enter number of bags of corn" />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="justify-content-md-center">
//           <Col xs lg="4">
//             <Button variant="primary" type="submit">
//               Calculate
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//       </Container>
      
//   </Container>
// );

import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-title">
        <h1> Basic Form Calculator</h1>
      </div>
      <form>
            <input type="text" id="result" readOnly />   
            <input type="text" id="num" placeholder="enter a number" />
            <button>Add</button>
            <button>Clear</button>
      </form>
    </div>
  );
}

export default App;
