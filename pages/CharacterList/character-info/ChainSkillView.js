import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Link from "next/link";
import Image from "next/image";

// ### skill = json데이터 chainSkill = react state
const ChainSkillView = ({skill}) => {
  const [ chainSkill, setChainSkill ] = useState("lv1");
  console.log(skill);
  if(!skill){
    return null;
  }
  if(chainSkill == "lv1"){
    return(
      <Row className="chain-skill-veiw-row">
      <Col xs={12} lg={12}>
        체인 스킬: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={4} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <ButtonGroup>
            <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv1")} variant="info">{skill.lv1_tiles}</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv2")}>{skill.lv2_tiles}</Button>
            <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv3")}>{skill.lv3_tiles}</Button>
          </ButtonGroup>
      </ButtonToolbar>
      </Col>
      <div>
        {skill.lv1_text}
      </div>
      </Row>
    )
  }else if(chainSkill == "lv2"){
    return(
      <Row className="chain-skill-veiw-row">
        <Col lg={12}>
          체인 스킬: {skill.name}
        </Col>
        <Col lg={3}>
          <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
        </Col>
        <Col lg={4}>
          <ButtonToolbar className="active-skill-card-wrap">
            <ButtonGroup>
              <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv1")}>{skill.lv1_tiles}</Button>
              <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv2")} variant="info">{skill.lv2_tiles}</Button>
              <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv3")}>{skill.lv3_tiles}</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </Col>
        <div>
          {skill.lv2_text}
        </div>
      </Row>
    )
  }else if(chainSkill == "lv3"){
    return(
      <Row className="chain-skill-veiw-row">
        <Col lg={12}>
          체인 스킬: {skill.name}
        </Col>
        <Col lg={3}>
          <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
        </Col>
        <Col sm={4} lg={4}>
          <ButtonToolbar className="active-skill-card-wrap">
            <ButtonGroup>
              <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv1")}>{skill.lv1_tiles}</Button>
              <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv2")}>{skill.lv2_tiles}</Button>
              <Button className="chain-skill-veiw-button" onClick={() => setChainSkill("lv3")} variant="info">{skill.lv3_tiles}</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </Col>
        <div>
          {skill.lv3_text}
        </div>
      </Row>
    )
  }else{
    return null
  }
}

export default ChainSkillView;