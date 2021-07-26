
import { Button, ButtonToolbar, ButtonGroup, Row } from 'react-bootstrap';
import { useState } from 'react';
import { attrOptions, classOptions, rarityOptions} from '../../components/ButtonOptions'
import Image from 'next/image';

const OptionButton = ({object, options, setOptions, optionKey}) => {
  const [checked, setChecked] = useState(false);
  const [ buttonVariant, setButtonVariant ] = useState("secondary");

  const setOption = (value, optionKey, options) => {
    if(checked == false){
      let valueArray = options[optionKey]
      if(!(valueArray.includes(value))) {
        valueArray = options[optionKey].concat(value);
        const _options = { ...options, [optionKey]: valueArray };
        setOptions(_options);
        setChecked(true); 
        setButtonVariant("dark");
        return;
      }
    }
      if(checked == true){
        let valueArray = options[optionKey]
        valueArray = options[optionKey].filter(val => val !== value);
        const _options = { ...options, [optionKey]: valueArray };
        setOptions(_options);
        setChecked(false);
        setButtonVariant("secondary");
        return;
      }
  }
  return (
    <Button size="sm" variant={buttonVariant} value={object.value} onClick={() => setOption(object.value, optionKey, options)}>
    <div style={{width:30, height:30, position:'relative', paddingTop:'10%'}}>
    <Image layout='fill' src={object.icon} alt={object.value}>
    </Image>
    </div>
    </Button>
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
        setOptions(_options);
        setChecked(false);
        setButtonVariant("secondary");
        return;
      }
  }
  return (
    <Button size="sm" variant={buttonVariant} value={object.value}
     onClick={() => setOption(object.value, optionKey, options)}>
     <div style={{width:30, height:30, position:'relative', paddingTop:'10%'}}>{object.icon}</div>
     </Button>
  )
}


const OptionButtons = ({options, setOptions}) => {
  const [ isLoading, setLoading ] = useState(false);
  if(isLoading){
    return null
  }
  return(
    <div className="vertical-align-center">
    <div className="option-btn-wrapper">
    <Row className="vertical-align-center">
      <ButtonToolbar className="justify-content-md-center">
        <ButtonGroup className="me-2">
          <OptionButton object={attrOptions.fire} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
          <OptionButton object={attrOptions.water} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
          <OptionButton object={attrOptions.forest} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
          <OptionButton object={attrOptions.thunder} options={options} setOptions={setOptions} optionKey={"main_attribute"}></OptionButton>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <OptionButton object={attrOptions.fire} options={options} setOptions={setOptions} optionKey={"sub_attribute"}></OptionButton>
          <OptionButton object={attrOptions.water} options={options} setOptions={setOptions} optionKey={"sub_attribute"}> </OptionButton>
          <OptionButton object={attrOptions.forest} options={options} setOptions={setOptions} optionKey={"sub_attribute"}></OptionButton>
          <OptionButton object={attrOptions.thunder} options={options} setOptions={setOptions} optionKey={"sub_attribute"}></OptionButton>
        </ButtonGroup>
      </ButtonToolbar>
    </Row>
    <Row className="option-buttons-second-group">
      <ButtonToolbar className="justify-content-md-center">
        <ButtonGroup className="me-2">
          <OptionButton object={classOptions.burster} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
          <OptionButton object={classOptions.sniper} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
          <OptionButton object={classOptions.changer} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
          <OptionButton object={classOptions.supporter} options={options} setOptions={setOptions} optionKey={"class"}></OptionButton>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <RarityOptionButton object={rarityOptions.three} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.four} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.five} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.six} options={options} setOptions={setOptions} optionKey={"rarity"}></RarityOptionButton>        
        </ButtonGroup>
      </ButtonToolbar>
    </Row>
    </div>
    </div>
  )
}

export default OptionButtons