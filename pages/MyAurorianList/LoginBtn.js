import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl, googleClientID } from '../../components/BackendUrl'
import GoogleLogin from 'react-google-login';

const LoginBtn = ({setUser}) => { 
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

    return(
      <GoogleLogin  
        clientId={googleClientID}
        render={renderProps => (
          <Button className="myaurorian-top-card" onClick={renderProps.onClick} disabled={renderProps.disabled}>로그인 시 보유 오로리안을 저장할 수 있습니다.</Button>
          )}
        onSuccess={(res)=>{
          handleGoogleLogin(res);
        }}
        onFailure={(err)=>{
          console.log(err);
        }}
        >
      </GoogleLogin>
    )
  }


  export default React.memo(LoginBtn);