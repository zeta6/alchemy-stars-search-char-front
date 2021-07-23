import { Container, Table, Row, Col, Button, ButtonGroup, ButtonToolbar} from "react-bootstrap";
import Image from "next/image"

const EquipmentView = ({equipment}) => {

  if (!equipment){
    return null;
  }else{
    return(
    <Row className="character-info-equip-row">
      <Col lg={6} className="character-info-detail-col">
        <div className="character-info-character-image-wrapper">
          <div className="character-info-character-image">
            <Image layout="fill" src={equipment.image} alt="equip_image"></Image>
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
              <th>lv</th>
              <th className="character-info-equip-talbe-lv">능력</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>lv1</td>
              <td>{equipment.lv1_text}<br></br>{equipment.lv1_state_text}</td>
            </tr> 
            <tr>
              <td>lv2</td>
              <td>{equipment.lv2_state_text}</td>
            </tr> 
            <tr>
              <td>lv3</td>
              <td>{equipment.lv3_text}</td>
            </tr> 
            <tr>
              <td>lv4</td>
              <td>{equipment.lv4_state_text}</td>
            </tr> 
            <tr>
              <td>lv5</td>
              <td>{equipment.lv5_state_text}</td>
            </tr> 
            <tr>
              <td>lv6</td>
              <td>{equipment.lv6_text}</td>
            </tr> 
            <tr>
              <td>lv7</td>
              <td>{equipment.lv7_state_text}</td>
            </tr> 
            <tr>
              <td>lv8</td>
              <td>{equipment.lv8_state_text}</td>
            </tr> 
            <tr>
              <td>lv9</td>
              <td>{equipment.lv9_state_text}</td>
            </tr> 
            <tr>
              <td>lv10</td>
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