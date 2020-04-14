import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import Container from 'react-bootstrap/Container';

export default function Loader() {
  return (
    <Container fluid style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }} >
      <div className="d-flex justify-content-center">
        <BounceLoader color="#123abc" size={40} />
      </div>
      <h4 className="d-flex justify-content-center m-1">Loading</h4>
    </Container>
  )
}