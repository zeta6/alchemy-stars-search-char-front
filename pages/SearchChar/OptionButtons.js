
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useState, useRef } from 'react';
import { attrOptions, classOptions, rarityOptions} from './ButtonOptions'

const OptionButton = ({object, options, setOptions, optionKey}) => {
  const [checked, setChecked] = useState(false);
  const [ buttonVariant, setButtonVariant ] = useState("secondary");

  const setOption = (value, optionKey, options) => {
    if(checked == false){
      let valueArray = options[optionKey]
      if(!(valueArray.includes(value))) {
        valueArray = options[optionKey].concat(value);
        const _options = { ...options, [optionKey]: valueArray };
        console.log(valueArray);
        setOptions(_options);
        setChecked(true); 
        setButtonVariant('dark');
        return;
      }
    }
      if(checked == true){
        let valueArray = options[optionKey]
        valueArray = options[optionKey].filter(val => val !== value);
        const _options = { ...options, [optionKey]: valueArray };
        console.log(valueArray);
        setOptions(_options);
        setChecked(false);
        setButtonVariant("secondary");
        return;
      }
  }
  return (
    <Button type="checkbox" variant={buttonVariant} value={object.value} onClick={() => setOption(object.value, optionKey, options)}><img src={object.icon}></img></Button>
  )
}

const RarityOptionButton = ({object, options, setOptions, optionKey}) => {
  const [checked, setChecked] = useState(false);
  const [ buttonVariant, setButtonVariant ] = useState("secondary");

  const setOption = (value, optionKey, options) => {
    if(checked == false){
      let valueArray = options[optionKey]
      if(!(valueArray.includes(value))) {
        valueArray = options[optionKey].concat(value);
        const _options = { ...options, [optionKey]: valueArray };
        console.log(valueArray);
        setOptions(_options);
        setChecked(true); 
        setButtonVariant('dark');
        return;
      }
    }
      if(checked == true){
        let valueArray = options[optionKey]
        valueArray = options[optionKey].filter(val => val !== value);
        const _options = { ...options, [optionKey]: valueArray };
        console.log(valueArray);
        setOptions(_options);
        setChecked(false);
        setButtonVariant("secondary");
        return;
      }
  }
  return (
    <Button type="checkbox" variant={buttonVariant} value={object.value} onClick={() => setOption(object.value, optionKey, options)}>{object.icon}</Button>
  )
}


const OptionButtons = ({options, setOptions, setOption}) => {
  return(
    <div>
      <ButtonToolbar>
        <ButtonGroup className="mb-2">
          <OptionButton object={attrOptions.fire} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
          <OptionButton object={attrOptions.water} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
          <OptionButton object={attrOptions.forest} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
          <OptionButton object={attrOptions.thunder} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
        </ButtonGroup>
        <ButtonGroup className="mb-2">
          <OptionButton object={attrOptions.fire} options={options} setOptions={setOptions} optionKey={"sub_attribute"}></OptionButton>
          <OptionButton object={attrOptions.water} options={options} setOptions={setOptions} optionKey={"sub_attribute"}> </OptionButton>
          <OptionButton object={attrOptions.forest} options={options} setOptions={setOptions} optionKey={"sub_attribute"}></OptionButton>
          <OptionButton object={attrOptions.thunder} options={options} setOptions={setOptions} optionKey={"sub_attribute"}></OptionButton>
        </ButtonGroup>
      </ButtonToolbar>
      <ButtonToolbar> 
        <ButtonGroup className="mb-2">
          <OptionButton object={classOptions.detonator} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
          <OptionButton object={classOptions.sniper} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
          <OptionButton object={classOptions.converter} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
          <OptionButton object={classOptions.support} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
        </ButtonGroup>
        <ButtonGroup className="mb-2">
          <RarityOptionButton object={rarityOptions.three} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.four} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.five} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.six} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>        
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  )
}

export default OptionButtons