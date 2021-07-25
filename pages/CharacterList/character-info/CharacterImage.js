import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import { Container, Row, Col, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";

const CharacterImage = ({image}) => {
  const [ Ascension, setAscension ] = useState(0)
  const [ isLoading, setLoading] = useState(true)
  if(!image){
    return null;
  }
  if(Ascension == 0){
    return(
      <Container>
        <Row className="character-info-character-row">
          <Col>
          <div className="character-info-character-image-wrapper">
            <div className="character-info-character-image">
              <Image layout="fill" src={image.ascension_0} alt="migard_asc0"></Image>
            </div>
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonToolbar>
              <ButtonGroup className="character-info-character-image-button">
                <Button variant="info" onClick={()=>setAscension(0)}>기본</Button>
                <Button onClick={()=>setAscension(3)}>3각성</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>    
      </Container>
    )
  }else if(Ascension == 3){
    return(
      <Container>
        <Row className="character-info-character-row">
          <Col>
          <div className="character-info-character-image-wrapper">
            <div className="character-info-character-image">
              <Image layout="fill" src={image.ascension_3} alt="migard_asc0"></Image>
            </div>
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonToolbar>
              <ButtonGroup className="character-info-character-image-button">
                <Button onClick={()=>setAscension(0)}>기본</Button>
                <Button variant="info" onClick={()=>setAscension(3)}>3각성</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>    
      </Container>
    );  
  }
} 

export default CharacterImage;