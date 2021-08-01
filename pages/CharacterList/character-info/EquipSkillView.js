import React, { useState } from 'react';
import {ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Image from "next/image";

// ### skill = json데이터 chainSkill = react state
const EquipSkillView = ({skill}) => {
  const [ equipSkill, setEquipSkill ] = useState("lv1");

  const EquipSkillButton = ({sklLv}) => {
    if(sklLv == equipSkill){
      return (
        <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill(sklLv)}
        variant="info">
          {sklLv}
        </Button>
      )
    }else if(sklLv != equipSkill){
      return (
        <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill(sklLv)}>
          {sklLv}
        </Button>
      )
    }else{
      return null
    }
  }

  const EquipSkillButtonGroup = () => {
    return(
      <ButtonGroup>
        <EquipSkillButton sklLv={"lv1"}></EquipSkillButton>
        <EquipSkillButton sklLv={"lv3"}></EquipSkillButton>
        <EquipSkillButton sklLv={"lv6"}></EquipSkillButton>
        <EquipSkillButton sklLv={"lv10"}></EquipSkillButton>
      </ButtonGroup>
    )
  }

  const EquipText = () => {
    const key = equipSkill+"_text";
    return (
      <div>
        {skill[key]}
      </div>
    )     
  }

  if(!skill){
    return null;
  }else{
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        장비: {skill.name}
      </Col>
      <Col lg={3}>
      <Image unoptimized="true" width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={3} sm={3} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <EquipSkillButtonGroup></EquipSkillButtonGroup>
        </ButtonToolbar>
      </Col>
      <EquipText></EquipText>
      </Row>
    )
  }
}
export default EquipSkillView;