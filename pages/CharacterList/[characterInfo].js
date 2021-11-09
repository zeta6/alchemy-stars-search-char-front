import React, {useState, useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CharacterState from "varibles/CharacterState"
import { Container, Row, Col, Table, Button, ButtonGroup} from "react-bootstrap";
import Head from "next/head";
import CharacterImage from  "components/character-info/CharacterImage";
import InfoChainSkillView from "components/character-info/InfoChainSkillView";
import InfoEquipSkillView from "components/character-info/InfoEquipSkillView";
import InfoActiveSkillView from "components/character-info/InfoActiveSkillView";
import EquipmentView from "components/character-info/EquipmentView";
import CharFileView from "components/character-info/CharFileView";
import Image from "next/image"
import { BackendUrl } from 'assets/api/api'

export default function CharacterInfo(){
  const router = useRouter();
  const character_id = router.query.characterInfo;

  const [ character, setCharacter ] = useState(CharacterState)
  const [ loading , setLoading ] = useState(true)
  const [ ascension, setAscension ] = useState("asc_0");
  const [ breakthrough, setBreakthrough ] = useState("br_0");
  const [ user, setUser ] = useState(null)

  // useEffect
  useEffect(() => { 
    const token_id = window.sessionStorage.getItem('token_id')
    if(token_id){
      axios.get(BackendUrl+'/accounts/owned_char/', {
        headers: {
          'Authorization': token_id}
        })
        .then(res => setUser(
          {
            email: res.data.email,
          })) 
    }else{
      setUser({
          email: "",
          fav_char: [],
          owned_char: [],
        })
    }
  }, [])

  useEffect(() => {
    if(character_id){
      axios.get(BackendUrl+`/api/character/${character_id}/`)
      .then(response => setCharacter(response.data))
      .catch(error => console.log(error));
      setLoading(false)
    }},[character_id]
  );

  const BreakthroughButton = ({number, buttonBrth}) => {
    if(buttonBrth == breakthrough){
      return(
        <Button variant="info" onClick={() => setBreakthrough(buttonBrth)}>{number}</Button>
      )
    }else{
      return(
        <Button onClick={() => setBreakthrough(buttonBrth)}>{number}</Button>
      )
    }
  }

  const BreakthroughButtonGroup = ({rarity}) => {
    if(!rarity){
      return null
    }else{
    const range = Array(parseInt(rarity)+1).fill(0).map((x,y) => x + y );
    return (
      <ButtonGroup className="character-info-quick-view-breakthrough-col-button">
        {range.map((num) => (
          <BreakthroughButton key={num} number={num} buttonBrth={'br_'+num} 
          breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
        ))}
      </ButtonGroup>
    )   
    }
  }

  const BreakthrougtBody = ({rarity}) => {
    if(!rarity){
      return null
    }else{
    const range = Array(parseInt(rarity)).fill(1).map((x,y) => x + y );
    return (
      <tbody>
        {range.map((brth)=> (
          <React.Fragment key={brth}>
            <tr>
              <td className="character-info-breakthrough-table-count">{brth}</td>
              <td className="character-info-berakthrough-talbe-text">{character.breakthrough["count_"+brth]}</td>
            </tr> 
          </React.Fragment>
        ))}
      </tbody>
    )}
  }

  const AscensionButton = ({number, buttonAscension}) => {
    if(buttonAscension == ascension){
      return(
        <Button variant="info" onClick={() => setAscension(buttonAscension)}>{number}</Button>
      )
    }else{
      return(
        <Button onClick={() => setAscension(buttonAscension)}>{number}</Button>
      )
    }
  }

  const AscensionButtonGroup = () => {
    if(!character){
      return null
    }
    if(character.rarity == 3){
      return(
        <ButtonGroup className="character-info-quick-view-ascension-col-button">
          {['0', '1', '2'].map((num) =>
            <AscensionButton key={num} number={num} buttonAscension={"asc_"+num}></AscensionButton>
          )}
        </ButtonGroup>
      )
    }else{
      return(
        <ButtonGroup className="character-info-quick-view-ascension-col-button">
          {['0', '1', '2', '3'].map((num) =>
            <AscensionButton key={num} number={num} buttonAscension={"asc_"+num}></AscensionButton>
          )}
        </ButtonGroup>
      )
    }
  }
  // for brth text row
  const getAscRowArray = () => {
    if(character.rarity == 3){
      return Array(2).fill(1).map((x,y) => x + y);
    }else{
      return Array(3).fill(1).map((x,y) => x + y);
    } 
  }

  const ascRowArray = getAscRowArray(); 

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
      <Container className="character-info-container">
        <Row>
          <Col className="character-info-first-row-index-col">
            Go to : <a href="#quickView">퀵뷰</a> / <a href="#equipinfo">장비정보</a> / <a href="#profile">프로필</a> / <a href="#breakthrough">한계돌파</a> / <a href="#ascension">각성</a> / <a href="#preferredGifts">선호선물</a> / <a href="#characterFile">캐릭터파일</a> 
          </Col>
        </Row>
        <Row>
          <Col lg={7} xl={7} className="character-info-detail-col">
            <CharacterImage image={character.image} rarity={character.rarity}></CharacterImage>
          </Col>
          <Col className="character-info-first-row-col">
            <Row>
              <Col>
                <a name="quickView"></a>
                <div>이름: {character.name} / {character.name_alphabet} / CV: {character.voice.name}</div> 
                <div className="character-info-attr-class-div">
                  레어도: ☆{character.rarity} / <span>세력: {character.faction.name}</span>
                  <Image unoptimized="true" width="30" height="30" src={character.faction.icon} alt={character.faction}></Image>
                   </div>
                <div className="character-info-attr-class-div">
                  <span className="character-info-attr-class-span">주속성:</span><Image unoptimized="true" width="30" height="30" src={character.main_attribute.icon} alt={character.main_attribute}></Image><br></br>
                  <span className="character-info-attr-class-span-2">보조속성: </span><Image unoptimized="true" width="30" height="30" src={character.sub_attribute.icon} alt={character.sub_attribute}></Image><br></br>
                  <span className="character-info-attr-class-span-2">클래스: </span><Image unoptimized="true" width="30" height="30" src={character.char_class.icon} alt={character.char_class}></Image><br></br>
                </div>
                <div>공격력: {character.state.attack} / 방어력: {character.state.defence} / 체력: {character.state.hit_point}</div>
              </Col>
            </Row>
            <Row className="skills-veiw-row">
              <Col lg={12}>
                <InfoActiveSkillView skill={character.active_skill} ascension={ascension} breakthrough={breakthrough}
                char_brth={character.breakthrough} char_asc={character.ascension} rarity={character.rarity}></InfoActiveSkillView>
              </Col>
              <Col lg={12} className="chain-skill-view-top">
                <InfoChainSkillView skill={character.chain_skill} ascension={ascension} breakthrough={breakthrough}
                char_brth={character.breakthrough} char_asc={character.ascension} rarity={character.rarity}>
                </InfoChainSkillView>
              </Col>
              <Col lg={12}>
                <InfoEquipSkillView skill={character.equip_skill} ascension={ascension} breakthrough={breakthrough}
                char_brth={character.breakthrough} char_asc={character.ascension} rarity={character.rarity}>
                </InfoEquipSkillView>
              </Col>
              <Col lg={12} className="character-info-quick-view-ascension-col">
                각성 : 
                <AscensionButtonGroup></AscensionButtonGroup> 
              </Col>
              <Col lg={12} className="character-info-quick-view-breakthrough-col">
                돌파:
                <BreakthroughButtonGroup rarity={character.rarity}></BreakthroughButtonGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <a name="equipinfo"></a>
        <EquipmentView equipment={character.equipment}></EquipmentView>
        <Row className="character-info-breakthrough-row">
          <Col lg={4}>
            <div className="img-align-center">
              <div className="character-info-logo-image-wrapper">
                <div className="character-info-logo-image">
                <Image unoptimized="true" layout="fill" src={character.logo} alt="logo"></Image>
              </div>
              </div>
            </div>
          </Col>
          <Col lg={8}>
          <a name="profile"></a>
          <span className="character-info-equip-name-span">오로리안 소개 프로필</span><br></br>
          <Table striped bordered hover variant="dark">
            <tbody> 
              <tr>
                <td className="character-info-preferred-talbe-text">{character.profile}</td>
              </tr> 
            </tbody>
          </Table>
          </Col>
        </Row>
        <Row className="character-info-breakthrough-row">
          <a name="breakthrough"></a>
          <span className="character-info-equip-name-span">한계 돌파</span><br></br>
          <Table striped bordered hover variant="dark" className="character-info-breakthrough-table">
            <thead>
              <tr className="character-info-breakthrough-table">
                <th className="character-info-breakthrough-table-count">돌파</th>
                <th className="character-info-berakthrough-talbe-text">능력</th>
              </tr>
            </thead>
            <BreakthrougtBody rarity={character.rarity}></BreakthrougtBody>
          </Table>
        </Row>
        <Row className="character-info-breakthrough-row">
          <a name="ascension"></a>
          <span className="character-info-equip-name-span">각성</span><br></br>
          <Table striped bordered hover variant="dark" className="character-info-breakthrough-table">
            <thead>
              <tr className="character-info-breakthrough-table">
                <th className="character-info-breakthrough-table-count">각성</th>
                <th className="character-info-berakthrough-talbe-text">능력</th>
              </tr>
            </thead>
            <tbody>
              {}
                {ascRowArray.map((num) =>
                  <tr key={num}>
                    <td className="character-info-breakthrough-table-count">{num}</td>
                    <td className="character-info-berakthrough-talbe-text">{character.ascension["lv"+num]}</td>
                  </tr>
              )}
            </tbody>
            </Table>
        </Row>
        <Row className="character-info-breakthrough-row">
          <a name="preferredGifts"></a>
          <span className="character-info-equip-name-span">선호 선물</span><br></br>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td className="character-info-preferred-table-name">{character.faction.name}</td>
                <td className="character-info-preferred-talbe-text">{character.faction.small_gift}</td>
              </tr> 
              <tr>
                <td className="character-info-preferred-table-name"></td>
                <td className="character-info-preferred-talbe-text">{character.faction.big_gift}</td>
              </tr> 
              <tr>
                <td className="character-info-preferred-table-name">{character.personality.name}</td>
                <td className="character-info-preferred-talbe-text">{character.personality.small_gift}</td>
              </tr>
              <tr>
                <td className="character-info-preferred-table-name"></td>
                <td className="character-info-preferred-talbe-text">{character.personality.big_gift}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
        <CharFileView char_file={character.char_file} rarity={character.rarity}></CharFileView>
      </Container>
    </div>
    )

  }

  }