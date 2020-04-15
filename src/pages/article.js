import React, { Component } from 'react';
import NewsDetail from '../News/NewsDetail';
import Loader from '../Loader';
import PropTypes from 'prop-types';

export default class article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isLoading: true
    }
  }
  
  componentDidMount() {
    this.props.needFreshSearchBar();
    let source = this.props.isGuardian ? "Guardian" : "NYTimes";
    let url = `https://csci571-20sp-hw8-front-jcwen.appspot.com/article/${source}/${encodeURIComponent(this.props.id)}`;
    console.log(`Front end make a call to back end [${url}]`);
    fetch(url).then(res => res.json()).then(myJSON => {
      this.setState({
        article: myJSON,
        isLoading: false
      });
      // this.props.needFreshSearchBar(false);
      console.log(`Receive JSON from back end, here is the article:`);
      console.log(this.state);
    }, (e) => {
      console.error(e);
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? <Loader /> : <NewsDetail article={this.state.article} />}
      </React.Fragment>
    );
  }

}

article.propTypes = {
  id: PropTypes.string.isRequired,
  isGuardian: PropTypes.bool.isRequired,
  needFreshSearchBar: PropTypes.func.isRequired
}