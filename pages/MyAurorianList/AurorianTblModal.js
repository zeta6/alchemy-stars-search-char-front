import React, { useState, useEffect } from 'react';
import { Col, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl';
import Image from "next/image";

const AurorianTblModal = ({tblModalOpen, setTblModalOpen, rarity_6_Array, rarity_5_Array, user}) => {
  const [ rarity_6_Fire, setRarity_6_Fire] = useState([]);
  const [ rarity_6_Water, setRarity_6_Water] = useState([]);
  const [ rarity_6_Forest, setRarity_6_Forest] = useState([]);
  const [ rarity_6_Thunder, setRarity_6_Thunder] = useState([]);
  const [ rarity_5_Fire, setRarity_5_Fire] = useState([]);
  const [ rarity_5_Water, setRarity_5_Water] = useState([]);
  const [ rarity_5_Forest, setRarity_5_Forest] = useState([]);
  const [ rarity_5_Thunder, setRarity_5_Thunder] = useState([]);

  useEffect(() => {
    if(rarity_6_Array && rarity_5_Array){

    const getRarity_6_Array = (List) => { return List.filter(rarity_6_Filter).sort(getSortOrderProp("main_attribute", "name")) }
    const getRarity_6_Fire = (List) => { return List.filter(fireFilter) }

    setRarity_6_Fire(rarity_6_Array.filter(aurorian => aurorian.main_attribute.name == "fire"))
    setRarity_5_Fire(rarity_5_Array.filter(aurorian => aurorian.main_attribute.name == "fire"))
    setRarity_6_Water(rarity_6_Array.filter(aurorian => aurorian.main_attribute.name == "water"))
    setRarity_5_Water(rarity_5_Array.filter(aurorian => aurorian.main_attribute.name == "water"))
    setRarity_6_Forest(rarity_6_Array.filter(aurorian => aurorian.main_attribute.name == "forest"))
    setRarity_5_Forest(rarity_5_Array.filter(aurorian => aurorian.main_attribute.name == "forest"))
    setRarity_6_Thunder(rarity_6_Array.filter(aurorian => aurorian.main_attribute.name == "thunder"))
    setRarity_5_Thunder(rarity_5_Array.filter(aurorian => aurorian.main_attribute.name == "thunder"))
  }
  }, [rarity_6_Array, rarity_5_Array])
  // useEffect end

  const TblModalAurorianIcon = ({aurorian, user}) => {
    if(user.owned_char.includes(aurorian.id)){
      return(
        <Image width="65" height="65" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
      )
    }else{
      return(
        <span className="myaurorian-icon-opacity">
          <Image width="65" height="65" unoptimized="true" src={aurorian.icon} alt="아이콘"></Image>
        </span>
      )
    }  
  }

  if(!tblModalOpen){
    return null
  }else if(tblModalOpen){
    return (
    <div className="myaurorian-list-table-modal">
    <div className="myaurorian-modal-container">
    <Table striped bordered hover variant="dark" className="myaurorian-modal-table">
      <thead>
        <tr className="myaurorian-modal-table-tr">
          <td className="myaurorian-modal-table-class-col">속성/<br></br>클래스</td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/fire.png'></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/water.png'></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/forest.png'></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/thunder.png'></Image></div></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/burster.jpg'></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/sniper.jpg'></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/changer.jpg'></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-div"><Image width='50' height='50' src='/SearchChar/ButtonIcons/supporter.jpg'></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
      </tbody>
    </Table>
    <div className="myaurorian-modal-btn-wrap">
    {/* <Button className="myaurorian-top-btn" onClick={()=>setTblModalOpen(!tblModalOpen)}>스크린샷내보내기</Button> */}
    <Button className="myaurorian-modal-btn" onClick={()=>setTblModalOpen(!tblModalOpen)}>닫기</Button>
    </div>
    </div>
    </div>
    )
  }
}

export default AurorianTblModal;