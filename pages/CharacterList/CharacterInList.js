import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
import Link from "next/link";
import ChainSkillView from "./character-info/ChainSkillView";
import EquipSkillView from "./character-info/EquipSkillView";
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
          <Row className="character-list-collapse">
            <Col lg={4}>
              <ChainSkillView skill={cha.chain_skill}>
              </ChainSkillView>
            </Col>
            <Col>액티브스킬 {cha.active_skill.name} <br></br>
            {cha.active_skill.text}
            </Col>
            <Col lg={4}>
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
        <tr onClick={() => toggle()}>
        <td style={{width:'3%'}}>
        <Button
          variant="dark"
        >
          {openButton}
        </Button>
        </td>
        <td className="character-table-td-index"><Image width="90" height="90" alt="cha.icon" src={cha.icon}></Image></td>
        <td className="character-table-td-index">{cha.name}</td>
        <td className="character-table-td-index">☆{cha.rarity}</td>
        <td className="character-table-td-index"><Image width="40" height="40" alt="mattr_icon" src={cha.main_attribute_icon}></Image></td>
        <td className="character-table-td-index"><Image width="40" height="40" alt="sub_icon" src={cha.sub_attribute_icon}></Image></td>
        <td className="character-table-td-index"><Image width="40" height="40" alt="class_icon" src={cha.class_icon}></Image></td>
        <td className="character-table-td-index"><Image width="40" height="40" alt="faction_icon" src={cha.faction_icon}></Image></td>
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