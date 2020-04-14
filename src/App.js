import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import Body from './Body';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isGuardian: Boolean(localStorage.getItem("isGuardian")),
      search: "",
      freshSearchBar: false
    }
  }

  handleSwitchChange = (isGuardian) => {
    this.setState({ isGuardian });
  }

  handleSearchChange = (keyword) => {
    console.log(`search keyword: [${keyword}] from ${this.state.isGuardian ? "The Guardian": "New York Times"}`);
    this.setState({ search: keyword });
  }

  handleFreshSearchBar = (freshSearchBar) => {
    this.setState({ freshSearchBar });
  }

  render() {
    return (
      <Router>
        <Navigation freshSearchBar={this.state.freshSearchBar} isGuardian={this.state.isGuardian}
          onSwitchChange={this.handleSwitchChange} onSearchChange={this.handleSearchChange} needFreshSearchBar={this.handleFreshSearchBar} />
        <Body isGuardian={this.state.isGuardian} key={this.state.isGuardian.toString() + this.state.search} needFreshSearchBar={this.handleFreshSearchBar} />
        <ToastContainer
          position="top-center"
          hideProgressBar
          transition={Zoom} />
      </Router>
    );
  }

}
