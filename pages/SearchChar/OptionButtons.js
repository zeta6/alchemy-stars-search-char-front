import { ToggleButton, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import { attrOptions, classOptions, rarityOptions} from './ButtonOptions'


// id="toggle-check"
//           type="checkbox"
//           variant="secondary"
//           checked={checked}
//           value="1"
const MainAttrOptionButton = ({object, setOption}) => {
  const [checked, setChecked] = useState(false);
  return (
    <ToggleButton id="toggle-check" type="checkbox" variant="secondary" value={object.value} onClick={() => setOption(object.value, "main_attribute", {checked})}><img src={object.icon}></img></ToggleButton>
  )
}

const SubAttrOptionButton = ({object, setOption}) => {  
  const [checked, setChecked] = useState(true);
  return (
    <Button variant="secondary" value={object.value} onClick={() => setOption(object.value, "sub_attribute", {checked})}><img src={object.icon}></img></Button>
  )
}

const RarityOptionButton = ({object, setOption}) => {
  return (
    <Button variant="secondary" value={object.value} onClick={() => setOption(object.value, "rarity")}>{object.icon}</Button>
  )
}

const ClassOptionButton = ({object, setOption}) => {
  return (
    <Button variant="secondary" value={object.value} onClick={() => setOption(object.value, "class")}><img src={object.icon}></img></Button>
  )
}

const OptionButtons = ({options, setOption}) => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const [value, setValue] = useState([1, 3]);
  const handleChange = (val) => setValue(val);

  const radios = [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' },
  ];
  return(
    <div>
      <ButtonToolbar>
        <ButtonGroup className="mb-2">
          <MainAttrOptionButton object={attrOptions.fire} options={options} setOption={setOption}></MainAttrOptionButton>
          <MainAttrOptionButton object={attrOptions.water} options={options} setOption={setOption}></MainAttrOptionButton>
          <MainAttrOptionButton object={attrOptions.forest} options={options} setOption={setOption}></MainAttrOptionButton>
          <MainAttrOptionButton object={attrOptions.thunder} options={options} setOption={setOption}></MainAttrOptionButton>
        </ButtonGroup>
        <br></br>
        <ButtonGroup className="me-2">
          <SubAttrOptionButton object={attrOptions.fire} options={options} setOption={setOption}></SubAttrOptionButton>
          <SubAttrOptionButton object={attrOptions.water} options={options} setOption={setOption}></SubAttrOptionButton>
          <SubAttrOptionButton object={attrOptions.forest} options={options} setOption={setOption}></SubAttrOptionButton>
          <SubAttrOptionButton object={attrOptions.thunder} options={options} setOption={setOption}></SubAttrOptionButton>
        </ButtonGroup>
      </ButtonToolbar>
      <ButtonToolbar> 
        <ButtonGroup className="me-2">
          <ClassOptionButton object={classOptions.detonator} options={options} setOption={setOption}></ClassOptionButton>
          <ClassOptionButton object={classOptions.sniper} options={options} setOption={setOption}></ClassOptionButton>
          <ClassOptionButton object={classOptions.converter} options={options} setOption={setOption}></ClassOptionButton>
          <ClassOptionButton object={classOptions.support} options={options} setOption={setOption}></ClassOptionButton>
        </ButtonGroup>
        <ButtonGroup className="me-2">
          <RarityOptionButton object={rarityOptions.three} options={options} setOption={setOption}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.four} options={options} setOption={setOption}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.five} options={options} setOption={setOption}></RarityOptionButton>
          <RarityOptionButton object={rarityOptions.six} options={options} setOption={setOption}></RarityOptionButton>        
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  )
}

export default OptionButtons