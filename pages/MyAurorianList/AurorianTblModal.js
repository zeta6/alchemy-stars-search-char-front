import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Col, Button, Table} from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl';
import Image from "next/image";
import * as htmlToImage from 'html-to-image';

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

  const saveAs = (blob, fileName) =>{
    var elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
      elem.click();
    } else {
      elem.target = '_blank';
      elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }

  const onCapture = (id) =>{
    htmlToImage.toPng(document.getElementById(id))
     .then(function (dataUrl) {
       saveAs(dataUrl, 'my-node.png');
     });
   }

  // const resultToPngRef = useRef(null)

  // const onButtonClick = useCallback(() => {
  //   if (resultToPngRef.current === null) {
  //     return
  //   }

  //   const style = {  }

  //   toPng(resultToPngRef.current)
  //     .then((dataUrl) => {
  //       const link = document.createElement('a')
  //       link.download = 'aurorian-list.png'
  //       link.href = dataUrl
  //       link.click()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [resultToPngRef])

  // componets
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
    <div className="myaurorian-table-container"
    //  ref={resultToPngRef}>
    id="aurorianTbl">
    <Table striped bordered hover variant="dark" className="myaurorian-modal-table">
      <thead>
        <tr className="myaurorian-modal-table-tr">
          <td className="myaurorian-modal-table-class-col">속성/<br></br>클래스</td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/fire.png' alt="불"></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/water.png' alt="물"></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/forest.png' alt="숲"></Image></div></td>
          <td className="myaurorian-modal-table-element-col"><div className="myaurorian-modal-table-td-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/thunder.png' alt="번개"></Image></div></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/burster.jpg' alt="버스터"></Image></div></td>
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
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/sniper.jpg' alt="스나"></Image></div></td>
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
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/changer.jpg' alt="체인저"></Image></div></td>
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
          <td className="myaurorian-modal-table-class-col"><div className="myaurorian-modal-table-td-class-div"><Image unoptimized="true" width='50' height='50' src='/SearchChar/ButtonIcons/supporter.jpg' alt="서포터"></Image></div></td>
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
    {/* <Button className="myaurorian-top-btn" onClick={()=>setTblModalOpen(!tblModalOpen)}>스크린샷내보내기</Button> */}
    <Button className="myaurorian-modal-btn" onClick={()=>onCapture("aurorianTbl")}>테이블 다운로드</Button>
    <Button className="myaurorian-modal-btn" onClick={()=>setTblModalOpen(!tblModalOpen)}>닫기</Button>
    </div>
    </div>
    </div>
    )
  }
}

export default AurorianTblModal;