import { Container, Navbar} from 'react-bootstrap';
import axios from 'axios';

const handleLogin = () => {
  // console.log('fsfwfw')
  // axios.get("http://127.0.0.1:8000/accounts/google/login)")
    // .then(res => console(res.data))
  location.href = "http://127.0.0.1:8000/accounts/google/login"
} 

const Header = () => {
  return(
  <Navbar className="bg-color-darkslateblue" variant="dark">
    <Container>
    <Navbar.Brand href="/">SearchAurorian</Navbar.Brand>
    <Navbar.Brand onClick={()=>handleLogin()}>Login</Navbar.Brand>
    </Container>
  </Navbar>
  )
}
export default Header