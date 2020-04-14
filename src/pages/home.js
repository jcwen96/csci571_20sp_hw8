import React, { Component } from 'react';
import NewsBand from '../News/NewsBand';
import Loader from '../Loader';
import PropTypes from 'prop-types';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: [],
      isLoading: true
    };
  }

  componentDidMount() {
    let url = this.props.isGuardian ?
      `http://localhost:8080/Guardian/${this.props.section}` :
      `http://localhost:8080/NYTimes/${this.props.section}`;
    console.log(`Front end make a call to back end [${url}]`);
    fetch(url).then(res => res.json()).then(myJSON => {
      this.setState({
        bands: myJSON,
        isLoading: false
      });
      console.log(`Receive JSON from back end.`);
      console.log(this.state);
    }, (e) => {
      console.error(e);
    });
  }

  render() {
    let bands = this.state.bands;
    return (
      <>
        {this.state.isLoading ? <Loader /> : bands.map((band) => (
          <NewsBand key={band.id} band={band} />
        ))}
      </>
    );
  }
}

home.propTyeps = {
  isGuardian: PropTypes.bool.isRequired,
  section: PropTypes.string.isRequired
}