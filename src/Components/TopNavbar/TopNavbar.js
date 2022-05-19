import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { BiLogOutCircle } from "react-icons/bi";

const TopNavbar = () => {
  // firebase hook
  const [user, loading, error] = useAuthState(auth);

  const [displayName, setdisplayName] = useState("");
  const handelSignout = () => {
    signOut(auth);
  };
  console.log(user);
  console.log(user?.displayName);
  console.log(user?.uid);
  useEffect(() => {
    setdisplayName(user?.displayName);
  }, [loading, user?.displayName]);

  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ width: "100%" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Simple Todo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="allTask">
                  Add task
                </Nav.Link>
                <Nav.Link as={Link} to="allTask">
                  All task
                </Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>
          <Nav>
            {!user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/authentication/login"
                  state={{ Islogin: true }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  as={Link}
                  to="/authentication/register"
                  state={{ Islogin: false }}
                >
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={handelSignout}>
                  Signout <BiLogOutCircle />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
