import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Col, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from 'assets/api/api';
import Image from "next/image";
import { toPng } from 'html-to-image';

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

  const resultToPngRef = useRef(null)

  const onButtonClick = useCallback(() => {
    if (resultToPngRef.current === null) {
      return
    }

    const style = {  }

    toPng(resultToPngRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'aurorian-list.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [resultToPngRef])

  // componets
  const TblModalAurorianIcon = ({aurorian, user}) => {
    if(user.owned_char.includes(aurorian.id)){
      return(
        <Image width="65" height="65" unoptimized="true" src={aurorian.icon} alt="?????????"></Image>
      )
    }else{
      return(
        <span className="myaurorian-icon-opacity">
          <Image width="65" height="65" unoptimized="true" src={aurorian.icon} alt="?????????"></Image>
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
    <div className="myaurorian-table-container" ref={resultToPngRef}>
    <Table striped bordered hover variant="dark" className="myaurorian-modal-table">
      <thead>
        <tr className="myaurorian-modal-table-tr">
          <td className="myaurorian-modal-table-class-col">??????/<br></br>?????????</td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/fire.png' alt="???"></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/water.png' alt="???"></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/forest.png' alt="???"></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/thunder.png' alt="??????"></Image></div></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/burster.jpg' alt="?????????"></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="burster").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/sniper.jpg' alt="??????"></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="sniper").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/changer.jpg' alt="?????????"></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="changer").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/supporter.jpg' alt="?????????"></Image></div></td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Fire.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Fire.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Water.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Water.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Forest.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Forest.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
          <td className="myaurorian-modal-table-element-col-body">
            {rarity_6_Thunder.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
            {rarity_5_Thunder.filter(aurorian => aurorian.char_class.name =="supporter").map( aurorian =>
            <TblModalAurorianIcon key={aurorian.id} aurorian={aurorian} user={user}></TblModalAurorianIcon>
            )}
          </td>
        </tr>
      </tbody>
    </Table>
    </div>
    <div className="myaurorian-modal-btn-wrap">
    {/* <Button className="myaurorian-top-btn" onClick={()=>setTblModalOpen(!tblModalOpen)}>????????????????????????</Button> */}
    <Button className="myaurorian-modal-btn" onClick={onButtonClick}>????????? ????????????</Button>
    <Button className="myaurorian-modal-btn" onClick={()=>setTblModalOpen(!tblModalOpen)}>??????</Button>
    </div>
    </div>
    </div>
    )
  }
}

export default AurorianTblModal;