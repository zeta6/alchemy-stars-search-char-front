import { Container, Navbar, Button} from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { BackendUrl, googleClientID } from 'assets/api/api'
import Link from 'next/link';
import { userState } from 'atoms/atoms'
import { useRecoilState } from 'recoil'

const Header = () => {
  const [user, setUser] = useRecoilState(userState);

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

    const token = google_res.tokenId
  
    axios.get(BackendUrl+'/accounts/google_login/', {
      headers: {
        'Authorization': token}
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

  // if(user === null){
  //   return(
  //     <div className="navbar-top">
  //       <Navbar variant="dark" className="bg-color-darkslateblue">
  //         <Container className="navbar-container">
  //         <Navbar.Brand href="/"><span className="navbar-title-span"
  //         >SearchAurorian</span></Navbar.Brand>
  //         </Container>
  //         <Navbar.Brand>
  //         </Navbar.Brand>
  //       </Navbar>
  //     </div>
  //   )
  // }
  // else 
  if(!user || user.email == ""){ 
    return(
      <div className="navbar-top">
        <Navbar variant="dark" className="bg-color-darkslateblue">
          <Container className="navbar-container">
          <Navbar.Brand href="/"><span className="navbar-title-span"
          >SearchAurorian</span></Navbar.Brand>
          <Navbar.Brand>
            <Link href='/recruit-simulator' passHref>
              <Button className="navbar-btn">Recruit<br></br>simul</Button>
            </Link>
            <Link href='/my-aurorians' passHref>
              <Button className="navbar-btn">Aurorian<br></br>checker</Button>
            </Link>
            <GoogleLogin  
              clientId={googleClientID}
              render={renderProps => (
              <Button className="google-login-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google<br></br>login</Button>
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
            <Link href='/recruit-simulator' passHref>
              <Button className="navbar-btn">Recruit<br></br>simul</Button>
            </Link>
            <Link href='/my-aurorians' passHref>
              <Button className="navbar-btn">Aurorian<br></br>checker</Button>
            </Link>
            <Button className="logout-btn" onClick={()=>handleLogout()}>Log Out</Button>
            <Button className="withdrawal" onClick={()=>handleWithdrawal()}>Membership<br></br>withdrawal</Button>
          </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default Header