import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FacebookShareButton, TwitterShareButton, EmailShareButton,
  FacebookIcon, TwitterIcon, EmailIcon
} from 'react-share';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from 'react-toastify';
import commentBox from 'commentbox.io';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Scroll = require('react-scroll');
const scroll = Scroll.animateScroll;

export default class NewsDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSaved: localStorage.getItem(this.props.article.id) != null,
      needMore: (this.props.article.Description.length > 700),
      isCallpsed: true
    }
    this.bottom = React.createRef();
    this.top = React.createRef();
  }

  componentDidMount() {
    this.removeCommentBox = commentBox('5688855629922304-proj');
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  handleBookmarkClick = () => {
    this.state.isSaved ? this.remove(this.props.article) : this.save(this.props.article);
  }

  save(article) {
    toast(() => <div className="text-body">{`Saving ${this.props.article.Title}`}</div>);
    localStorage.setItem(article.id, JSON.stringify(article));
    console.log(`Saved this article in local storage:`);
    console.log(article);
    this.setState({ isSaved: true });
  }

  remove(article) {
    toast(() => <div className="text-body">{`Removing - ${this.props.article.Title}`}</div>);
    localStorage.removeItem(article.id);
    console.log(`Removed this article in local storage:`);
    console.log(article);
    this.setState({ isSaved: false });
  }

  handleReadmoreClick = () => {
    this.setState({ isCallpsed: false });
    scroll.scrollToBottom();
  }

  handleReadLessClick = () => {
    this.setState({ isCallpsed: true });
    scroll.scrollToTop();
  }

  render() {
    let article = this.props.article;
    return (
      <Container fluid className="p-3">
        <Container fluid className="border rounded shadow p-3">
          <h3 ref={this.top} className="font-italic font-weight-normal">{article.Title}</h3>
          <Container fluid>
            <Row className="my-2">
              <Col xs={6} sm={9} lg={10} className="font-italic">{article.Date}</Col>
              <Col>
                <OverlayTrigger overlay={<Tooltip>Facebook</Tooltip>}>
                  <FacebookShareButton url={article.URL} hashtag="#CSCI_571_NewsApp" >
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Twitter</Tooltip>}>
                  <TwitterShareButton url={article.URL} hashtags={[`CSCI_571_NewsApp`]}>
                    <TwitterIcon size={24} round />
                  </TwitterShareButton >
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Email</Tooltip>}>
                  <EmailShareButton url={article.URL} subject="#CSCI_571_NewsApp">
                    <EmailIcon size={24} round />
                  </EmailShareButton>
                </OverlayTrigger>
              </Col>
              <div onClick={this.handleBookmarkClick}
                style={{ fontSize: "larger", color: "#aa0031", cursor: "pointer" }}>
                {this.state.isSaved ? <FaBookmark data-tip="Bookmark" /> : <FaRegBookmark data-tip="Bookmark" />}
              </div>
            </Row>
          </Container>
          <div className="text-center">
            <img src={article.Image} className="img-fluid" alt={article.Title} />
          </div>
          {this.state.needMore ?
            this.state.isCallpsed ?
              <><p className="clamp">{article.Description}</p>
                <div className="text-right">
                  <span onClick={this.handleReadmoreClick}><FaChevronDown /></span>
                </div></> :
              <><p>{article.Description}</p>
                <div ref={this.bottom} className="text-right">
                  <span onClick={this.handleReadLessClick}><FaChevronUp /></span>
                </div></> :
            <p>{article.Description}</p>
          }
        </Container>
        <div className="commentbox px-3 pt-5" id={article.id} />
      </Container>
    )
  }
}

NewsDetail.propTypes = {
  article: PropTypes.object.isRequired
}