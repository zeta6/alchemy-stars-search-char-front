import React, {useEffect, useState} from 'react';
import { Table, Accordion, Button} from 'react-bootstrap';
import Link from "next/link";


const CharacterInList = ({cha}) => {
  const [open, setOpen] = useState(false);
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
    return (
        <tbody>
        <tr>
        <td>
        <Button
          variant="dark"
          onClick={() => setOpen(!open)}
        >
          ▽
        </Button>
        </td>
        <td>{cha.name}</td>
        <td>{cha.rarity}</td>
        <td>{cha.main_attribute}</td>
        <td>{cha.sub_attribute}</td>
        <td>{cha.class}</td>
        <td>
          <Link href={'/CharacterList/[characterInfo]/'} as={`/CharacterList/${cha.id}/`}>
          detail
          </Link>
        </td>
        </tr>
     <Collapse open={open}></Collapse>
      </tbody>
    )
  };

export default CharacterInList;