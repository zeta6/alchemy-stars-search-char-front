import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup, Card} from 'react-bootstrap';
import Link from "next/link";
import Image from "next/image";

const ActiveSkillView = ({skill}) => {
  if(!skill){
    return null;
  }
  if(skill){
    return(
      <Row className="chain-skill-veiw-row">
      <Col lg={12}>
        액티브스킬: {skill.name}
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