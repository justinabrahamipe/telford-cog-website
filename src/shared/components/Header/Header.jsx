import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import logo from "./images/logo_full_dark_750x200.png";
import fb_logo from "../../images/icons/socialmedia/facebook.png";

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
      <Navbar.Brand className="navbarHeader" to="/">
        <div className="nav-logo-div">
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
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{ marginRight: "20px" }}
      />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="justify-content-end flex-grow-1 pe-3 me-auto">
          <Nav.Link to="/about">
            <div className="nav_link_item">About Us</div>
          </Nav.Link>
          <Nav.Link to="/kidsandyouth">
            <div className="nav_link_item">Kids and Youth</div>
          </Nav.Link>
          <Nav.Link to="/sermons">
            <div className="nav_link_item">Sermons</div>
          </Nav.Link>
          <Nav.Link to="/gallery">
            <div className="nav_link_item">Gallery</div>
          </Nav.Link>
          <Nav.Link to="/leadership">
            <div className="nav_link_item">Leadership</div>
          </Nav.Link>
          <Nav.Link to="/contact">
            <div className="nav_link_item"> Contact</div>
          </Nav.Link>
          {isValid ? (
            <Nav.Link to="/live">
              <div className="nav_link_item_live">
                <img alt='fb logo' src={fb_logo} width="17px" height="17px"></img>
                <div>Live</div>
              </div>
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
