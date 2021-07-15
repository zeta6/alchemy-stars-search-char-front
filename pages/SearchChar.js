import { object } from 'prop-types';
import React from 'react';
import OptionButtons from './SearchChar/OptionButtons';
import { InputGroup, FormControl } from 'react-bootstrap';

const SearchChar = () => {
  const [ options, setOptions] = React.useState(
    {
      name: "migard",
      rarity: "6",
      main_attribute: "main attr",
      sub_attribute: "sub attr",
      class: "",
    }
  )
  // React.useEffect(() => options, []);
  const [ character, setCharacter ] = React.useState(
    {
      main_attributes:{
        main: "",
        sub: "",
      },
      states: {
        atk: "",
        hp: "",
        def: "",
      },
      acive_skll:{ 
      },
      chain_combo:{
      },
      equipment_skill:{
      },
    }
  )

  console.log(options);

  const setOption = (value, option, checked, _options=options) => {
    // const optionValue = value;
    console.log(checked);
    const options = { ..._options, [option]: value };
    // _options[option] = value;
    setOptions(options);
    console.log(options);
  }

  const handleChange = (e) => {
    let value = e.target.value;

    const _options = { ...options, name: value };

    setOptions(_options);
  };
  

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

return(
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
    <OptionButtons options={options} setOption={setOption}></OptionButtons>
    <div>
      <span>{options.main_attribute}</span>
      <br></br>
      <span>{options.sub_attribute}</span>
    </div>
    <br/>
    <div>
    {RenderKeyValue(options)}
    </div>
  </div>
  )
}

export default SearchChar