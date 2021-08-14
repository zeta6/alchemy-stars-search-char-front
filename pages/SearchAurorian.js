
import { object } from 'prop-types';
import React, {useState, useEffect} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Head from 'next/head';
import axios from 'axios';


const SearchAurorian = () => {
  
  // useState
  const [ charName, setCharName ] = useState("")
  const [ options, setOptions ] = useState(
    {
      name: "",
      rarity: [],
      main_attribute: [],
      sub_attribute: [],
      class:[],
      special_role:[],
    }
  )
  const [ user, setUser ] = useState(
    {
      id: "", 
      email: "",
      provider: "",
      access_token:"",
      fav_char: []
    }
  )

  // useEffect
  useEffect(() => { 
    const user_email = window.sessionStorage.getItem('email')
    if(user_email){
      const access_token = window.sessionStorage.getItem('access_token')
      const submitData = {
        email: user_email,
        access_token: access_token
      }
      axios.post('http://127.0.0.1:8000/accounts/fav_char/', submitData)
        .then(res => setUser(
          {
            id: window.sessionStorage.getItem('id'),
            email: user_email,
            provider: window.sessionStorage.getItem('provider'),
            access_token: access_token,
            fav_char: JSON.parse(res.data.fav_char)
          })) 
    }
  }, [])

  // functions
  
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

return (
  <div className="layout-div">
  <Head>
  <title>백야극광 오로리안 검색기</title>
  </Head>
  <Header user={user} setUser={setUser}></Header>
  <Container className="bg-color-darknavy">
    <Row className="search-character-input-row">
      {/* <Button onClick={()=>console.log("checkuser",user)}> usercheck</Button>
      <Button onClick={()=>console.log("fav_cshr", user.fav_char)}> favchar check</Button> */}
      {/* <Button onClick={()=>console.log("jsonfav_cshr", JSON.parse(user.fav_char))}> favchar check</Button>
      <Button onClick={()=>console.log("jsonfav_cshr", JSON.parse(user.fav_char).concat(2))}> favchar check</Button> */}
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