import React, {useEffect, useState} from 'react';
import { Table, ButtonGroup, Button, Row, ButtonToolbar, DropdownButton, Dropdown, Container, Col} from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl'
import Image from "next/image";
import AurorianInfo from "./AurorianInfo"

;

const MyAurorianList = ({options, user, setUser}) => {
  const [characterList, setCharacterList] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [filterByFav, setFilterByFav] = useState(false);
  const [selectedAurorian, setSelectedAurorian] = useState(null);
  const [ownEditing, setOwnEditing] = useState(false);
  const [ownFiltering, setOwnFiltering] = useState(false);

// useEffect start
  useEffect(() => {
    const setData = (data) => {
      setLoading(false);
    }
    axios.get(BackendUrl+"/api/characters/")
      .then(response => setData(response.data)) 
      .catch(error => console.log(error));
},[]
  );

  useEffect(() => { 
    // filter start
    const characterFilter = (character) => {
      if(character.name.indexOf(options.name) !== -1 || options.name.length == 0){
        if(options.rarity.includes(character.rarity) || options.rarity.length == 0){
          if(options.main_attribute.includes(character.main_attribute.name) || options.main_attribute.length == 0){
            if(options.sub_attribute.includes(character.sub_attribute.name) || options.sub_attribute.length == 0){
              if(options.class.includes(character.char_class.name) || options.class.length == 0){
                return character;
              }
            }
          }
        }
      }
    }

    const specialRoleFilter = (characterList) => {
      let _characterList = characterList;
      const teleportFilter = (character) => {
        if(character.special_role.teleport == true){
          return character;
        }
      }
      const healFilter = (character) => {
        if(character.special_role.heal == true){
          return character;
        }
      }
      const tileChangeFilter = (character) => {
        if(character.special_role.tile_change == true){
          return character;
        }
      }
      const tileResetFilter = (character) => {
        if(character.special_role.tile_reset == true){
          return character;
        }
      }
      if(options.special_role.includes('teleport')){
        _characterList = _characterList.filter(teleportFilter);
      }      
      if(options.special_role.includes('heal')){
        _characterList = _characterList.filter(healFilter);  
      }
      if(options.special_role.includes('tile_change')){
        _characterList = _characterList.filter(tileChangeFilter);
      }
      if(options.special_role.includes('tile_reset')){
        _characterList = _characterList.filter(tileResetFilter);
      }
      return _characterList
    }

    const ownFilter = (character) => {
      if(user.owned_char.includes(character.id)){
        return character
      }
    }    

    const mixFilter = (list) => {
      if (options.special_role.length == 0){
        if(ownFiltering){
          return list.filter(characterFilter).filter(ownFilter)
        }else{
          return list.filter(characterFilter)
        }
      }else{
        if(ownFiltering){
          return specialRoleFilter(list).filter(characterFilter).filter(ownFilter)
        }else{
          return specialRoleFilter(list).filter(characterFilter)
        }
      }
    }

    // filter end
    
    const setData = (data) => {
      setCharacterList(mixFilter(data));
    }

    axios.get(BackendUrl+"/api/characters/")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
    },[options, filterByFav, ownFiltering]
  );

  // useEffect end


  //sort start
  const getSortOrderProp = (prop, inprop) => {
    return function(a, b) {    
      if (a[prop][inprop] > b[prop][inprop]) {    
          return 1;    
      } else if (a[prop][inprop] < b[prop][inprop]) {    
          return -1;    
      }    
      return 0;    
    }
  }

  // const getSortOrderPropReverse = (prop, inprop) => {
  //   return function(a, b) {    
  //     if (a[prop][inprop] < b[prop][inprop]) {    
  //         return 1;    
  //     } else if (a[prop][inprop] > b[prop][inprop]) {    
  //         return -1;    
  //     }    
  //     return 0;    
  //   }
  // }

  //sort end


  // const setSelect = () =>{
  //   setSelectedAurorian(s_aurorian)
  // }


  const rarity_6_Filter = (aurorian) => {
    if(aurorian.rarity == 6){
      return aurorian
    }}

  const rarity_5_Filter = (aurorian) => {
    if(aurorian.rarity == 5){
      return aurorian
    }}

  const rarity_4_Filter = (aurorian) => {
    if(aurorian.rarity == 4){
      return aurorian
    }}

  const rarity_3_Filter = (aurorian) => {
    if(aurorian.rarity == 3){
      return aurorian
    }}
      

  const AurorianList = () => {
    
    const rarity_6_Array = characterList.filter(rarity_6_Filter).sort(getSortOrderProp("main_attribute", "name"))
    const rarity_5_Array = characterList.filter(rarity_5_Filter).sort(getSortOrderProp("main_attribute", "name"))
    const rarity_4_Array = characterList.filter(rarity_4_Filter).sort(getSortOrderProp("main_attribute", "name"))
    const rarity_3_Array = characterList.filter(rarity_3_Filter).sort(getSortOrderProp("main_attribute", "name"))

    const MyAurorianIcon = ({aurorian}) => {
      const SubmitAddOwned = () => {
        const submitData = {
          email: user.email,
          access_token: user.access_token,
          owned_char : user.owned_char.concat(aurorian.id)
        }
        axios.post(BackendUrl+'/accounts/owned_char_update/',
          submitData)
          .then(res => setUser({...user, "owned_char" : res.data.owned_char}))
          .catch(err => console.log(err))
        }
      
      const SubmitRemoveOwned = () => {
        const submitData = {
          email: user.email,
          access_token: user.access_token,
          owned_char : user.owned_char.filter(id => id !== aurorian.id)
        }
        axios.post(BackendUrl+'/accounts/owned_char_update/',
          submitData) 
          .then(res => setUser({...user, "owned_char" : res.data.owned_char}))
        }
      if(!aurorian){
        return null
      }else if(user.owned_char.includes(aurorian.id)){
        if(ownEditing){
          return(
            <Image onClick={()=>SubmitRemoveOwned()} width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
          )
        }else{
          return(
            <Image onClick={()=>setSelectedAurorian(aurorian)} width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
          )
        }
      }else{
        if(ownEditing){
          return(
            <span className="myaurorian-icon-opacity">
              <Image onClick={()=>SubmitAddOwned()} width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
            </span>
          )
        }else{
          return(
            <span className="myaurorian-icon-opacity">
              <Image onClick={()=>setSelectedAurorian(aurorian)} width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
            </span>
          )
        }
      }
    }

    return(
      <Col xs={7} lg={6} className="myaurorian-list-col">
        <div className="font-white">

          {/* <Button onClick={()=>console.log(user)}>user?</Button>
          <Button onClick={()=>console.log(s_aurorian)}>s_aurorian</Button>
          <Button onClick={()=>console.log(selectedAurorian)}>sel_aurorian</Button>
          <Button onClick={()=>console.log(characterList)}>characterList</Button>
          <Button onClick={()=>console.log(characterList.filter(rarity_6_Filter)[0]['icon'])}>chListFilter</Button> */}
          {/* <Image width="60" height="60" unoptimized="true" src={characterList.filter(rarity_6_Filter)[0]['icon']}></Image> */}
          <span className="font-white">6☆</span> <br></br>
          {rarity_6_Array.map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
          <span className="font-white">5☆</span> <br></br>
            {rarity_5_Array.map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
          <span className="font-white">4☆</span> <br></br>
            {rarity_4_Array.map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
          <span className="font-white">3☆</span> <br></br>
            {rarity_3_Array.map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
        </div>
      </Col>
    )
  }

  const OwnFilteringBtn = () => {
    if(!ownFiltering){
      return(
        <Button className="myaurorian-top-btn" onClick={()=>setOwnFiltering(!ownFiltering)}>보유 오로리안 보기</Button>
      )
    }else{
      return(
        <Button className="myaurorian-top-btn" onClick={()=>setOwnFiltering(!ownFiltering)}>전체 오로리안 보기</Button>
      )
    }
  }


  const OwnEditingBtn = () => {
    if(!ownEditing){
      return(
        <Button className="myaurorian-top-btn" onClick={()=>setOwnEditing(!ownEditing)}>보유 오로리안 편집</Button>
      )
    }else{
      return(
        <Button className="myaurorian-top-btn" onClick={()=>setOwnEditing(!ownEditing)}>보유 오로리안 편집 중</Button>
      )
    }
  }
  // if (loading) {
  //   return "loading"
  // }else{
    // if(!characterList[0]){
    //   return null
    // }else{
    return(
      <Container>
        <Row>
        <OwnFilteringBtn></OwnFilteringBtn>
        <OwnEditingBtn></OwnEditingBtn>
        {/* <Button>팀 편집</Button> */}
        </Row>
        <Row>
          <AurorianList></AurorianList>
          <Col xs={5} lg={6}  className="myaurorian-list-col">
            {/* <span className="font-white">팀 1 /</span>
            <span className="font-white">팀 2 /</span> 
            <span className="font-white">팀 3 /</span> 
            <span className="font-white">팀 4 /</span>
            <div className="font-white">
              1번 2번 3번 4번 5번
            </div> */}
            <AurorianInfo aurorian={selectedAurorian}></AurorianInfo>
          </Col>
        </Row>  
      </Container>
    )
  // }
}

export default MyAurorianList;

