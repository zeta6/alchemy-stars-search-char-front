import React, {useEffect, useState} from 'react';
import { Table, Accordion, Button} from 'react-bootstrap';
import Link from "next/link";

const CharacterInList = ({cha}) => {
  const [ open, setOpen] = useState(false);
  const [ openButton, setOpenButton ] = useState("▼")

  const toggleButton = () => {
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
          <td colSpan="7">
            {cha.chain_skill.name} <br></br>
            {cha.chain_skill.first.tiles} <br></br>
            {cha.chain_skill.first.damage} <br></br>
            {cha.chain_skill.first.area} <br></br>
            {cha.chain_skill.first.area_type} <br></br>
            {cha.chain_skill.first.text} <br></br>
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
        <tr>
        <td style={{width:'3%'}}>
        <Button
          variant="dark"
          onClick={() => toggleButton()}
        >
          {openButton}
        </Button>
        </td>
        <td className="character-table-td-index">{cha.name}</td>
        <td className="character-table-td-index">{cha.rarity}</td>
        <td className="character-table-td-index">{cha.main_attribute}</td>
        <td className="character-table-td-index">{cha.sub_attribute}</td>
        <td className="character-table-td-index">{cha.class}</td>
        <td >
          <Link href={'/CharacterList/[characterInfo]/'} as={`/CharacterList/${cha.id}/`}>
          detail
          </Link>
        </td>
        </tr>
     <Collapse open={open}></Collapse>
      </tbody>
    )
  }
  };

export default CharacterInList;