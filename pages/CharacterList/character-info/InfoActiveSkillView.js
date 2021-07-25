import React, {useEffect, useState} from 'react';
import ActiveSkillView from "./ActiveSkillView";

const InfoActiveSkillView = ({skill, ascension, breakthrough}) => {
  if((!skill) || (!ascension) || (!breakthrough)){
    return null;
  }
  if((skill) && (ascension) && (breakthrough)){
    
    const asc_count = parseInt(ascension[4]);
    const brth_count = parseInt(breakthrough[3]);

    let _skill = null;
  
    search_skill :
    for(let i = asc_count; i > -1; i--) {
      for(let y = brth_count; y > -1; y--){
        const suffix = 'asc'+i+'_br'+y+'_';
        const check_use = suffix+"use";
        if(skill[check_use] == "true"){
          const cooltime = skill[suffix+"cooltime"];
          const preemptive = skill[suffix+"preemptive"];
          const text = skill[suffix+"text"];
          _skill = {...skill, "cooltime" : cooltime, "preemptive" : preemptive, "text": text}
          break search_skill
        }
      }
    }

    if(_skill == null){
      return(
        <ActiveSkillView skill={skill}></ActiveSkillView>
      )
    }else{
      return(
        <ActiveSkillView skill={_skill}></ActiveSkillView>
      )
    }
  } 
}
export default InfoActiveSkillView;