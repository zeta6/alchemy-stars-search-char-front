import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Link from "next/link";
import ChainSkillView from "./character-info/ChainSkillView";
import EquipSkillView from "./character-info/EquipSkillView";
import ActiveSkillView from "./character-Info/ActiveSkillView";
import Image from "next/image";


const CharacterInList = ({cha}) => {
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
  
  const Collapse = ({open}) => {
    if(!open){
      return null
    }else if(open){
      return(
        <tr>
          <td colSpan="9">
          <Row>
            <Col xs={4} lg={4}>
              <ChainSkillView skill={cha.chain_skill}>
              </ChainSkillView>
            </Col>
            <Col xs={4} lg={4}>
              <ActiveSkillView skill={cha.active_skill}></ActiveSkillView>
            </Col>
            <Col xs={4} lg={4}>
              <EquipSkillView skill={cha.equip_skill}>
              </EquipSkillView>
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
        <tr className="character-table-td-index" onClick={() => toggle()}>
        <td className="character-list-open-td">
        <Button size="sm"
          variant="dark"
        >
          {openButton}
        </Button>
        </td>
        <td className="character-table-td-index-icon"><Image width="100" height="100" alt="cha.icon" src={cha.icon}></Image></td>
        <td>{cha.name}</td>
        <td>☆{cha.rarity}</td>
        <td><Image width="40" height="40" alt="mattr_icon" src={cha.main_attribute_icon}></Image></td>
        <td><Image width="40" height="40" alt="sub_icon" src={cha.sub_attribute_icon}></Image></td>
        <td><Image width="40" height="40" alt="class_icon" src={cha.class_icon}></Image></td>
        <td><Image width="40" height="40" alt="faction_icon" src={cha.faction_icon}></Image></td>
        <td>
          <Link href={'/CharacterList/[characterInfo]/'} as={`/CharacterList/${cha.id}/`}>
            <Button>View Aurorian Page</Button>
          </Link>
        </td>
        </tr>
     <Collapse open={open}></Collapse>
      </tbody>
    )
  }
  };

export default CharacterInList;