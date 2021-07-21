
import { object } from 'prop-types';
import React, {useEffect, useState} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, Col, InputGroup, FormControl} from 'react-bootstrap';
import Layout from '../components/Layout';

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

  const handleChange = (e) => {
    let value = e.target.value;

    const _options = { ...options, name: value };

    setOptions(_options);
    console.log(options);
  }

return (
  <div>
  <Layout></Layout>
  <Container className="bg-color-darknavy">
    <Row className="search-character-input-row">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Charactername</InputGroup.Text>
        <FormControl
          placeholder=""
          aria-label="Charactername"
          aria-describedby="basic-addon1"
          onChange={(e)=>handleChange(e)}
        />
      </InputGroup>
    </Row>
    <OptionButtons options={options} setOptions={setOptions}></OptionButtons>
    <CharacterList options={options}></CharacterList>
    <div>
      <span>{options.main_attribute}</span>
      <br></br>
      <span>{options.sub_attribute}</span>
    </div>
    <br/>
    {/* <div>
    {RenderKeyValue(options)}
    </div> */}
  </Container>
  </div>
  )
}

export default SearchAurorian;