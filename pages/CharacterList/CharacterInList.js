import React, { useState} from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import ChainSkillView from "./character-info/ChainSkillView";
import EquipSkillView from "./character-info/EquipSkillView";
import ActiveSkillView from "./character-info/ActiveSkillView";
import Image from "next/image";
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl'
import { read } from '@nodelib/fs.stat/out/providers/async';


const CharacterInList = ({cha, user, sortFav, setUser}) => {
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

  const FavBtn = () => {
    // let fav_char = user.fav_char;
    const SubmitAddFav = () => {
      // console.log("user.fav parsejson", JSON.parse(fav_char))
      const submitData = {
        email: user.email,
        access_token: user.access_token,
        fav_char : user.fav_char.concat(cha.id)
      }
      axios.post(BackendUrl+'/accounts/fav_char_update/',
        submitData)
        .then(res => setUser({...user, "fav_char" : res.data.fav_char}))
        .catch(err => console.log(err))
      }
    
    const SubmitRemoveFav = () => {
      const submitData = {
        email: user.email,
        access_token: user.access_token,
        fav_char : user.fav_char.filter(id => id !== cha.id)
      }
      axios.post(BackendUrl+'/accounts/fav_char_update/',
        submitData) 
        .then(res => setUser({...user, "fav_char" : res.data.fav_char}))
      }

    if(user.fav_char.indexOf(cha.id) !== -1){
      return(
        <Button onClick={() => SubmitRemoveFav()} size="sm" variant="dark">★</Button>
      )
    }else{
      return(
        <Button onClick={() => SubmitAddFav()} size="sm" variant="dark">☆</Button>
      )
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
          </Row>
          </td>
        </tr>
      )
    }
  } 
  if(!user){
    return "loading"
  }else if(user.email == ""){
    return (
      <tbody>
        <tr className="character-table-tbody-td-index" onClick={() => toggle()}>
          <td className="character-list-open-td">
            <Button size="sm"
              variant="dark"
            >
            {openButton}
            </Button>
          </td>
          <td className="character-table-td-index-icon"><Image unoptimized="true" width="100" height="100" alt="cha.icon" src={cha.icon}></Image></td>
          <td>{cha.name}</td>
          <td>☆{cha.rarity}</td>
          <td><Image unoptimized="true" width="40" height="40" alt="mattr_icon" src={cha.main_attribute.icon}></Image></td>
          <td><Image unoptimized="true" width="40" height="40" alt="sub_icon" src={cha.sub_attribute.icon}></Image></td>
          <td><Image unoptimized="true" width="40" height="40" alt="class_icon" src={cha.char_class.icon}></Image></td>
          <td><Image unoptimized="true" width="40" height="40" alt="faction_icon" src={cha.faction.icon}></Image></td>
          <td>
            <Link
              href={{
                pathname: '/CharacterList/[characterInfo]',
                query: { characterInfo: cha.id },
              }} passHref
            >
              <Button>View Aurorian Page</Button>
            </Link>
          </td>
        </tr>
        <Collapse open={open}></Collapse>
      </tbody>
    )
  }else{
    return(
      <tbody>
        <tr className="character-table-tbody-td-index" onClick={() => toggle()}>
        <th className="character-list-open-t" onClick={(e)=> e.stopPropagation()}><FavBtn></FavBtn></th>
          <td className="character-list-open-td">
            <Button size="sm"
              variant="dark"
            >
            {openButton}
            </Button>
          </td>
          <td className="character-table-td-index-icon"><Image unoptimized="true" width="100" height="100" alt="cha.icon" src={cha.icon}></Image></td>
          <td>{cha.name}</td>
          <td>☆{cha.rarity}</td>
          <td><Image unoptimized="true" width="40" height="40" alt="mattr_icon" src={cha.main_attribute.icon}></Image></td>
          <td><Image unoptimized="true" width="40" height="40" alt="sub_icon" src={cha.sub_attribute.icon}></Image></td>
          <td><Image unoptimized="true" width="40" height="40" alt="class_icon" src={cha.char_class.icon}></Image></td>
          <td><Image unoptimized="true" width="40" height="40" alt="faction_icon" src={cha.faction.icon}></Image></td>
          <td>
            <Link
              href={{
                pathname: '/CharacterList/[characterInfo]',
                query: { characterInfo: cha.id },
              }} passHref
            >
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