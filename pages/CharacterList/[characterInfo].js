import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CharacterState from "../../components/CharacterState"
import Layout from '../../components/Layout';
import { Container } from "react-bootstrap";

export default function CharacterInfo(){
  const router = useRouter();
  const character_id = router.query.characterInfo;
  const [loading , setLoading] = useState(true)
  const [character, setCharacter] = useState(CharacterState)
 

  useEffect(() => {
    async function fetchData(){
    if(character_id){
      try {
        setLoading(false);
        const response = await axios.get(`/api/${character_id}/`);
        setCharacter(response.data);
      } catch (error){
        console.error(error);
      }
    }
  }
  fetchData();
},[character_id]
  );


  // const b_test = () => {
  //   console.log(character);
  // }

  if(loading){
    return(
      "loading"
    )
  }else{
    return(
      <Container className="bg-color-darknavy">
      <Layout></Layout>
        {/* <button onClick={()=>b_test()}>click</button> */}
        이름 :{character.name} <br></br>
        레어도 :{character.rarity} <br></br>
        주속성 :{character.main_attribute} <br></br>
        보조속성 :{character.sub_attribute} <br></br>
        체인스킬: {character.chain_skill.name} <br></br><br></br>
        1체인 발동타일: {character.chain_skill.first.tiles} <br></br>
        1체인 데미지: {character.chain_skill.first.damage} <br></br>
        1체인 범위: {character.chain_skill.first.area} <br></br>
        1체인 범위타입:{character.chain_skill.first.area_type} <br></br>
        1체인 설명:{character.chain_skill.first.text} <br></br><br></br>
        2체인 발동타일: {character.chain_skill.second.tiles} <br></br>
        2체인 데미지: {character.chain_skill.second.damage} <br></br>
        2체인 범위: {character.chain_skill.second.area} <br></br>
        2체인 범위타입:{character.chain_skill.second.area_type} <br></br>
        2체인 설명:{character.chain_skill.second.text} <br></br><br></br>
        3체인 발동타일: {character.chain_skill.third.tiles} <br></br>
        3체인 데미지: {character.chain_skill.third.damage} <br></br>
        3체인 범위: {character.chain_skill.third.area} <br></br>
        3체인 범위타입:{character.chain_skill.third.area_type} <br></br>
        3체인 설명:{character.chain_skill.third.text} <br></br><br></br>
        액티브 스킬 :{character.active_skill.name} <br></br>
        액티브 스킬 효과:{character.active_skill.text} <br></br><br></br>
        장비 스킬 : {character.equip_skill.name} <br></br>
        장비 스킬1레벨:{character.equip_skill.lv1_text} <br></br>
        장비 스킬3레벨:{character.equip_skill.lv3_text} <br></br>
        장비 스킬6레벨:{character.equip_skill.lv6_text} <br></br>
        장비 스킬10레벨:{character.equip_skill.lv10_text} <br></br>
      </Container>
    )

  }

  }