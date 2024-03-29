import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Switch as RouterSwitch, Route, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Switch from "react-switch";
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.isGuardian,
      link: "init"
    };
  }

  handleChange = (checked) => {
    this.setState({ checked });
    this.props.needFreshSearchBar();
    localStorage.setItem("isGuardian", checked);
    this.props.onSwitchChange(checked);
  }

  handleClick = (link) => {
    this.setState({ link });
    this.props.needFreshSearchBar();
  }

  handleFavoriteClick = () => {
    this.props.needFreshSearchBar();
    this.setState({ link: "favorites" });
  }

  render() {
    const links = ["", "World", "Politics", "Business", "Technology", "Sports"];
    return (
      <Navbar variant="dark" expand="lg" style={{ backgroundImage: 'linear-gradient(to right, #1c263b, #4d669d)' }}>
        <SearchBar key={this.props.freshSearchBar.toString()}
          onSearchChange={this.props.onSearchChange}
          onChange={() => this.setState({ link: "search" })} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {links.map((link) => (
              <div key={link} onClick={() => this.handleClick(link)}>
                <Nav.Link className={this.state.link === link ? "active" : ""} value={link}
                  as={Link} to={`/${link}`}>
                  {(link !== "" ? link : "Home")}
                </Nav.Link>
              </div>
            ))}
          </Nav>
          <Nav><Navbar.Brand as={Link} to="/favorites">
            <OverlayTrigger placement={"bottom"} overlay={
              <Tooltip>Bookmark</Tooltip>}>
              <div onClick={this.handleFavoriteClick}>
                <RouterSwitch>
                  <Route path="/favorites"><FaBookmark /></Route>
                  <Route path="/"><FaRegBookmark /></Route>
                </RouterSwitch>
              </div>
            </OverlayTrigger>
          </Navbar.Brand></Nav>
          <RouterSwitch>
            <Route path="/article" />
            <Route path="/search" />
            <Route path="/favorites" />
            <Route path="/">
              <Nav><Navbar.Brand>NYTimes</Navbar.Brand></Nav>
              <Nav className="m-2">
                <Switch onChange={this.handleChange} checked={this.state.checked}
                  onColor="#3e8ee5" offColor="#d8d8d8"
                  uncheckedIcon={false} checkedIcon={false} />
              </Nav>
              <Nav><Navbar.Brand>Guardian</Navbar.Brand></Nav>
            </Route>
          </RouterSwitch>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  isGuardian: PropTypes.bool.isRequired,
  freshSearchBar: PropTypes.bool.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  needFreshSearchBar: PropTypes.func.isRequired
}