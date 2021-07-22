import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CharacterState from "../../components/CharacterState"
import Layout from '../../components/Layout';
import { Container, Row, Col} from "react-bootstrap";
import Head from "next/head";
import CharacterImage from  "./character-info/CharacterImage";
import ChainSkillView from "./character-info/ChainSkillView";
import EquipSkillView from "./character-info/EquipSkillView";
import Image from "next/image"

export default function CharacterInfo(){
  const router = useRouter();
  const character_id = router.query.characterInfo;
  const [ loading , setLoading ] = useState(true)
  const [ character, setCharacter ] = useState(CharacterState)
  const [ chainSkill, setChainSkill ] = useState("first")
  const [ equipSkill, setEquipSkill ] = useState("lv1")
 

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

  const b_test = () => {
    console.log(character.image);
  }

  if(loading){
    return(
      "loading"
    )
  }else{
    return(
      <div>
      <Head>
        <title>{character.name}</title>
       </Head>
      <Layout></Layout>
      <Container className="character-info-container">
        <Row>
          <Col className="character-info-first-row-index-col">
            바로가기 : <a href="#quickView">퀵뷰</a> / <a href="#equipSkill">장비스킬</a> / <a href="#breakthrough">한계돌파</a> / <a href="#Ascension">각성</a> / <a href="#preferredGifts">선호선물</a> / <a href="#CharacterFile">캐릭터파일</a>
          </Col>
        </Row>
        <Row>
      
         {/* <Col sg ={3}xl={5} className="character-info-index-col">
          index
         </Col> */}
         <Col xl={8} className="character-info-detail-col">
           <CharacterImage image={character.image}></CharacterImage>
         </Col>
         <Col className="character-info-first-row-col">
         <Row>
          <Col>
            <a name="quickView"></a>
            <div>이름: {character.name} / {character.name_alphabet} / CV: {character.voice}</div> 
            <div className="character-info-attr-class-div">
              레어도: ☆{character.rarity} / <span>세력: {character.faction}</span>
              <Image width="30" height="30" src={character.faction_icon} alt={character.faction}></Image> </div>
            <div className="character-info-attr-class-div">
              <span className="character-info-attr-class-span">주속성:</span><Image width="30" height="30" src={character.main_attribute_icon} alt={character.main_attribute}></Image>
              <span className="character-info-attr-class-span-2">보조속성: </span><Image width="30" height="30" src={character.sub_attribute_icon} alt={character.sub_attribute}></Image><br></br>
              <span className="character-info-attr-class-span-2">클래스: </span><Image width="30" height="30" src={character.class_icon} alt={character.class}></Image><br></br>
            </div>
          </Col>
        </Row>
        <Row className="skills-veiw-row">
          <Col lg={12}>
            액티브스킬: {character.active_skill.name} / 쿨타임: {character.active_skill.cooltime}턴
          </Col>
          <Col lg={3}>
          <Image width="60" height="60" src={character.active_skill.icon} alt="active_skill.icon"></Image>
          </Col>
          <Col>
          {character.active_skill.text}
          </Col>
          <Col lg={12} className="chain-skill-view-top">
            <ChainSkillView skill={character.chain_skill} chainSkill={chainSkill} setChainSkill={setChainSkill}>
            </ChainSkillView>
          </Col>
          <Col lg={12}>
            <EquipSkillView skill={character.equip_skill} equipSkill={equipSkill} setEquipSkill={setEquipSkill}>
            </EquipSkillView>
          </Col>
        </Row>
        </Col>
        </Row>
      </Container>
    </div>
    )

  }

  }