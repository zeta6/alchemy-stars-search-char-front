import { Container, Navbar, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { BackendUrl, googleClientID } from './BackendUrl'
import Link from 'next/link';

const Header = ({user, setUser}) => {

  const handleGoogleLogin = (google_res) => {
    
    const checkLogin = (response) => {
      if(response.data){
        const userData = response.data;
        const activeUser = {
          email: userData.email,
          fav_char : JSON.parse(userData.fav_char),
          owned_char : JSON.parse(userData.owned_char)
        }
        setUser(activeUser)
        window.sessionStorage.setItem('token_id', google_res.tokenId);
      }else{
        return console.log("error")
      }
    }
  
    axios.get(BackendUrl+'/accounts/google_login/', {
      headers: {
        'Authorization': google_res.tokenId}
      })
      .then(res => checkLogin(res))
      .catch(err => console.log(err))
  }

  const handleLogout = () => {
    setUser({
      email: "",
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
      
      const token_id = window.sessionStorage.getItem('token_id');
      axios.get(BackendUrl+'/accounts/google_withdrawal/',{
        headers: {
          'Authorization': token_id}
        })
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
            <Link href='/MyAurorians' passHref>
              <Button className="myaurorians-btn">My aurorians</Button>
            </Link>
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