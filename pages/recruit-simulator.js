
import { object } from 'prop-types';
import React, {useState, useEffect} from 'react';
import OptionButtons from './OptionButtons/OptionButtons';
import CharacterList from './CharacterList/CharacterList';
import { Container, Row, InputGroup, FormControl, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Head from 'next/head';
import axios from 'axios';
import { BackendUrl } from '../components/BackendUrl';


const RecruitSimulator = () => {
  const [loading ,setLoading] = useState(true);
  const [recruitsArray, setRecruitsArray] = userState([]);
  const [activeBanner, setActiveBanner] = useState(null);
  const [aurorianArray, setAurorianArray] = useState([]);

  // const recruitsArrayProp = {
  //   id : "int",
  //   name : "string",
  //   char_id_not_include : "[int or ints]",
  //   rarity_5_Array: "[int or ints]",
  //   rarity_6_Array: "[int or ints]"
  //  }
   // useEffect
  useEffect(() => { 
    const resAurorianArray = (data) => {
      setAurorianArray(data);
      setLoading(false);
    }
    axios.get(BackendUrl+"/api/recruits/")
      .then(response => setRecruitsArray(response.data))
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
  
  const BannerGroup = ({bannerImageArray}) => {
    // Banner compo start
    const Banner = (bannerImage) => {
      return(
        <Image width="300" hegiht="150" src={bannerImage}></Image>
      )
    }
    // Banner commpo end

    }
    return(
      <div>
      {bannerImageArray.map(banner => 
      <Banner bannerImage={banner}></Banner>
      )}
      </div>
    )    
  }

  const Recuriting = () => {

  }

  const OnePickUpRecuriting = ({aurorianArray}) => {
    const [ rarity_6_Array , setRarity_6_Array ] = useState([])
    const [ rarity_5_Array , setRarity_5_Array ] = useState([])
    const [ rarity_4_Array , setRarity_4_Array ] = useState([])
    const [ rarity_3_Array , setRarity_3_Array ] = useState([])

    // useEffect setting rarity Arrays
    useEffect(() => {
      const rarity_6_Filter = (aurorian) => {
        if(aurorian.rarity == 6){
          return aurorian
        }}
      const rarity_5_Filter = (aurorian) => {
        if(aurorian.rarity == 5){
          return aurorian
        }}
      const rarity_4_Filter = (aurorian) => {
        if(aurorian.rarity == 4){
          return aurorian
        }}
      const rarity_3_Filter = (aurorian) => {
        if(aurorian.rarity == 3){
          return aurorian
        }}

      const getRarity_6_Array = (List) => { return List.filter(rarity_6_Filter)}
      const getRarity_5_Array = (List) => { return List.filter(rarity_5_Filter)}
      const getRarity_4_Array = (List) => { return List.filter(rarity_4_Filter)}
      const getRarity_3_Array = (List) => { return List.filter(rarity_3_Filter)}
  
      setRarity_6_Array(getRarity_6_Array(aurorianArray));
      setRarity_5_Array(getRarity_5_Array(aurorianArray));
      setRarity_4_Array(getRarity_4_Array(aurorianArray));
      setRarity_3_Array(getRarity_3_Array(aurorianArray));

    },[aurorianArray])

    // useEffect setting rarity Arrays end

    const GetRecruitRarity = () => {
      const result = Math.floor(Math.random() * 100)
      if(result < 5){
        return 6
      }else if(result > 5 && result < 14){
        return 5
      }else if(result > 14 && result < 44){
        return 4
      }else{
        return 3
      }
    }
    return(
      <div>
      </div>
    )
  }

  const TwoPickUpRecuriting = ({aurorianArray}) => {

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
        <Container>
          <div>
            배너 * 6
          </div>
          <div>픽업픽업픽업</div>
          <div>소환버튼1회 // 소환버튼10회</div>
          <div>결과</div>
          <div>현재확률</div>
          <div>사용루마법, krw</div>
          <div>reset</div>
          <div>픽업 비픽업 6성</div>
          {/* <div>
            시뮬레이터
          </div> */}        
        </Container>
      </div>
    )
  }



export default RecruitSimulator;