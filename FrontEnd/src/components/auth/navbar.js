import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  const logout = () => {
    localStorage.removeItem('token');
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/login">Mini Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {localStorage.token?<Nav.Link href="/login" onClick={e=>logout()}>Logout</Nav.Link>:null }
            {localStorage.token? null :   <Nav.Link href="/login">Login</Nav.Link>
 }
            <NavDropdown title="Reservations" id="basic-nav-dropdown">
              <NavDropdown.Item href="/reservation">List reservation</NavDropdown.Item>
              <NavDropdown.Item href="/addreservation">Ajout reservation</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            
            <NavDropdown title="Users" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Users">List users</NavDropdown.Item>
              <NavDropdown.Item href="/addUser">Ajout user</NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;