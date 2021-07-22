import React, {useEffect, useState} from 'react';
import { Table, ButtonToolbar, Button, Row, Col, ButtonGroup} from 'react-bootstrap';
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
      <Col lg={3}>
        <Image width="60" height="60" src={skill.icon} alt="skill.icon"></Image>
      </Col>
      <Col xs={4} lg={3}>
        <Button className="chain-skill-veiw-button">
        CD:{skill.cooltime}
        </Button>
      </Col>
      <Col xs={4} lg={4}>
        <Button className="chain-skill-veiw-button">
        선제:{skill.preemptive}
        </Button>
      </Col>
      <div>
        {skill.text}
      </div>
      </Row>
    )
  }
}
export default ActiveSkillView;