import { Container, Navbar, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { BackendUrl } from './BackendUrl'

const Header = ({user, setUser}) => {
  const googleClientID = '571135633127-mt9gkbshie9u75vg18thc0u4j3ktec5q.apps.googleusercontent.com';
  
  const handleGoogleLogin = (loginResponse) => {
    const googleUser = {
      id: loginResponse.profileObj.googleId,
      email: loginResponse.profileObj.email,
      provider: "google",
      access_token: loginResponse.tokenObj.access_token,
      fav_char: "[]"
    }
  
    const checkLogin = (reponse) => {
      if(reponse.data){
        const userData = reponse.data;
        const activeUser = {
          id: userData.id,
          email: userData.email,
          provider: userData.provider,
          access_token: userData.access_token,
          fav_char : JSON.parse(userData.fav_char)
        }
        setUser(activeUser)
        window.sessionStorage.setItem('id', userData.id);
        window.sessionStorage.setItem('email', userData.email);
        window.sessionStorage.setItem('provider', userData.provider);
        window.sessionStorage.setItem('access_token', userData.access_token);
        window.sessionStorage.setItem('fav_char', userData.fav_char);
      }else{
        return console.log("error")
      }
    }
  
    axios.post(BackendUrl+'/accounts/google_login/',
      googleUser) 
      .then(res => checkLogin(res))
      .catch(err => console.log(err))
  }

    const handleLogout = () => {
      setUser({
        id: "", 
        email: "",
        provider: "",
        access_token:"",
        fav_char: []
        });
        window.sessionStorage.clear();
    }

  if(!user || user.email == ""){ 
    return(
      <div className="navbar-top">
        <Navbar variant="dark" className="bg-color-darkslateblue">
          <Container className="navbar-container">
          <Navbar.Brand href="/"><span className="navbar-title-span"
          >SearchAurorian</span></Navbar.Brand>
          <Navbar.Brand>
            <GoogleLogin  
              clientId={googleClientID}
              render={renderProps => (
              <Button className="google-login-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</Button>
              )}
              onSuccess={(res)=>{
                handleGoogleLogin(res);
              }}
              onFailure={(err)=>{
                console.log(err);
              }}
              // isSignedIn={true}
              >
            </GoogleLogin>
          </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    )
  }else{
    return(
      <div className="navbar-top">
        <Navbar variant="dark" className="bg-color-darkslateblue">
          <Container className="navbar-container">
          <Navbar.Brand href="/"><span className="navbar-title-span"
          >SearchAurorian</span></Navbar.Brand>
          <Navbar.Brand>
            <Button className="google-login-btn" onClick={()=>handleLogout()}>Log Out</Button>
          </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    )
  }
}
export default Header