import React, { useState } from 'react';
import { IoMdShare } from 'react-icons/io';
import Modal from 'react-bootstrap/Modal';
import {
  FacebookShareButton, TwitterShareButton, EmailShareButton,
  FacebookIcon, TwitterIcon, EmailIcon
} from 'react-share';

import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

export default function ShareModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IoMdShare onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Switch>
              <Route path="/favorites">
                <div className="font-weight-bold">{props.source.toUpperCase()}</div>
                <div className="font-weight-normal" style={{ lineHeight: "normal" }}>{props.title}</div>
              </Route>
              <Route path="/">{props.title}</Route>
            </Switch>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center">Share via</h5>
          <div className="d-flex justify-content-around">
            <FacebookShareButton url={props.url} hashtag="#CSCI_571_NewsApp" >
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton url={props.url} hashtags={["CSCI_571_NewsApp"]}>
              <TwitterIcon size={48} round />
            </TwitterShareButton>
            <EmailShareButton url={props.url} subject="#CSCI_571_NewsApp">
              <EmailIcon size={48} round />
            </EmailShareButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ShareModal.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.string
}