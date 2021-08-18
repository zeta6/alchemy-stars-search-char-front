import React, {useEffect, useState} from 'react';
import { Button, Row, Container, Col } from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl'
import AurorianInfo from "./AurorianInfo";
import AurorianList from './AurorianList';

const MyAurorianList = ({options, user, setUser}) => {
  const [characterList, setCharacterList] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [filterByFav, setFilterByFav] = useState(false);
  const [selectedAurorian, setSelectedAurorian] = useState(null);
  const [ownEditing, setOwnEditing] = useState(false);
  const [ownFiltering, setOwnFiltering] = useState(false);

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
      setLoading(false);
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



  const TopBtnGroup = () => {
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

    if(!user || user.email==""){
      return null
    }else{
      return(
        <Row className="myarorian-btn-row">
          <OwnFilteringBtn></OwnFilteringBtn>
          <OwnEditingBtn></OwnEditingBtn>
        </Row>
      )
    }
  }

  if (loading) {
    return (
      <div className="loading-div">loading</div>
    )
  }else{
    return(
      <Container>
        <Row>
        <TopBtnGroup></TopBtnGroup>
        {/* <Button>팀 편집</Button> */}
        </Row>
        <Row>
          <AurorianList characterList={characterList} user={user} ownEditing={ownEditing} setSelectedAurorian={setSelectedAurorian} setUser={setUser}></AurorianList>
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
  }
}

export default MyAurorianList;

