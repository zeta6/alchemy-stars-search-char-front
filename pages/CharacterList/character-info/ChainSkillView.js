import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Link from "next/link";
import Image from "next/image";

// ### skill = json데이터 chainSkill = react state
const ChainSkillView = ({skill}) => {
  const [ chainSkill, setChainSkill ] = useState("first");
  console.log(skill);
  if(chainSkill == "first"){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        체인 스킬: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col lg={4}>
        <ButtonToolbar>
          <ButtonGroup size="lg" className="chain-skill-veiw-button">
            <Button onClick={() => setChainSkill("first")} variant="info">{skill.first.tiles}</Button>
            <Button onClick={() => setChainSkill("second")}>{skill.second.tiles}</Button>
            <Button onClick={() => setChainSkill("third")}>{skill.third.tiles}</Button>
          </ButtonGroup>
      </ButtonToolbar>
      </Col>
      <div>
        {skill.first.text}
      </div>
      </Row>
    )
  }else if(chainSkill == "second"){
    return(
      <Row className="chain-skill-veiw-row">
        <Col lg={12}>
          체인 스킬: {skill.name}
        </Col>
        <Col lg={3}>
          <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
        </Col>
        <Col lg={4}>
          <ButtonToolbar>
            <ButtonGroup size="lg" className="chain-skill-veiw-button">
              <Button onClick={() => setChainSkill("first")}>{skill.first.tiles}</Button>
              <Button onClick={() => setChainSkill("second")} variant="info">{skill.second.tiles}</Button>
              <Button onClick={() => setChainSkill("third")}>{skill.third.tiles}</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </Col>
        <div>
          {skill.second.text}
        </div>
      </Row>
    )
  }else if(chainSkill == "third"){
    return(
      <Row className="chain-skill-veiw-row">
        <Col lg={12}>
          체인 스킬: {skill.name}
        </Col>
        <Col lg={3}>
          <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
        </Col>
        <Col lg={4}>
          <ButtonToolbar>
            <ButtonGroup size="lg" className="chain-skill-veiw-button">
              <Button onClick={() => setChainSkill("first")}>{skill.first.tiles}</Button>
              <Button onClick={() => setChainSkill("second")}>{skill.second.tiles}</Button>
              <Button onClick={() => setChainSkill("third")} variant="info">{skill.third.tiles}</Button>
          </ButtonGroup>
        </ButtonToolbar>
        </Col>
        <div>
          {skill.third.text}
        </div>
      </Row>
    )
  }else{
    return null
  }
}

export default ChainSkillView;