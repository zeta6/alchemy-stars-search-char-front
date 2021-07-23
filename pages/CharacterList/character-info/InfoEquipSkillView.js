import React, {useEffect, useState} from 'react';
import EquipSkillView from "./EquipSkillView";

const InfoEquipSkillView = ({skill, ascension}) => {
  if((!skill) || (!ascension)){
    return null;
  }
  if((skill) && (ascension)){
    
    const asc_count = parseInt(ascension[4]);
    
    console.log('cou', asc_count);

    let _skill = null;

    for(let i = asc_count; i > -1; i--) {
      const asc = "asc_" + i;
      if(skill[asc]){
        console.log(asc);
        _skill = skill[asc]; 
        break
      }
    }

    console.log("skill", _skill);
    if(_skill == null){
      return(
        <EquipSkillView skill={skill}></EquipSkillView>
      )
    }else{
      return(
        <EquipSkillView skill={_skill}></EquipSkillView>
      )
    }
  } 
}
export default InfoEquipSkillView;