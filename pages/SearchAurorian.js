
import { object } from 'prop-types';
import React, {useState} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import Layout from '../components/Layout';
import Head from 'next/head';

const SearchAurorian = () => {
  const [ charName, setCharName ] = useState("")
  const [ options, setOptions] = useState(
    {
      name: "",
      rarity: [],
      main_attribute: [],
      sub_attribute: [],
      class:[]
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

return (
  <div>
  <Head>
  <title>백야극광 오로리안 검색기</title>
  </Head>
  <Layout></Layout>
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
    <CharacterList options={options} setOptions={setOptions}></CharacterList>
  </Container>
  </div>
  )
}

export default SearchAurorian;