import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import logo from "./images/logo_full_dark_750x200.png";
import fb_logo from "../../images/icons/socialmedia/facebook.png";
import { Link } from "react-router-dom";

function Header() {
  const isMobile = window.innerWidth <= 460;
  let isValid = true;
  //   FB.api(
  //     "/mahanaimtelford/live_videos",
  //     function (response) {
  //       if (response && !response.error) {
  //         isValid = true;
  //       }S
  //     }
  // );
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="navbar"
    >
      <Navbar.Brand className="navbarHeader">
        <Link className="nav-logo-div" to="/">
          <div className="nav-logo-subDiv1">
            <img alt="logo" className="logo_image_n" src={logo} />
          </div>
          {isMobile ? (
            <div className="nav-logo-subDiv2 text3d">
              <div>Mahanaim</div>
              <div>Church of God</div>
              <div>Telford - UK</div>
            </div>
          ) : (
            <div className="nav-logo-subDiv2 text3d">
              <div>Mahanaim Church of God</div>
              <div>Telford - UK</div>
            </div>
          )}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{ marginRight: "20px" }}
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end flex-grow-1 pe-3 me-auto">
          <Nav.Link>
            <Link className="nav_link_item" to="/about">
              About Us
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav_link_item" to="/kidsandyouth">
              Kids and Youth
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav_link_item" to="/sermons">
              Sermons
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav_link_item" to="/gallery">
              Gallery
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav_link_item" to="/leadership">
              Leadership
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className="nav_link_item" to="/contact">
              Contact
            </Link>
          </Nav.Link>
          {isValid ? (
            <Nav.Link>
              <Link className="nav_link_item_live" to="/live">
                <img
                  alt="fb logo"
                  src={fb_logo}
                  width="17px"
                  height="17px"
                ></img>
                <div>Live</div>
              </Link>
            </Nav.Link>
          ) : (
            <></>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
