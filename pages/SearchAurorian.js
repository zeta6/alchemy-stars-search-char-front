
import { object } from 'prop-types';
import React, {useEffect, useState} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, InputGroup, FormControl} from 'react-bootstrap';
import Layout from '../components/Layout';
import Head from 'next/head';

const SearchAurorian = () => {
  const [ options, setOptions] = useState(
    {
      name: "",
      rarity: [],
      main_attribute: [],
      sub_attribute: [],
      class:[]
    }
  )
  const [characterList, setCharacterList] = useState([]);
  useEffect(() => {
    axios.get("https://alchemystars.link:8715/api/characters/")
      .then(response => setCharacterList(response.data)) 
      .catch(error => console.log(error));
},[]); 

  const handleChange = (e) => {
    let value = e.target.value;

    const _options = { ...options, name: value };

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
        />
      </InputGroup>
    </Row>
    <OptionButtons options={options} setOptions={setOptions}></OptionButtons>
    <CharacterList options={options} setOptions={setOptions} characterList={characterList} setCharacterList={setCharacterList}></CharacterList>
  </Container>
  </div>
  )
}

export default SearchAurorian;