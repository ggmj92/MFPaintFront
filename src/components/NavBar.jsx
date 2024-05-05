import React, { useState } from 'react'; 
import { Container, Nav, Navbar, Button, Dropdown } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/firebase'

function NavBar({ authUser, handlePurchaseClick }) {
  const userSignout = () => {
    signOut(auth)
    .then(() => {
      })
    .catch((error) => console.log(error));
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink className="navbar-brand" to="/">MFPaint</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {authUser ? (
              <>
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink className="nav-link" to="/artworks">Artworks</NavLink>
                <NavLink className="nav-link" to="/artists">Artists</NavLink>
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
                {authUser && <NavLink className="nav-link" to="/users">Users</NavLink>}
                {authUser && (
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="create-dropdown">
                      Create
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1" to="/newartwork" as={NavLink}>Artwork</Dropdown.Item>
                      <Dropdown.Item eventKey="2" to="/newartist" as={NavLink}>Artist</Dropdown.Item>
                      <Dropdown.Item eventKey="3" to="/newblogpost" as={NavLink}>Blogpost</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
                <NavLink className="nav-link" to="/user/settings">User</NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/signin">
                  <Button variant="light">Sign In</Button>
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  <Button variant="light">Sign Up</Button>
                </NavLink>
              </>
            )}
          </Nav>

          <Nav>
            {authUser && (
              <Button variant="light" onClick={userSignout}>Sign Out</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;







