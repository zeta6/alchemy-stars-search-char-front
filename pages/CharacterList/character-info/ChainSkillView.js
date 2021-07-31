import React, {useState} from 'react';
import {ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Image from "next/image";

// ### skill = json데이터 chainSkill = react state
const ChainSkillView = ({skill}) => {
  const [ chainSkill, setChainSkill ] = useState("lv1");

  const ChainButton = ({sklLv}) => {
    const key = sklLv+"_tiles"
    if(sklLv == chainSkill){
      return (
        <Button className="chain-skill-veiw-button" onClick={() => setChainSkill(sklLv)}
        variant="info">
          {skill[key]}
        </Button>
      )
    }else if(sklLv != chainSkill){
      return (
        <Button className="chain-skill-veiw-button" onClick={() => setChainSkill(sklLv)}>
          {skill[key]}
        </Button>
      )
    }else{
      return null
    }
  }

  const ChainButtonGroup = () => {
    if(skill.lv2_tiles == ""){
      return(
        <ChainButton sklLv={"lv1"}></ChainButton>
      )
    }else if(skill.lv3_tiles == ""){
      return(
        <ButtonGroup>
          <ChainButton sklLv={"lv1"}></ChainButton>
          <ChainButton sklLv={"lv2"}></ChainButton>
        </ButtonGroup>
      )
    }else{
      return(
      <ButtonGroup>
        <ChainButton sklLv={"lv1"}></ChainButton>
        <ChainButton sklLv={"lv2"}></ChainButton>
        <ChainButton sklLv={"lv3"}></ChainButton>
      </ButtonGroup>
      )
    }
  }

  const ChainText = () => {
    const key = chainSkill+"_text"
    return (
      <div>
        {skill[key]}
      </div>
    )
     
  }

  if(!skill){
    return null;
  }
  if(skill){
    return(
      <Row className="chain-skill-veiw-row">
      <Col xs={12} lg={12}>
        연쇄: {skill.name}
      </Col>
      <Col lg={3}>
      <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={4} lg={4}>
        <ButtonToolbar className="active-skill-card-wrap">
          <ChainButtonGroup></ChainButtonGroup>
        </ButtonToolbar>
      </Col>
      <ChainText></ChainText>
      </Row>
    )
  }
}

export default ChainSkillView;