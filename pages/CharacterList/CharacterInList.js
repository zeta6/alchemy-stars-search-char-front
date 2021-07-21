import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Link from "next/link";

const CharacterInList = ({cha}) => {
  const [ chainSkill, setChainSkill ] = useState("first")
  const [ open, setOpen] = useState(false);
  const [ openButton, setOpenButton ] = useState("▼")

  const toggle = () => {
    setOpen(!open)
    if (openButton == "▼"){
    setOpenButton("▲")
    }else{
      setOpenButton("▼")
    }
  }
 
  const ChainSkillView = ({chainSkill, skill, setChainSkill}) => {
    if(chainSkill == "first"){
      return(
        <Col>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={() => setChainSkill("first")} variant="info">{skill.first.tiles}</Button>
              <Button onClick={() => setChainSkill("second")}>{skill.second.tiles}</Button>
              <Button onClick={() => setChainSkill("third")}>{skill.third.tiles}</Button>
            </ButtonGroup>
        </ButtonToolbar>
        <div>
          {skill.first.text}
        </div>
        </Col>
      )
    }else if(chainSkill == "second"){
      return(
        <Col>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={() => setChainSkill("first")}>{skill.first.tiles}</Button>
              <Button onClick={() => setChainSkill("second")}  variant="info">{skill.second.tiles}</Button>
              <Button onClick={() => setChainSkill("third")}>{skill.third.tiles}</Button>
            </ButtonGroup>
        </ButtonToolbar>
        <div>
          {skill.second.text}
        </div>
        </Col>
      )
    }else if(chainSkill == "third"){
      return(
        <Col>
          <ButtonToolbar>
            <ButtonGroup>
              <Button onClick={() => setChainSkill("first")}>{skill.first.tiles}</Button>
              <Button onClick={() => setChainSkill("second")}>{skill.second.tiles}</Button>
              <Button onClick={() => setChainSkill("third")} variant="info">{skill.third.tiles}</Button>
            </ButtonGroup>
        </ButtonToolbar>
        <div>
          {skill.second.text}
        </div>
        </Col>
      )
    }else{
      return null
    }
  }
  
  
  const Collapse = ({open}) => {
    if(!open){
      return null
    }else if(open){
      return(
        <tr>
          <td colSpan="9">
          <Row className="character-list-collapse">
            <ChainSkillView skill={cha.chain_skill} chainSkill={chainSkill} setChainSkill={setChainSkill}>
            </ChainSkillView>
            <Col>액티브스킬 {cha.active_skill.name} <br></br>
            {cha.active_skill.text}
            </Col>
            <Col>장비스킬 {cha.equip_skill.name} <br></br>
            1렙:{cha.equip_skill.lv1_text} <br></br>
            10렙:{cha.equip_skill.lv10_text}
            </Col>

            {/* {cha.chain_skill.name} <br></br>
            {cha.chain_skill.first.tiles} <br></br>
            {cha.chain_skill.first.damage} <br></br>
            {cha.chain_skill.first.area} <br></br>
            {cha.chain_skill.first.area_type} <br></br>
            {cha.chain_skill.first.text} <br></br> */}
          </Row>
          </td>
        </tr>
      )
    }
  } 
  if(!cha){
    return "loading"
  }else{
    return (
        <tbody>
        <tr onClick={() => toggle()}>
        <td style={{width:'3%'}}>
        <Button
          variant="dark"
        >
          {openButton}
        </Button>
        </td>
        <td className="character-table-td-index">{cha.icon}</td>
        <td className="character-table-td-index">{cha.name}</td>
        <td className="character-table-td-index">{cha.rarity}</td>
        <td className="character-table-td-index">{cha.main_attribute}</td>
        <td className="character-table-td-index">{cha.sub_attribute}</td>
        <td className="character-table-td-index">{cha.class}</td>
        <td className="character-table-td-index">{cha.faction}</td>
        <td >
          <Link href={'/CharacterList/[characterInfo]/'} as={`/CharacterList/${cha.id}/`}>
            <Button>view character infomation</Button>
          </Link>
        </td>
        </tr>
     <Collapse open={open}></Collapse>
      </tbody>
    )
  }
  };

export default CharacterInList;