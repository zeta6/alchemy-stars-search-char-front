import React, {useState} from 'react';
import { ButtonGroup, Button, Col } from 'react-bootstrap';
import Image from "next/image";
import InfoChainSkillView from "../CharacterList/character-info/InfoChainSkillView";
import InfoEquipSkillView from "../CharacterList/character-info/InfoEquipSkillView";
import InfoActiveSkillView from "../CharacterList/character-info/InfoActiveSkillView";
import Link from 'next/link';

const AurorianInfo = ({aurorian}) => {
    const [ ascension, setAscension ] = useState("asc_0");
    const [ breakthrough, setBreakthrough ] = useState("br_0");

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
        <ButtonGroup className="aurorian-info-breakthrough-buttongroup">
          {range.map((num) => (
            <BreakthroughButton key={num} number={num} buttonBrth={'br_'+num} 
            breakthrough={breakthrough} setBreakthrough={setBreakthrough}></BreakthroughButton>
          ))}
        </ButtonGroup>
      )   
      }
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
      if(!aurorian){
        return null
      }
      if(aurorian.rarity == 3){
        return(
          <ButtonGroup className="aurorian-info-breakthrough-buttongroup">
            {['0', '1', '2'].map((num) =>
              <AscensionButton key={num} number={num} buttonAscension={"asc_"+num}></AscensionButton>
            )}
          </ButtonGroup>
        )
      }else{
        return(
          <ButtonGroup className="aurorian-info-breakthrough-buttongroup">
            {['0', '1', '2', '3'].map((num) =>
              <AscensionButton key={num} number={num} buttonAscension={"asc_"+num}></AscensionButton>
            )}
          </ButtonGroup>
        )
      }
    }

    if(!aurorian){
      return null 
    }
    else{
      return(
        <div className="my-aurorian-info-layout">
          <div className="vertical-align-center-auro-list">
            <Image width="110" height="110" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
            <span>이름: {aurorian.name} <br></br>
            <div className="vertical-align-center">
            주속성: <span className="auro-list-small-icon"><Image unoptimized="true" width="25" height="25" src={aurorian.main_attribute.icon} alt="주속성"></Image></span>
            </div>
            <div className="vertical-align-center">
            보조속성: <span className="auro-list-small-icon"><Image unoptimized="true" width="25" height="25" src={aurorian.sub_attribute.icon} alt="부속성"></Image></span>
            </div>
            <div className="vertical-align-center">
            클래스: <span className="auro-list-small-icon"><Image unoptimized="true" width="25" height="25" src={aurorian.char_class.icon} alt="클래스"></Image></span>
            </div>
            </span>    
          </div>
          <InfoActiveSkillView skill={aurorian.active_skill} ascension={ascension} breakthrough={breakthrough}
            char_brth={aurorian.breakthrough} char_asc={aurorian.ascension} rarity={aurorian.rarity}>
          </InfoActiveSkillView>
          <InfoChainSkillView skill={aurorian.chain_skill} ascension={ascension} breakthrough={breakthrough}
            char_brth={aurorian.breakthrough} char_asc={aurorian.ascension} rarity={aurorian.rarity}>
          </InfoChainSkillView>
          <InfoEquipSkillView skill={aurorian.equip_skill} ascension={ascension} breakthrough={breakthrough}
            char_brth={aurorian.breakthrough} char_asc={aurorian.ascension} rarity={aurorian.rarity}>
          </InfoEquipSkillView>
          <Col lg={12} className="character-info-quick-view-ascension-col">
                각성: <br></br>
            <AscensionButtonGroup></AscensionButtonGroup> 
          </Col>
          <Col lg={12} className="character-info-quick-view-breakthrough-col">
            돌파: <br></br>
            <BreakthroughButtonGroup rarity={aurorian.rarity}></BreakthroughButtonGroup>
          </Col>
          <Link
              href={{
                pathname: '/CharacterList/[characterInfo]',
                query: { characterInfo: aurorian.id },
              }} passHref
            >
              <Button className="myaurorian-moreinfo-btn">Go to aurorian page</Button>
            </Link>
        </div>
      )
    }
  }

  export default AurorianInfo;