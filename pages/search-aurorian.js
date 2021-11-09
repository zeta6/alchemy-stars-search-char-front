
import { object } from 'prop-types';
import React, {useState, useEffect} from 'react';
import OptionButtons from 'components/option-buttons/OptionButtons';
import CharacterList from 'components/character-list/CharacterList';
import { Container, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import Head from 'next/head';
import axios from 'axios';
import { BackendUrl } from 'assets/api/api';
import { encrypt, decrypt } from 'assets/crypto/crypto';


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
  const [ user, setUser ] = useState(null)

  // useEffect
  useEffect(() => {
    const token_id = window.sessionStorage.getItem('token_id')
    if(token_id){
      axios.get(BackendUrl+'/accounts/fav_char/',{
        headers: {
          'Authorization': token_id}
        })
        .then(res => setUser(
          {
            email: res.data.email,
            fav_char: JSON.parse(res.data.fav_char)
          })) 
    }else{
      setUser({
          email: "",
          fav_char: []
        })
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
  <Container className="bg-color-darknavy">
    <Row className="search-character-input-row">
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