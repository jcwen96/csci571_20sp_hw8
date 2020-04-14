import React, { Component } from 'react';
import NewsDetail from '../News/NewsDetail';
import Loader from '../Loader';

export default class article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      isLoading: true
    }
  }
  
  componentDidMount() {
    this.props.needFreshSearchBar(true);
    let source = this.props.isGuardian ? "Guardian" : "NYTimes";
    let url = `http://localhost:8080/article/${source}/${encodeURIComponent(this.props.id)}`;
    console.log(`Front end make a call to back end [${url}]`);
    fetch(url).then(res => res.json()).then(myJSON => {
      this.setState({
        article: myJSON,
        isLoading: false
      });
      this.props.needFreshSearchBar(false);
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
