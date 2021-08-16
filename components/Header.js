import { Container, Navbar, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { BackendUrl } from './BackendUrl'
import Link from 'next/link';

const Header = ({user, setUser}) => {
  const googleClientID = '571135633127-mt9gkbshie9u75vg18thc0u4j3ktec5q.apps.googleusercontent.com';
  
  const handleGoogleLogin = (loginResponse) => {
    const googleUser = {
      id: loginResponse.profileObj.googleId,
      email: loginResponse.profileObj.email,
      provider: "google",
      access_token: loginResponse.tokenObj.access_token,
      fav_char: "[]",
      owned_char: "[]"
    }
  
    const checkLogin = (reponse) => {
      if(reponse.data){
        const userData = reponse.data;
        const activeUser = {
          id: userData.id,
          email: userData.email,
          provider: userData.provider,
          access_token: userData.access_token,
          fav_char : JSON.parse(userData.fav_char),
          owned_char : JSON.parse(userData.owned_char)
        }
        setUser(activeUser)
        window.sessionStorage.setItem('id', userData.id);
        window.sessionStorage.setItem('email', userData.email);
        window.sessionStorage.setItem('provider', userData.provider);
        window.sessionStorage.setItem('access_token', userData.access_token);
        window.sessionStorage.setItem('fav_char', userData.fav_char);
        window.sessionStorage.setItem('owned_char', userData.owned_char);
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
      fav_char: [],
      owned_char: []
      });
      window.sessionStorage.clear();
  }

  const handleWithdrawal = () => {
    if(window.confirm("탈퇴하시겠습니까? 탈퇴 시 회원데이터는 삭제되고 복구는 불가능합니다." )){
      const checkDel = (res) => {
        if(res.data["del"] == "success"){
          handleLogout()
          alert("탈퇴되었습니다.")
        }
        else{
          alert("인증과정에 문제가 있어 탈퇴되지 않았습니다.")
        }
      }
      const submitData = {
        email: user.email,
        access_token: user.access_token
      }
      axios.post(BackendUrl+'/accounts/google_withdrawal/',
      submitData) 
      .then(res => checkDel(res))
      .catch(err => console.log(err))
    } 
  }

  if(user === null){
    return(
      <div className="navbar-top">
        <Navbar variant="dark" className="bg-color-darkslateblue">
          <Container className="navbar-container">
          <Navbar.Brand href="/"><span className="navbar-title-span"
          >SearchAurorian</span></Navbar.Brand>
          </Container>
          <Navbar.Brand>
          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
  else if(!user || user.email == ""){ 
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
            <Link href='/MyAurorians' passHref>
              <Button className="myaurorians-btn">My Aurorians</Button>
            </Link>
            <Button className="logout-btn" onClick={()=>handleLogout()}>Log Out</Button>
            <Button className="google-login-btn" onClick={()=>handleWithdrawal()}>Withdrawal</Button>
          </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    )
  }
}
export default Header