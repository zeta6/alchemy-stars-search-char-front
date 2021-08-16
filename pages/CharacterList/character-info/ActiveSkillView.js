import React, {useState, useEffect} from 'react';
import {Row, Col, Card, CardGroup} from 'react-bootstrap';
import Image from "next/image";

const ActiveSkillView = ({skill, rarity}) => {  
  const [ basicPreemptive, setBasicPreempTive ] = useState("")
  const [ brthPreemptive, setBrthPreempTive ] = useState("")
  const [ upgSkillBrth, setUpgSkillBrth ] = useState(["",""])

  useEffect(() => {
    if(rarity){
      if(rarity == 3){
        setUpgSkillBrth(["3"])
      }else if(rarity == 4){
        setUpgSkillBrth(["4"])
      }else if(rarity == 5){
        setUpgSkillBrth(["2","5"])
      }else if(rarity == 6){
        setUpgSkillBrth(["3","6"])
      }
    }
  }, [rarity])

  useEffect(() => {
    if(skill){
      if(skill.preemptive == "X"){
        setBasicPreempTive("X")
        setBrthPreempTive("X")
      }
      if(skill.preemptive == "O"){
        setBasicPreempTive("O")
        setBrthPreempTive("O")
      }else if(skill.preemptive == 1){
        setBasicPreempTive("X")
        setBrthPreempTive(upgSkillBrth[0])
      }else if(skill.preemptive == 2){
        setBasicPreempTive("X")
        setBrthPreempTive(upgSkillBrth[1])
      }
    }
  },[upgSkillBrth, skill])

  if(!skill){
    return null;
  }
  if(skill){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        액티브: {skill.name}
      </Col>
      <Col lg={3}>
        <Image unoptimized="true" width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={12} lg={8}>
        <div className="active-skill-card-wrap">
          <Card className="active-skill-card">
            CD:{skill.cooltime}
          </Card>
          <Card className="active-skill-card-text">
            선제:{basicPreemptive}
          </Card>
          <Card className="active-skill-card-text-long">
            돌파선제:{brthPreemptive}
          </Card>
        </div>
      </Col>
      <div> 
        {skill.text}
      </div>
      </Row>
    )
  }
}
export default ActiveSkillView;