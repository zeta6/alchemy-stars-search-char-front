import React from 'react';
import { Col } from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl'
import Image from "next/image";

const AurorianList = ({characterList, user, ownEditing, setSelectedAurorian, setUser}) => {
    console.log("redering")
  
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
  
    const rarity_6_Array = characterList.filter(rarity_6_Filter).sort(getSortOrderProp("main_attribute", "name"))
    const rarity_5_Array = characterList.filter(rarity_5_Filter).sort(getSortOrderProp("main_attribute", "name"))
    const rarity_4_Array = characterList.filter(rarity_4_Filter).sort(getSortOrderProp("main_attribute", "name"))
    const rarity_3_Array = characterList.filter(rarity_3_Filter).sort(getSortOrderProp("main_attribute", "name"))
  
    // MyAurorianIcon component start
    const MyAurorianIcon = ({aurorian, user, setUser}) => {
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
  
      if(!aurorian || !user){
        return null
      }else if(user.owned_char.includes(aurorian.id)){
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
      </Col>
    )
  }

  export default React.memo(AurorianList);