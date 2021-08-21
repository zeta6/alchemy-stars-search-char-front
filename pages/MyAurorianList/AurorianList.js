import React, { useState, useEffect } from 'react';
import { Col, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl';
import Image from "next/image";
import AurorianTblModal from './AurorianTblModal';

const AurorianList = ({characterList, user, ownEditing, setSelectedAurorian, setUser}) => {
  const [ rarity_6_Array , setRarity_6_Array ] = useState([]);
  const [ rarity_5_Array , setRarity_5_Array ] = useState([]);
  const [ rarity_4_Array , setRarity_4_Array ] = useState([]);
  const [ rarity_3_Array , setRarity_3_Array ] = useState([]);
  const [ tblModalOpen, setTblModalOpen ] = useState(true);

  useEffect(() => {
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
    const getRarity_6_Array = (List) => { return List.filter(rarity_6_Filter).sort(getSortOrderProp("main_attribute", "name")) }
    const getRarity_5_Array = (List) => { return List.filter(rarity_5_Filter).sort(getSortOrderProp("main_attribute", "name")) }
    const getRarity_4_Array = (List) => { return List.filter(rarity_4_Filter).sort(getSortOrderProp("main_attribute", "name")) }
    const getRarity_3_Array = (List) => { return List.filter(rarity_3_Filter).sort(getSortOrderProp("main_attribute", "name")) }

    setRarity_6_Array(getRarity_6_Array(characterList));
    setRarity_5_Array(getRarity_5_Array(characterList));
    setRarity_4_Array(getRarity_4_Array(characterList));
    setRarity_3_Array(getRarity_3_Array(characterList));
  },[characterList])

  // MyAurorianIcon component start
  const MyAurorianIcon = ({aurorian, user, setUser}) => {
    const SubmitAddOwned = () => {
      const token_id = window.sessionStorage.getItem('token_id')
      const submitData = {
        owned_char : user.owned_char.concat(aurorian.id)
      }
      axios.post(BackendUrl+'/accounts/owned_char_update/', submitData, {
        headers: {
          'Authorization': token_id}
        })
        .then(res => setUser({...user, "owned_char" : res.data.owned_char}))
        .catch(err => console.log(err))
      }

    const SubmitRemoveOwned = () => {
      const token_id = window.sessionStorage.getItem('token_id')
      const submitData = {
        owned_char : user.owned_char.filter(id => id !== aurorian.id)
      }
      axios.post(BackendUrl+'/accounts/owned_char_update/', submitData, {
        headers: {
          'Authorization': token_id}
        })
        .then(res => setUser({...user, "owned_char" : res.data.owned_char}))
    }
    if(user.owned_char.includes(aurorian.id)){
      if(ownEditing){
        return(
          <Image onClick={()=>SubmitRemoveOwned()} width="80" height="80" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
        )
      }else{
        return(
          <Image onClick={()=>setSelectedAurorian(aurorian)} width="80" height="80" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
        )
      }
    }else{
      if(ownEditing){
        return(
          <span className="myaurorian-icon-opacity">
            <Image onClick={()=>SubmitAddOwned()} width="80" height="80" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
          </span>
        )
      }else{
        return(
          <span className="myaurorian-icon-opacity">
            <Image onClick={()=>setSelectedAurorian(aurorian)} width="80" height="80" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
          </span>
        )
      }
    }    
  }

  // MyAurorianIcon component end  
  return(
    <Col xs={7} lg={6} className="myaurorian-list-col">
      <AurorianTblModal tblModalOpen={tblModalOpen} setTblModalOpen={setTblModalOpen} rarity_6_Array={rarity_6_Array} rarity_5_Array={rarity_5_Array} user={user}></AurorianTblModal>
      <div className="font-white">
      {/* <Button onClick={()=>console.log(user)}>user?</Button>
      <Button onClick={()=>console.log(s_aurorian)}>s_aurorian</Button>
      <Button onClick={()=>console.log(selectedAurorian)}>sel_aurorian</Button>
      <Button onClick={()=>console.log(characterList)}>characterList</Button>
      <Button onClick={()=>console.log(characterList.filter(rarity_6_Filter)[0]['icon'])}>chListFilter</Button> */}
      {/* <Image width="60" height="60" unoptimized="true" src={characterList.filter(rarity_6_Filter)[0]['icon']}></Image> */}
      <span className="font-white">6☆</span> <br></br>
      {rarity_6_Array.map(aurorian =>
          <MyAurorianIcon key={aurorian.id} aurorian={aurorian} user={user} setUser={setUser}></MyAurorianIcon>
      )} <br></br>
      <span className="font-white">5☆</span> <br></br>
          {rarity_5_Array.map(aurorian =>
          <MyAurorianIcon key={aurorian.id} aurorian={aurorian} user={user} setUser={setUser}></MyAurorianIcon>
      )} <br></br>
      <span className="font-white">4☆</span> <br></br>
          {rarity_4_Array.map(aurorian =>
          <MyAurorianIcon key={aurorian.id} aurorian={aurorian} user={user} setUser={setUser}></MyAurorianIcon>
      )} <br></br>
      <span className="font-white">3☆</span> <br></br>
          {rarity_3_Array.map(aurorian =>
          <MyAurorianIcon key={aurorian.id} aurorian={aurorian} user={user} setUser={setUser}></MyAurorianIcon>
      )} <br></br>
      </div>
      <div className="my-aurorian-list-viewbytable-wrap">
        <Button onClick={()=>setTblModalOpen(!tblModalOpen)} className="my-aurorian-list-viewbytable-btn">5,6성 전체 테이블로 보기</Button>
      </div>
    </Col>
    )
  }

  export default React.memo(AurorianList);