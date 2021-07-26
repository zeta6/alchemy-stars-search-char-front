
import { Container, Navbar} from 'react-bootstrap';

const Header = () => {
  return(
  <Navbar className="bg-color-darkslateblue" variant="dark">
    <Container>
    <Navbar.Brand href="/">SearchAurorian</Navbar.Brand>
    </Container>
  </Navbar>
  )
}
export default Header