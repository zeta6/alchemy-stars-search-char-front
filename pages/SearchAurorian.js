
import { object } from 'prop-types';
import React, {useState} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import Layout from '../components/Layout';
import Head from 'next/head';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const SearchAurorian = () => {

  const googleClientID = '571135633127-mt9gkbshie9u75vg18thc0u4j3ktec5q.apps.googleusercontent.com';
  const [ charName, setCharName ] = useState("")
  const [ options, setOptions] = useState(
    {
      name: "",
      rarity: [],
      main_attribute: [],
      sub_attribute: [],
      class:[],
      special_role:[],
    }
  )
  const [ user, setUser] = useState(
    {
      id: "", 
      email: "",
      provider: "",
      access_token:"",
      fav_char: []
    }
  )
  
  const handleChange = (e) => {
    setCharName(e.target.value);
  }
  
  const handleInputName = (e) => {
    if(e.key == "Enter"){
      handleSearch();
    }
  }

  const handleSearch = () => {
    const _options = { ...options, "name": charName};
    setOptions(_options);
  }

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
        setUser(
          {
            id: userData.id,
            email: userData.email,
            provider: userData.provider,
            access_token: userData.access_token,
            fav_char : JSON.parse(userData.fav_char)
          }
        )
      }else{
        return console.log("error")
      }
    }

    axios.post('http://127.0.0.1:8000/accounts/google_login/',
      googleUser) 
      .then(res => checkLogin(res))
  }

return (
  <div>
  <Head>
  <title>백야극광 오로리안 검색기</title>
  </Head>
  <Layout></Layout>
  <Container className="bg-color-darknavy">
    <Row className="search-character-input-row">
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
        }}b
        >
      </GoogleLogin>
      <Button onClick={()=>console.log("checkuser",user)}> usercheck</Button>
      <Button onClick={()=>console.log("fav_cshr", user.fav_char)}> favchar check</Button>
      <Button onClick={()=>console.log("jsonfav_cshr", JSON.parse(user.fav_char))}> favchar check</Button>
      <Button onClick={()=>console.log("jsonfav_cshr", JSON.parse(user.fav_char).concat(2))}> favchar check</Button>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">캐릭터 이름</InputGroup.Text>
        <FormControl
          placeholder=""
          aria-label="Charactername"
          aria-describedby="basic-addon1"
          onChange={(e)=>handleChange(e)}
          onKeyPress={(e)=>handleInputName(e)}
        /> <Button onClick={()=>handleSearch()}>이름 검색</Button>
      </InputGroup>
    </Row>
    <OptionButtons options={options} setOptions={setOptions}></OptionButtons>
    <CharacterList options={options} setOptions={setOptions} user={user} setUser={setUser}></CharacterList>
  </Container>
  </div>
  )
}

export default SearchAurorian;