import React, {useState} from 'react';
import Image from 'next/image';
import { Container, Row, Col, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";

const CharacterImage = ({image, rarity}) => {
  const [ Ascension, setAscension ] = useState(0)
  if(!image){
    return null;
  }
  if(rarity < 4){
    return(
      <Container>
        <Row className="character-info-character-row">
          <Col className="character-image-col">
          <div className="character-info-character-image-wrapper">
            <div className="character-info-character-image">
              <Image priority="true" layout="fill" unoptimized="true" src={image.ascension_0} alt="migard_asc0"></Image>
            </div>
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <ButtonToolbar>
              <ButtonGroup className="character-info-character-image-button">
                <Button variant="info" onClick={()=>setAscension(0)}>기본</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>    
      </Container>
    )
  }
  if(Ascension == 0){
    return(
      <Container>
        <Row className="character-info-character-row">
          <Col className="character-image-col">
          <div className="character-info-character-image-wrapper">
            <div className="character-info-character-image">
              <Image priority="true" layout="fill" unoptimized="true" src={image.ascension_0} alt="migard_asc0"></Image>
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
              <Image priority="true" layout="fill" unoptimized="true" src={image.ascension_3} alt="migard_asc0"></Image>
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