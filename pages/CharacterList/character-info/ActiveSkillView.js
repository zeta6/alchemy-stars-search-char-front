import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import Image from "next/image";

const ActiveSkillView = ({skill}) => {
  if(!skill){
    return null;
  }
  if(skill){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        액티브: {skill.name}
      </Col>
      <Col lg={4}>
        <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={4} lg={3}>
        <div className="active-skill-card-wrap">
          <Card className="active-skill-card">
            CD:{skill.cooltime}
          </Card>
        </div>
      </Col>
      <Col xs={4} lg={4}>
        <div className="active-skill-card-wrap">
          <Card className="active-skill-card">
            선제:{skill.preemptive}
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