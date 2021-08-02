import React from 'react';
import { Table, Row, Col } from "react-bootstrap";
import Image from "next/image"

const EquipmentView = ({equipment}) => {
  if(!equipment){
    return null;
  }else{
    return(
    <Row className="character-info-equip-row">
      <Col lg={6} className="character-info-detail-col">
        <div className="character-info-character-image-wrapper">
          <div className="character-info-character-image">
            <Image unoptimized="true" layout="fill" src={equipment.image} alt="equip_image"></Image>
          </div>
        </div>
      </Col>
      <Col lg={6}>
        <span className="character-info-equip-span">장비 정보</span><br></br>
        <span className="character-info-equip-name-span">{equipment.name}</span><br></br>
        <span className="character-info-equip-text-span">{equipment.text}</span>
        <Table striped bordered hover variant="dark" className="character-info-equip-talbe-lv">
          <thead>
            <tr className="character-table-td-index">
              <th className="character-info-equi-table-count">Lv</th>
              <th className="character-info-equip-talbe-lv">능력</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="character-info-equi-table-count">Lv1</td>
              <td>{equipment.lv1_text}<br></br>{equipment.lv1_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv2</td>
              <td>{equipment.lv2_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv3</td>
              <td>{equipment.lv3_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv4</td>
              <td>{equipment.lv4_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv5</td>
              <td>{equipment.lv5_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv6</td>
              <td>{equipment.lv6_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv7</td>
              <td>{equipment.lv7_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv8</td>
              <td>{equipment.lv8_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv9</td>
              <td>{equipment.lv9_state_text}</td>
            </tr> 
            <tr>
              <td className="character-info-equi-table-count">Lv10</td>
              <td>{equipment.lv10_text}</td>
            </tr> 
          </tbody>
        </Table>
      </Col>
    </Row>
    )
    }
}

export default EquipmentView;