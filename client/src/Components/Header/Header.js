import React from 'react';
import logo from '../../images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Logins from '../Logins/Logins';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="40"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Movie Playlist Generator
        </Navbar.Brand>

        <Nav className="justify-content-end" style={{ width: '100%' }}>
          <Nav.Item>
            <Logins></Logins>
          </Nav.Item>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Title as="h3">Info</Popover.Title>
                <Popover.Content>
                  This service allows you to search for Movie playlists and
                  import them into your spotify account. For best results use
                  the "Spotify Log in" button before making a search.
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="secondary" size="sm">
              Info
            </Button>
          </OverlayTrigger>{' '}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
