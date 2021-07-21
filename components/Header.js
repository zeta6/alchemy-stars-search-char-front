
import { Container, Row, Navbar, Nav, Col, InputGroup, FormControl} from 'react-bootstrap';

const Header = () => {
  return(
  <Navbar className="bg-color-darkslateblue" variant="dark">
    <Container>
    <Navbar.Brand href="/">SearchAurorian</Navbar.Brand>
    {/* <Nav className="justify-content-end">
      <Nav><input></input></Nav>
    </Nav> */}
    </Container>
  </Navbar>
  )
}
export default Header