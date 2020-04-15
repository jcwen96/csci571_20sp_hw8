import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsCard from '../News/NewsCard';
import Loader from '../Loader';
import PropTypes from 'prop-types';

export default class search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      isLoading: true
    }
  }

  componentDidMount() {
    if (!this.props.isSearch) this.props.needFreshSearchBar();
    try {
      this.props.isSearch ? this.getSearch() : this.getFavorites();
    } catch(e) {
      console.log(e);
    }
  }

  getSearch = () => {
    let source = this.props.isGuardian ? "Guardian" : "NYTimes";
    let url = `https://csci571-20sp-hw8-front-jcwen.appspot.com/search/${source}/${encodeURIComponent(this.props.q)}`;
    console.log(`Front end make a call to back end [${url}], to search news with keyword [${this.props.q}] from ${source}`);
    fetch(url).then(res => res.json()).then(myJSON => {
      this.setState((state) => ({
        cards: state.cards.concat(myJSON),
        isLoading: false
      }));
      console.log(`Receive JSON from back end, here is the search result:`);
      console.log(this.state);
    }, (e) => {
      console.error(e);
    });
  }

  getFavorites = () => {
    this.props.needFreshSearchBar();
    let savedCards = [];
    for (let itemKey in localStorage) {
      let item = this.filterLocalStorage(localStorage.getItem(itemKey));
      if(item === "pass" || item === undefined || item === null) continue;
      if(typeof(item) === "object") savedCards.push(item);
    }
    console.log("Front end get saved news cards from local storage:");
    console.log(savedCards);
    this.setState({
      cards: savedCards,
      isLoading: false
    })
  }

  filterLocalStorage(item) {
    try {
      let i = JSON.parse(item);
      if (i.id && i.URL && i.Title && i.Image && i.Section && i.Date && i.Description)
        return i;
    } catch(e) {
      return "pass";
    }
  }

  render() {
    if (this.state.isLoading) return (<Loader />);
    if (this.state.cards.length === 0 && !this.props.isSearch) return (
      <h3 className="font-weight-normal mt-3 text-center">You have no saved articles</h3>
    );
    return (
      <Container fluid className="px-4">
        <Switch>
          <Route path="/favorites"><h3 className="font-weight-normal mt-3">Favorites</h3></Route>
          <Route path="/search"><h3 className="font-weight-normal">Results</h3></Route>
        </Switch>
        <Row>
          {this.state.cards.map((card) => (
            <Col key={card.id} sm={12} md={6} lg={4} xl={3} className="py-1">
              <NewsCard card={card}
                onDelete={this.getFavorites} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

}

search.propTypes = {
  isGuardian: PropTypes.bool.isRequired,
  isSearch: PropTypes.bool.isRequired,
  needFreshSearchBar: PropTypes.func,
  q: PropTypes.string
}