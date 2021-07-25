import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Link from "next/link";
import Image from "next/image";

// ### skill = json데이터 chainSkill = react state
const EquipSkillView = ({skill}) => {
  const [ equipSkill, setEquipSkill ] = useState("lv1");
  if(!skill){
    return null;
  }else if(equipSkill == "lv1"){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        장비 스킬: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={3} sm={3} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <ButtonGroup>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv1")} variant="info">lv1</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv3")}>lv3</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv6")}>lv6</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv10")}>lv10</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Col>
      <div>
        {skill.lv1_text}
      </div>
      </Row>
    )
  }else if(equipSkill == "lv3"){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        장비 스킬: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={3} sm={3} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <ButtonGroup>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv1")}>lv1</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv3")} variant="info">lv3</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv6")}>lv6</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv10")}>lv10</Button>
          </ButtonGroup>
      </ButtonToolbar>
      </Col>
      <div>
        {skill.lv3_text}
      </div>
      </Row>
    )
  }else if(equipSkill == "lv6"){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        장비 스킬: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={3} sm={3} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <ButtonGroup>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv1")}>lv1</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv3")}>lv3</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv6")} variant="info">lv6</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv10")}>lv10</Button>
          </ButtonGroup>
      </ButtonToolbar>
      </Col>
      <div>
        {skill.lv6_text}
      </div>
      </Row>
    )
  }else if(equipSkill == "lv10"){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        장비 스킬: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={3} sm={3} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <ButtonGroup>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv1")}>lv1</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv3")}>lv3</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv6")}>lv6</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setEquipSkill("lv10")} variant="info">lv10</Button>
          </ButtonGroup>
      </ButtonToolbar>
      </Col>
      <div>
        {skill.lv10_text}
      </div>
      </Row>
    )
  }
}

export default EquipSkillView