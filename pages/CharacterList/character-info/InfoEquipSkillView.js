import React, {useEffect, useState} from 'react';
import EquipSkillView from "./EquipSkillView";

const InfoEquipSkillView = ({skill, ascension}) => {
  if((!skill) || (!ascension)){
    return null;
  }
  if((skill) && (ascension)){
    
    const asc_count = parseInt(ascension[4]);
    
    let _skill = null;

    search_skill :
    for(let i = asc_count; i > -1; i--) {
      const suffix = 'asc'+i+'_';
      const check_enhance = suffix+"enhance"
      if(skill[check_enhance] == true){
        const lv1_text = skill[suffix+"lv1_text"];
        const lv3_text = skill[suffix+"lv3_text"];
        const lv6_text = skill[suffix+"lv6_text"];
        const lv10_text = skill[suffix+"lv10_text"];
        _skill = {...skill, "lv1_text" : lv1_text, "lv3_text" : lv3_text, "lv6_text": lv6_text, "lv10_text": lv10_text};
        break search_skill
      }
    }

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