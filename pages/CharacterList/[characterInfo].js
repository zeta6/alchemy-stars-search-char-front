import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CharacterState from "../../components/CharacterState"
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import Head from "next/head";
import CharacterImage from  "./character-info/CharacterImage";
import ChainSkillView from "./character-info/ChainSkillView";
import EquipSkillView from "./character-info/EquipSkillView";
import InfoActiveSkillView from "./character-info/InfoActiveSkillView";
import ActiveSkillView from "./character-info/ActiveSkillView";
import Image from "next/image"

export default function CharacterInfo(){
  const router = useRouter();
  const character_id = router.query.characterInfo;
  
  const [ loading , setLoading ] = useState(true)
  const [ character, setCharacter ] = useState(CharacterState)
  const [ chainSkill, setChainSkill ] = useState("first")
  const [ equipSkill, setEquipSkill ] = useState("lv1")
  const [ ascension, setAscension ] = useState("asc_0");
  const [ breakthrough, setBreakthrough ] = useState("br_0");

  const AscensionButton = ({number, this_ascension, ascension, setAscension}) => {
    if(this_ascension == ascension){
      return(
        <Button variant="info" onClick={() => setAscension(this_ascension)}>{number}</Button>
      )
    }else{
      return(
        <Button onClick={() => setAscension(this_ascension)}>{number}</Button>
      )
    }
  }

  const BreakthroughButton = ({number, this_brth, breakthrough, setBreakthrough}) => {
    if(this_brth == breakthrough){
      return(
        <Button variant="info" onClick={() => setBreakthrough(this_brth)}>{number}</Button>
      )
    }else{
      return(
        <Button onClick={() => setBreakthrough(this_brth)}>{number}</Button>
      )
    }
  }


  useEffect(() => {
    async function fetchData(){
    if(character_id){
      try {
        const response = await axios.get(`/api/${character_id}/`);
        setCharacter(response.data);
        setLoading(false);
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
        <title>{character.name} - 백야극광 오로리안 검색기 </title>
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
         <Col lg={8} xl={8} className="character-info-detail-col">
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
            <InfoActiveSkillView skill={character.active_skill} ascension={ascension} breakthrough={breakthrough}></InfoActiveSkillView>
          </Col>
          <Col lg={12} className="chain-skill-view-top">
            <ChainSkillView skill={character.chain_skill} chainSkill={chainSkill} setChainSkill={setChainSkill}>
            </ChainSkillView>
          </Col>
          <Col lg={12}>
            <EquipSkillView skill={character.equip_skill} equipSkill={equipSkill} setEquipSkill={setEquipSkill} ascension={ascension}>
            </EquipSkillView>
          </Col>
          <Col lg={12}>
            각성 : 
          
          <ButtonGroup>
            <AscensionButton number={"0"} this_ascension={"asc_0"} ascension={ascension} setAscension={setAscension}></AscensionButton>
            <AscensionButton number={"1"} this_ascension={"asc_1"} ascension={ascension} setAscension={setAscension}></AscensionButton>
            <AscensionButton number={"2"} this_ascension={"asc_2"} ascension={ascension} setAscension={setAscension}></AscensionButton>
            <AscensionButton number={"3"} this_ascension={"asc_3"} ascension={ascension} setAscension={setAscension}></AscensionButton>
          </ButtonGroup>
          </Col>
          <Col lg={12}>
            돌파:
            <ButtonGroup>
              <BreakthroughButton number={"0"} this_brth={"br_0"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
              <BreakthroughButton number={"1"} this_brth={"br_1"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
              <BreakthroughButton number={"2"} this_brth={"br_2"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
              <BreakthroughButton number={"3"} this_brth={"br_3"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
              <BreakthroughButton number={"4"} this_brth={"br_4"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
              <BreakthroughButton number={"5"} this_brth={"br_5"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
              <BreakthroughButton number={"6"} this_brth={"br_6"} breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
            </ButtonGroup>
          </Col>
        </Row>
        </Col>
        </Row>
      </Container>
    </div>
    )

  }

  }