import React, {useEffect, useState} from 'react';
import { Table, Accordion, Button} from 'react-bootstrap';

const CharacterInList = ({cha}) => {
  const [open, setOpen] = useState(false);
  const Collapse = ({open}) => {
    if(!open){
      return null
    }else if(open){
      return(
        <tr>
          <td colSpan="7">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
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
          onClick={() => setOpen(!open)}
          // aria-controls="example-collapse-text"
          // aria-expanded={open}
        >
          click
        </Button>
        </td>
        <td>444</td>
        <td>{cha.name}</td>
        <td>{cha.rarity}</td>
        <td>{cha.main_attribute}</td>
        <td>{cha.sub_attribute}</td>
        <td>{cha.class}</td>
        </tr>
     <Collapse open={open}></Collapse>
      </tbody>
    )
  };

export default CharacterInList;