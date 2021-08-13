import { Container, Navbar, Button} from 'react-bootstrap';
// import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

// const handleLogin = () => {
//   // console.log('fsfwfw')
//   // axios.get("http://127.0.0.1:8000/accounts/google/login)")
//     // .then(res => console(res.data))
//   location.href = "http://127.0.0.1:8000/accounts/google/login"
// }



const Header = ({user, setUser}) => {
  const googleClientID = '571135633127-mt9gkbshie9u75vg18thc0u4j3ktec5q.apps.googleusercontent.com';
  
  const handleGoogleLogin = (loginResponse) => {
    console.log(loginResponse);   
    const googleUser = {
      id: loginResponse.profileObj.googleId,
      email: loginResponse.profileObj.email,
      provider: "google",
      access_token: loginResponse.tokenObj.access_token,
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
        window.sessionStorage.setItem('logged', true);
        window.sessionStorage.setItem('activeUser', activeUser);
        window.sessionStorage.setItem('id', userData.id);
        window.sessionStorage.setItem('email', userData.email);
        window.sessionStorage.setItem('provider', userData.provider);
        window.sessionStorage.setItem('access_token', userData.access_token);
        window.sessionStorage.setItem('fav_char', userData.fav_char);
      }else{
        return console.log("error")
      }
    }
  
    axios.post('http://127.0.0.1:8000/accounts/google_login/',
      googleUser) 
      .then(res => checkLogin(res))
  }
  return(
    <div>
      <Navbar className="bg-color-darkslateblue" variant="dark">
        <Container>
        <Navbar.Brand href="/">SearchAurorian</Navbar.Brand>
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
}
export default Header