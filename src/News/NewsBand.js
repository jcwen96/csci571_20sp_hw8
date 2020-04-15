import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ShareModal from './ShareModal';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class NewsBand extends React.Component {

  handleBandClick = () => {
    this.props.history.push(`/article?id=${this.props.band.id}`);
  }

  handleShareClick = (e) => {
    e.stopPropagation();
  }

  render() {
    let band = this.props.band;
    return (
      <Container fluid className="p-3">
        <div onClick={this.handleBandClick} style={{ cursor: "pointer" }}>
          <Container fluid className="border rounded shadow p-3">
            <Row>
              <Col sm={12} md={6} lg={4} xl={3}>
                <img src={band.Image} className="img-fluid img-thumbnail" alt={band.Title} />
              </Col>
              <Col>
                <h5 className="font-italic font-weight-bold">{band.Title}
                  <span onClick={this.handleShareClick}>
                    <ShareModal title={band.Title} url={band.URL} source="" />
                  </span>
                </h5>
                <p className="clamp">{band.Description}</p>
                <Row>
                  <Col className="font-italic"> <h6>{band.Date} </h6></Col>
                  <Col xs="auto"><Badge className={band.Section} style={{ fontSize: "1em" }}>{band.Section.toUpperCase()}</Badge></Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    );
  }

}

export default withRouter(NewsBand);

NewsBand.propTypes = {
  band: PropTypes.object.isRequired
}