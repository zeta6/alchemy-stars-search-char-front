
import { object } from 'prop-types';
import React, {useEffect, useState} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { InputGroup, FormControl, Pagination } from 'react-bootstrap';

const SearchChar = () => {
  const [ options, setOptions] = useState(
    {
      name: "",
      rarity: [],
      main_attribute: [],
      sub_attribute: [],
      class:[]
    }
  )
  const [ loading, setLoading] = useState(true);
  // const [ testData, setTestData ] = useState([_testData]);
  // const [ filteredCharacter, setFilteredCharacter] = useState([
  //   {
  //     id: "1",
  //     name: "6migard",
  //     rarity: "6",
  //     main_attribute: "forest",
  //     sub_attribute: "forest",
  //     class: "sniper",
  //   },
  //   {
  //     id: "2",
  //     name: "5migard",
  //     rarity: "5",
  //     main_attribute: "forest",
  //     sub_attribute: "forest",
  //     class: "sniper",
  //   }
  // ]);

  // useEffect(() => {
  //   setFilteredCharacter(_testData.filter(characterFilter));
  //   console.log("filttered",filteredCharacter);
  //   console.log("options",options);
    // setFilteredCharacter(filteredCharacter.filter(characterFilter));
  // },
  //   []);

  // const characterFilter = (character) => {
  //   if(character.name.indexOf(options.name) !== -1 || options.name.length == 0){
  //     if(options.rarity.includes(character.rarity) || options.rarity.length == 0){
  //       if(options.main_attribute.includes(character.main_attribute) || options.main_attribute.length == 0){
  //         if(options.sub_attribute.includes(character.sub_attribute) || options.sub_attribute.length == 0){
  //           if(options.class.includes(character.class) || options.class.length == 0){
  //             return character;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }


  const RenderKeyValue = (datas) => {  
    const keys = Object.keys(datas);
    return keys.map((key, index) => {
      return (
        <div key={index}>
          <span>
          {key}: &nbsp; 
          {datas[key]}
          </span>
          <br></br>
        </div>
      )
    })
  }

  const handleChange = (e) => {
    let value = e.target.value;

    const _options = { ...options, name: value };

    setOptions(_options);
    console.log(options);
  }

return (
  <div>
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">Charactername</InputGroup.Text>
      <FormControl
        placeholder=""
        aria-label="Charactername"
        aria-describedby="basic-addon1"
        onChange={(e)=>handleChange(e)}
      />
    </InputGroup>
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
  </div>
  )
}

export default SearchChar;