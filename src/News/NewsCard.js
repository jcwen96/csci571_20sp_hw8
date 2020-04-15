import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ShareModal from './ShareModal';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class NewsCard extends React.Component {

  handleCardClick = () => {
    this.props.history.push(`/article?id=${encodeURIComponent(this.props.card.id)}`);
  }

  handleShareClick = (e) => {
    e.stopPropagation();
  }

  handleDelete = () => {
    toast(() => <div className="text-body">{`Removing - ${this.props.card.Title}`}</div>);
    localStorage.removeItem(this.props.card.id);
    console.log(`Removed this article in local storage:`);
    console.log(this.props.card);
    this.props.onDelete();
  }

  computeSource = (url) => {
    if(url.origin.includes("nytimes")) return "nytimes";
    if(url.origin.includes("guardian")) return "guardian";
  }

  render() {
    let card = this.props.card;
    let source = this.computeSource(new URL(card.URL));
    return (
      <div onClick={this.handleCardClick} style={{ cursor: "pointer" }}>
        <Container fluid className="border rounded shadow px-3 py-4">
          <h6 className="font-italic font-weight-bold mb-3">{card.Title}
            <span className="ml-2" onClick={this.handleShareClick}>
              <ShareModal title={card.Title} url={card.URL} source={source} />
              <Route path="/favorites"><MdDelete onClick={this.handleDelete} /></Route>
            </span>
          </h6>
          <img src={card.Image} className="img-fluid img-thumbnail" alt={card.Title} />
          <Row className="my-3">
            <Col className="font-italic">{card.Date}</Col>
            <Col xs="auto">
              <Badge className={card.Section}>{card.Section.toUpperCase()}</Badge>
              {window.location.pathname==="/favorites" ?
                <Badge className={`${source} ml-2`}>{source.toUpperCase()}</Badge> : ""}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default withRouter(NewsCard);

NewsCard.propTypes = {
  card: PropTypes.object.isRequired
}
