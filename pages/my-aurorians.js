import React, {useState, useEffect} from 'react';
import OptionButtons from 'components/option-buttons/OptionButtons';
import MyAurorianList from 'components/my-aurorian-list/MyAurorianList';
import { Container, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import Head from 'next/head';
import axios from 'axios';
import { BackendUrl } from 'assets/api/api';
import { useRecoilState } from 'recoil';
import { userState } from 'atoms/atoms';

const MyAurorians = () => {
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
  const [user, setUser] = useRecoilState(userState);

  // useEffect
  useEffect(() => { 
    const token_id = window.sessionStorage.getItem('token_id')
    if(token_id){
      axios.get(BackendUrl+'/accounts/owned_char/', {
        headers: {
          'Authorization': token_id}
        })
        .then(res => setUser(
          {
            email: res.data.email,
            owned_char: JSON.parse(res.data.owned_char)
          })) 
    }else{
      setUser({
          email: "",
          fav_char: [],
          owned_char: [],
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
        <MyAurorianList options={options} setOptions={setOptions} user={user} setUser={setUser}></MyAurorianList>
      </Container>
    </div>
  )
  

}

export default MyAurorians;