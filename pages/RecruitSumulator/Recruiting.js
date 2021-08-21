import { useState, useEffect } from "react";

const Recruiting = ({activeBanner}) => {
  // const [loading , setLoading] = useState(true);
  // const [rarity_5_PickupNum, setRarity_5_PickupNum] = useState(null);
  // const [rarity_6_PickupNum, setRarity_6_PickupNum] = useState(null);
  // const [rarity_5_PickupId, setRarity_5_PickupId] = useState([]);
  // const [rarity_6_PickupId, setRarity_6_PickupId] = useState([]);
  
  // const [charIdNotInclude, setCharIdNotInclude] = useState([]);

  // // activeBanner = {
  // //   id : "int",
  // //   name : "string",
  // //   char_id_not_include : "[int or ints]",
  // //   rarity_5_Array: "[int or ints]",
  // //   rarity_6_Array: "[int or ints]"
  // //  }
  // useEffect(() => {
  //   if(activeBanner){
  //     if(activeBanner.rarity_6_Array.length == 0){
  //       setRarity_6_PickupNum(0);
  //       setRarity_5_PickupNum(0);
  //     }else if(activeBanner.rarity_6_Array.length == 1){
  //       setRarity_6_PickupNum(1);
  //       if(activeBanner.rarity_5_Array.length == 0){
  //         setRarity_5_PickupNum(0);
  //       }else if(activeBanner.rarity_5_Array.length == 1){
  //         setRarity_5_PickupNum(1);
  //       }else if(activeBanner.rarity_5_Array.length == 2){
  //         setRarity_5_PickupNum(2);
  //       }else{
  //         console.log("5성 Array.length 에러")
  //       }
  //     }else if(activeBanner.raritgy_6_Array.length == 2){
  //       setRarity_6_PickupNum(2);
  //       if(activeBanner.rarity_5_Array.length == 0){
  //         setRarity_5_PickupNum(0);
  //       }else if(activeBanner.rarity_5_Array.length == 1){
  //         setRarity_5_PickupNum(1);
  //       }else if(activeBanner.rarity_5_Array.length == 2){
  //         setRarity_5_PickupNum(2);
  //       }else{
  //         console.log("5성 Array.length 에러")
  //       }
  //     }else{
  //       console.log("6성 Array.length 에러")
  //   }
  //   setCharIdNotInclude(activeBanner.char_id_not_include);
  //   setRarity_5_PickupId(activeBanner.rarity_5_Array);
  //   setRarity_6_PickupId(activeBanner.rarity_6_Array);
  //   setLoading(false);
  //   }
  // },[activeBanner])

  // const Recruiting_6_0 = ({aurorianArray, charIdNotInclude}) => { 
  //   const [ rarity_6_Array , setRarity_6_Array ] = useState([]);
  //   const [ rarity_5_Array , setRarity_5_Array ] = useState([]);
  //   const [ rarity_4_Array , setRarity_4_Array ] = useState([]);
  //   const [ rarity_3_Array , setRarity_3_Array ] = useState([]);
  //   const [ recruitTotal , setRecruitTotal] = useState(0);
  //   const [ spentTotal , setSpentTotal] = useState(0);
  //   const [ recruitResultArray , setRecruitResult ] = useState([]);

  //   // useEffect setting rarity Arrays
  //   useEffect(() => {
  //     const rarity_6_Filter = (aurorian) => {
  //       if(aurorian.rarity == 6){
  //         return aurorian
  //       }}
  //     const rarity_5_Filter = (aurorian) => {
  //       if(aurorian.rarity == 5){
  //         return aurorian
  //       }}
  //     const rarity_4_Filter = (aurorian) => {
  //       if(aurorian.rarity == 4){
  //         return aurorian
  //       }}
  //     const rarity_3_Filter = (aurorian) => {
  //       if(aurorian.rarity == 3){
  //         return aurorian
  //       }}
  //     const NotIncludeFilter = (aurorian) => {
  //       if(!(charIdNotInclude.includes(aurorian.id))){
  //         return aurorian
  //       }
  //     }

  //     const getRarity_6_Array = (List) => { return List.filter(rarity_6_Filter).filter(NotIncludeFilter)}
  //     const getRarity_5_Array = (List) => { return List.filter(rarity_5_Filter).filter(NotIncludeFilter)}
  //     const getRarity_4_Array = (List) => { return List.filter(rarity_4_Filter).filter(NotIncludeFilter)}
  //     const getRarity_3_Array = (List) => { return List.filter(rarity_3_Filter)}
  
  //     setRarity_6_Array(getRarity_6_Array(aurorianArray));
  //     setRarity_5_Array(getRarity_5_Array(aurorianArray));
  //     setRarity_4_Array(getRarity_4_Array(aurorianArray));
  //     setRarity_3_Array(getRarity_3_Array(aurorianArray));

  //   },[aurorianArray])

  //   return(
  //     <div>
  //       1소환  // 10소환
  //     </div>
  //   )
  // }

  // const Recruiting_6_1 = ({rarity_5_PickupNum}) => {
  //   const Recruiting_5_0 = () => {
  //   }
  //   const Recruiting_5_1 = () => {
  //   }
  //   const Recruiting_5_2 = () => {
  //   }
  // }



  // const Recruiting6_2 = ({rarity_5_PickupNum}) => {
  //   const Recruiting_5_0 = () => {
  //   }
  //   const Recruiting_5_1 = () => {
  //   }
  //   const Recruiting_5_2 = () => {
  //   }
  // }

  // if(loading){
  //   return (
  //     <div className="loading-div">loading</div>
  //   )
  // }else{

  // }

  return(
    "리쿠르팅"
  )
}


export default Recruiting;