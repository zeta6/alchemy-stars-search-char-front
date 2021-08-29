
import { object } from 'prop-types';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Head from 'next/head';
import axios from 'axios';
import { BackendUrl } from '../components/BackendUrl';
import Image from 'next/image';
import BannerGroup from './RecruitSumulator/BannerGroup';
import { useRouter } from 'next/router';
import { toPng } from 'html-to-image';


const RecruitSimulator = () => {

  const router = useRouter()

  const [user, setUser] = useState(null);
  const [loading ,setLoading] = useState(true);
  const [recruitsArray, setRecruitsArray] = useState([]);
  const [activeRecruit, setActiveRecruit] = useState(null);
  const [aurorianArray, setAurorianArray] = useState([]);
  const [activeAurorianArray, setActiveAurorianArray] = useState([]);
  const [picked_6_Aurorians, setPicked_6_Aurorians] = useState([]);
  const [picked_5_Aurorians, setPicked_5_Aurorians] = useState([]);
  const [resultArray , setResultArray] = useState([]);
  const [unluckyStack, setUnluckyStack] = useState(0);
  const [recruitCount, setRecruitCount] = useState(0);
  const [first_5_Rarity, setFirst_5_Rarity] = useState(true);
  const [record_6_Picked, setRecord_6_Picked] = useState([]);
  const [record_6_NotPicked, setRecord_6_NotPicked] = useState([]);
  const [oddsUp, setOddsUp] = useState(0);

  const resultToPngRef = useRef(null)

  const onButtonClick = useCallback(() => {
    if (resultToPngRef.current === null) {
      return
    }

    const style = { backgroundColor: "black", textAlign: "center"}
    toPng(resultToPngRef.current, {style: style})
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'recruit.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [resultToPngRef])

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  const getRecruitRarity = () => {
    const result = Math.random()
    if(unluckyStack <= 50){
      if(first_5_Rarity == true && recruitCount === 9){
        setFirst_5_Rarity(false);
        return 5
      }else if(result < 0.02){
        return 6
      }else if(result >= 0.02 && result < 0.115){
        setFirst_5_Rarity(false);
        return 5
      }else if(result >= 0.115 && result < 0.445){
        return 4
      }else{
        return 3
      }
    }else{
      const addOdds = 0.025 * (unluckyStack-50);
      const oneThird = addOdds / 3;
      if(result < 0.02 + addOdds){
        return 6
      }else if(result >= 0.02 && result < 0.115 - oneThird){
        return 5
      }else if(result >= 0.115 && result < 0.445 - oneThird){
        return 4
      }else{
        return 3
      }
    }
  }


  const getRecruitRarity_10 = (tempUnluckyStack, tempRecruitCount, tempFirst_5) => {
    const result = Math.random()
    if(tempUnluckyStack <= 50){
      if(tempFirst_5 === true && tempRecruitCount === 9){
        setFirst_5_Rarity(false);
        return 5
      }else if(result < 0.02){
        return 6
      }else if(result >= 0.02 && result < 0.115){
        setFirst_5_Rarity(false);
        return 5
      }else if(result >= 0.115 && result < 0.445){
        return 4
      }else{
        return 3
      }
    }else{
      const addOdds = 0.025 * (tempUnluckyStack-50);
      const oneThird = addOdds / 3;
      if(result < 0.02 + addOdds){
        return 6
      }else if(result >= 0.02 && result < 0.115 - oneThird){
        return 5
      }else if(result >= 0.115 && result < 0.445 - oneThird){
        return 4
      }else{
        return 3
      }
    }
  }

  const getRarity_6_Result_10 = (tempRecord_6_Picked, tempRecord_6_NotPicked) => {
    const R_6_Length = picked_6_Aurorians.length;
    const result = Math.random()
    let pickUpOdds = 0.5;
    if(R_6_Length === 1){
      pickUpOdds = 0.5;
    }else if(R_6_Length === 2){
      pickUpOdds = 0.75;
    }else{
      pickUpOdds = 0;
    }
    if(result < pickUpOdds){
      const index = getRandomInt(0, R_6_Length);
      let count = 1;
      let tempPickedArray = tempRecord_6_Picked;
      for(let i = 0; i < tempRecord_6_Picked.length; i++){
        if(tempRecord_6_Picked[i]["id"] === picked_6_Aurorians[index]["id"]){
          if(tempRecord_6_Picked[i]["count"]){
            count = tempRecord_6_Picked[i]["count"] + 1
            tempPickedArray = tempPickedArray.filter(aurorian => aurorian.id !== tempRecord_6_Picked[i]["id"])
          }
        }
      }

      const counterRecordPicked = {...picked_6_Aurorians[index], "count": count};

      // console.log("카운터", Record_6_Counted);
      let _tempRecord_6_Picked = ([...tempPickedArray, counterRecordPicked])
      // console.log(_tempRecord_6_Picked);
      return [picked_6_Aurorians[index], _tempRecord_6_Picked, tempRecord_6_NotPicked];
      // setResultArray([...resultArray, picked_6_Aurorians[index]])

    }else{
      const notPickedR_6 = activeAurorianArray.filter(aurorian => aurorian.rarity === 6);
      const index = getRandomInt(0, notPickedR_6.length);
      let count = 1;
      let tempNotPickedArray = tempRecord_6_NotPicked;
      for(let i = 0; i < tempRecord_6_NotPicked.length; i++){
        if(tempRecord_6_NotPicked[i]["id"] === notPickedR_6[index]["id"]){
          if(tempRecord_6_NotPicked[i]["count"]){
            count = tempRecord_6_NotPicked[i]["count"] + 1
            tempNotPickedArray = tempNotPickedArray.filter(aurorian => aurorian.id !== tempRecord_6_NotPicked[i]["id"])
          }
        }
      }

      const counterRecordNotPicked = {...notPickedR_6[index], "count": count};

      let _tempRecord_6_NotPicked = ([...tempNotPickedArray, counterRecordNotPicked]);

      return [notPickedR_6[index], tempRecord_6_Picked, _tempRecord_6_NotPicked];
      // setResultArray([...resultArray, notPickedR_6[index]]);

      // console.log("픽뚫뽑기", notPickedR_6[index]);
      // console.log("결과어레이",resultArray);
      // console.log("결과픽뚫",record_6_NotPicked);
    }
  }
    
  const getRarity_6_Result = () => {
    const R_6_Length = picked_6_Aurorians.length;
    // console.log(R_6_Length);
    const result = Math.random()
    // console.log(result);
    let pickUpOdds = 0.5;
    if(R_6_Length === 1){
      pickUpOdds = 0.5;
    }else if(R_6_Length === 2){
      pickUpOdds = 0.75;
    }else{
      pickUpOdds = 0;
    }
    if(result < pickUpOdds){
      const index = getRandomInt(0, R_6_Length);
      let count = 1;
      let tempPickedArray = record_6_Picked;
      for(let i = 0; i < record_6_Picked.length; i++){
        if(record_6_Picked[i]["id"] === picked_6_Aurorians[index]["id"]){
          if(record_6_Picked[i]["count"]){
            count = record_6_Picked[i]["count"] + 1
            tempPickedArray = tempPickedArray.filter(aurorian => aurorian.id !== record_6_Picked[i]["id"])
          }
        }
      }
      // console.log("count", count)

      const counterRecordPicked = {...picked_6_Aurorians[index], "count": count};

      // console.log("카운터", Record_6_Counted);
      setRecord_6_Picked([...tempPickedArray, counterRecordPicked])
      return picked_6_Aurorians[index];
      // setResultArray([...resultArray, picked_6_Aurorians[index]])

      // console.log("결과어레이",resultArray);
      // console.log("결과픽업", record_6_Picked);
    }else{
      const notPickedR_6 = activeAurorianArray.filter(aurorian => aurorian.rarity === 6);
      const index = getRandomInt(0, notPickedR_6.length);

      let count = 1;
      let tempNotPickedArray = record_6_NotPicked;
      for(let i = 0; i < record_6_NotPicked.length; i++){
        if(record_6_NotPicked[i]["id"] === notPickedR_6[index]["id"]){
          if(record_6_NotPicked[i]["count"]){
            count = record_6_NotPicked[i]["count"] + 1
            tempNotPickedArray = tempNotPickedArray.filter(aurorian => aurorian.id !== record_6_NotPicked[i]["id"])
          }
        }
      }

      const counterRecordNotPicked = {...notPickedR_6[index], "count": count};

      setRecord_6_NotPicked([...tempNotPickedArray, counterRecordNotPicked]);

      return notPickedR_6[index];
      // setResultArray([...resultArray, notPickedR_6[index]]);

      // console.log("픽뚫뽑기", notPickedR_6[index]);
      // console.log("결과어레이",resultArray);
      // console.log("결과픽뚫",record_6_NotPicked);
    }
  }

  const getRarity_5_Result = () => {
    const R_5_Length = picked_5_Aurorians.length;
    const result = Math.random()
    let pickUpOdds = 0.5;
    if(R_5_Length === 1){
      pickUpOdds = 0.5;
    }else if(R_5_Length === 2){
      pickUpOdds = 0.5;
    }else{
      pickUpOdds = 0;
    }
    if(result < pickUpOdds){
      const index = getRandomInt(0, R_5_Length)

      return picked_5_Aurorians[index];
      // setResultArray([...resultArray, picked_5_Aurorians[index]])
    }else{
      const notPickedR_5 = activeAurorianArray.filter(aurorian => aurorian.rarity === 5);
      const index = getRandomInt(0, notPickedR_5.length);
      return notPickedR_5[index];
      // setResultArray([...resultArray, notPickedR_5[index]]);
    }
  }

  const getRarity_4_Result = () => {
    const notPickedR_4 = activeAurorianArray.filter(aurorian => aurorian.rarity === 4);
    const index = getRandomInt(0, notPickedR_4.length);
    return notPickedR_4[index];
    // setResultArray([...resultArray, notPickedR_4[index]]);
  }

  const getRarity_3_Result = () => {
    const notPickedR_3 = activeAurorianArray.filter(aurorian => aurorian.rarity === 3);
    const index = getRandomInt(0, notPickedR_3.length);
    return notPickedR_3[index]
    // setResultArray([...resultArray, notPickedR_3[index]]);
  }

  const doRecruiting = () => {
    const rarity = getRecruitRarity();
    if(rarity === 6) {
      setUnluckyStack(0);
      setRecruitCount(recruitCount+1);
      return getRarity_6_Result();
    }else if(rarity === 5) {
      setUnluckyStack(unluckyStack+1);
      setRecruitCount(recruitCount+1);
      return getRarity_5_Result();
    }else if(rarity === 4){
      setUnluckyStack(unluckyStack+1);
      setRecruitCount(recruitCount+1);
      return getRarity_4_Result();
    }else if(rarity === 3){
      setUnluckyStack(unluckyStack+1);
      setRecruitCount(recruitCount+1);
      return getRarity_3_Result();
    }else{
      return console.log("rarity value error");
    }
  }
  
  const getRecruiting_10 = (tempUnluckyStack, tempRecruitCount, tempFirst_5, tempRecord_6_Picked, tempRecord_6_NotPicked) => {
    const rarity = getRecruitRarity_10(tempUnluckyStack, tempRecruitCount, tempFirst_5);
    let _tempUnluckyStack = tempUnluckyStack;
    let _tempFirst_5 = tempFirst_5;
    if(rarity === 6) {
      _tempUnluckyStack = 0;
      const tempResultArray = getRarity_6_Result_10(tempRecord_6_Picked, tempRecord_6_NotPicked);
      return [tempResultArray[0], _tempUnluckyStack, _tempFirst_5, tempResultArray[1], tempResultArray[2]]
    }else if(rarity === 5) {
      _tempUnluckyStack += 1;
      _tempFirst_5 = false;
      return [getRarity_5_Result(), _tempUnluckyStack, _tempFirst_5];
    }else if(rarity === 4){
      _tempUnluckyStack += 1;
      return [getRarity_4_Result(), _tempUnluckyStack, _tempFirst_5]
    }else if(rarity === 3){
      _tempUnluckyStack += 1;
      return [getRarity_3_Result(), _tempUnluckyStack, _tempFirst_5]
    }else{
      return console.log("rarity value error");
    }
  }

  const doRecruiting_10 =() => {
    let tempArray = [];
    let tempRecruitCount = recruitCount;
    let tempUnluckyStack = unluckyStack;
    let tempFirst_5 = first_5_Rarity;
    let tempRecord_6_Picked = record_6_Picked;
    let tempRecord_6_NotPicked = record_6_NotPicked;
    // console.log("inif5", tempFirst_5);
    for(let i = 0; i < 10; i++){
      const Array = getRecruiting_10(tempUnluckyStack, tempRecruitCount, tempFirst_5, tempRecord_6_Picked, tempRecord_6_NotPicked);
      tempArray.push(Array[0]);
      tempUnluckyStack = Array[1];
      tempRecruitCount += 1;
      if(Array[2] === false){
        tempFirst_5 = Array[2]
      }
      if(typeof Array[3] !== 'undefined'){
        tempRecord_6_Picked = Array[3];
      }
      if(typeof Array[4] !== 'undefined'){
        tempRecord_6_NotPicked = Array[4];
      }
    }
    setResultArray(tempArray);
    setRecruitCount(tempRecruitCount);
    setUnluckyStack(tempUnluckyStack);
    setRecord_6_Picked(tempRecord_6_Picked);
    setRecord_6_NotPicked(tempRecord_6_NotPicked);
  }

  const doRecruiting_1 = () => {
    setResultArray([doRecruiting()]);
  }
  
  const handleReset = () => {
    setResultArray([]);
    setUnluckyStack(0);
    setRecruitCount(0);
    setFirst_5_Rarity(true);
    setRecord_6_Picked([]);
    setRecord_6_NotPicked([]);
    setOddsUp(0);
  }

   // useEffect
  useEffect(() => { 
    const resAurorianArray = (data) => {
      setAurorianArray(data);
      setLoading(false);
    }

    const resRecruitsArray = (data) => {
      setRecruitsArray(data);
      // setActiveRecruit(data[0]);
    }
    axios.get(BackendUrl+"/api/recruits/")
      .then(response => resRecruitsArray(response.data))
      .catch(error => console.log(error));
    axios.get(BackendUrl+"/api/characters/")
      .then(response => resAurorianArray(response.data))
      .catch(error => console.log(error));

    const token_id = window.sessionStorage.getItem('token_id')
    if(token_id){
      axios.get(BackendUrl+'/accounts/owned_char/', {
        headers: {
          'Authorization': token_id}
        })
        .then(res => setUser(
          {
            email: res.data.email,
            owned_char: JSON.parse(res.data.owned_char)
          })) 
    }else{
      setUser({
          email: "",
          fav_char: [],
          owned_char: [],
        })
    }
  }, [])

  useEffect(() => {
    if(unluckyStack > 50){
      setOddsUp((unluckyStack-50)*2.5)
    }else if(unluckyStack < 11){
      setOddsUp(0);
    }
  },[unluckyStack])


  useEffect(() => {
    if(!activeRecruit){
      setActiveRecruit(recruitsArray[0]);
    }
    if(activeRecruit){
      const R_6_Array = JSON.parse(activeRecruit.rarity_6_pickup);
      const R_5_Array = JSON.parse(activeRecruit.rarity_5_pickup);
      const notIncludeArray = JSON.parse(activeRecruit.char_id_not_included);
      const R_6_Length = R_6_Array.length;
      const R_5_Length = R_5_Array.length;
      let temp_R_6_PickArray = [];
      let temp_R_5_PickArray = [];
      if(R_6_Length > 0){
        for(let i=0; i < R_6_Length; i++){
          temp_R_6_PickArray.push(aurorianArray.find(aurorian => aurorian.id == R_6_Array[i]));
        }
      }      
      if(R_5_Length > 0){
        for(let i=0; i < R_5_Length; i++){
          temp_R_5_PickArray.push(aurorianArray.find(aurorian => aurorian.id == R_5_Array[i]));
        }
      }
      setPicked_6_Aurorians(temp_R_6_PickArray);
      setPicked_5_Aurorians(temp_R_5_PickArray);
      setActiveAurorianArray(aurorianArray.filter(aurorian => !(notIncludeArray.includes(aurorian.id)))
      .filter(aurorian=>!(R_6_Array.includes(aurorian.id))).filter(aurorian=>!(R_5_Array.includes(aurorian.id))))
      
      setLoading(false);
    }
  },[activeRecruit, loading])

  const PickUpView = () => { 
    const Rarity_6_Icon = () => {
      if(picked_6_Aurorians[0]){
        return(
          <React.Fragment>
          {picked_6_Aurorians.map(aurorian =>
            <Image onClick={() => goAurorianPage(aurorian.id)} key={aurorian.id} unoptimized="true" width="70" height="70" src={aurorian.icon} alt="아이콘"></Image>
            )}
          </React.Fragment>
        )
      }else{
        return null;
      }
    }
    const Rarity_5_Icon = () => {
      if(picked_5_Aurorians[0]){
        return(
          <React.Fragment>
          {picked_5_Aurorians.map(aurorian =>
            <Image onClick={() => goAurorianPage(aurorian.id)} key={aurorian.id} unoptimized="true" width="70" height="70" src={aurorian.icon} alt="아이콘"></Image>
            )}
          </React.Fragment>
        )
      }else{
        return null;
      }
    }
    return(
      <div className="recruit-picked-row">
        확률 UP 오로리안 / 현재 데이터 부족으로 3, 4성은 풀이 한정 되어 있습니다.
        <br></br>
        <Image unoptimized="true" width="45" height="70" src="/SearchChar/ButtonIcons/6star.png" alt="6성"></Image>
        <Rarity_6_Icon></Rarity_6_Icon>
        {" "}
        <Image unoptimized="true" width="45" height="70" src="/SearchChar/ButtonIcons/5star.png" alt="5성"></Image>
        <Rarity_5_Icon></Rarity_5_Icon>
        <Button onClick={onButtonClick} className="recruit-result-download-btn">결과<br></br>다운로드</Button>
      </div>
    )
  }
  
  const goAurorianPage = (aurorianId) => {
    router.push({
      pathname: '/CharacterList/[charaterInfo]',
      query: { charaterInfo: aurorianId },
    })
  }

  if(loading){
    return(
      <div className="loading-div">loading</div>
    )
  }else{
    return(
      <div className="layout-div">
        <Head>
        <title>백야극광 오로리안 검색기</title>
        </Head>
        <Header user={user} setUser={setUser}></Header>
        <Container className="recruit-banner-container">
          <BannerGroup recruitsArray={recruitsArray} setActiveRecruit={setActiveRecruit}></BannerGroup>
          <div className="recruit-picked-row" ref={resultToPngRef}>
          <PickUpView></PickUpView>
          <div className="recruit-picked-row">
            <Button onClick={()=>doRecruiting_1()} className="recruit-recruiting-btn">1회 소집</Button>
            <Button onClick={()=>doRecruiting_10()} className="recruit-recruiting-btn">10회 소집</Button>
          </div>
          <Row className="recruit-result-row">
            <Col xs={6} lg={6}>
            {resultArray.slice(0,5).map((aurorian, index) =>
            <Row key={index}>
              <Col xs={4} lg={4} className="recruit-result-row-col">
                <Image onClick={() => goAurorianPage(aurorian.id)} unoptimized="true" width="80" height="80" src={aurorian.icon} alt="아이콘"></Image>
              </Col>
              <Col xs={8} lg={8} className="recruit-result-row-col">
              <div className="recruit-result-row-div-div">레어도: {aurorian.rarity}☆<br></br>이름: {aurorian.name}<br></br>
                속성: <Image unoptimized="true" width="20" height="20" src={aurorian.main_attribute.icon} alt="아이콘"></Image> {" "}
                클래스: <Image unoptimized="true" width="20" height="20" src={aurorian.char_class.icon} alt="아이콘"></Image> </div>
              </Col>
            </Row>
            )}
            </Col>
            <Col xs={6} lg={6}>
            {resultArray.slice(5,10).map((aurorian, index) =>
            <Row key={index}>
              <Col xs={4} lg={4} className="recruit-result-row-col">
                <Image onClick={() => goAurorianPage(aurorian.id)} unoptimized="true" width="80" height="80" src={aurorian.icon} alt="아이콘"></Image>
              </Col>
              <Col xs={8} lg={8} className="recruit-result-row-col">
              <div className="recruit-result-row-div-div">레어도: {aurorian.rarity}☆<br></br>이름: {aurorian.name}<br></br>
                속성: <Image unoptimized="true" width="20" height="20" src={aurorian.main_attribute.icon} alt="아이콘"></Image> {" "}
                클래스: <Image unoptimized="true" width="20" height="20" src={aurorian.char_class.icon} alt="아이콘"></Image> </div>
              </Col>
            </Row>
            )}
            </Col>
          </Row>
          <div className="recruit-picked-row">6성 확률: {2 + oddsUp}% / 루맘버: {300 * recruitCount} / KRW: {Math.round(300 * recruitCount * 8.8148)} / 소집: {recruitCount} / 스택: {unluckyStack}
            <Button className="recruit-result-reset-btn" onClick={()=>handleReset()}>리셋</Button> </div>
          <Row className="recruit-result-row">
            <Col xs={4} lg={4} className="recruit-result-row-record-col">
            {record_6_Picked.map((aurorian, index) =>
              <div className="recruit-result-row-record-bottom" key={index}>
              <Image onClick={() => goAurorianPage(aurorian.id)} unoptimized="true" width="90" height="90" src={aurorian.icon} alt="아이콘"></Image>
              <span className="recruit-result-row-record-left-span"> X {aurorian.count} </span>
              </div>
            )}
            </Col>
            <Col xs={8} lg={8} className="recruit-result-row-record-col">
            {record_6_NotPicked.map((aurorian, index) =>
            <div className="recruit-result-row-record-bottom" key={index}>
                <Image onClick={() => goAurorianPage(aurorian.id)} unoptimized="true" width="70" height="70" src={aurorian.icon} alt="아이콘"></Image>
              <span className="recruit-result-row-record-bottom-span"> X {aurorian.count} </span>
            </div>
            )}
            </Col>
          </Row>
          </div>
        </Container>
      </div>
    )
  }
}

export default RecruitSimulator;