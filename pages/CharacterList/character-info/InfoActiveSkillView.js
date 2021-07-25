import React, {useEffect, useState} from 'react';
import ActiveSkillView from "./ActiveSkillView";

const InfoActiveSkillView = ({skill, ascension, breakthrough}) => {
  if((!skill.name) || (!ascension) || (!breakthrough)){
    return null;
  }
  if((skill.name) && (ascension) && (breakthrough)){
    
    let asc_count = parseInt(ascension[4]);
    const brth_count = parseInt(breakthrough[3]);

    if(asc_count == 1){
      asc_count = 0;
    }

    let _skill = null;
    const suffix = "asc"+asc_count+"_";
    if(brth_count >= skill["brth_skill_2_br"]){
      const _suffix = suffix + "brth_skill_2_"
      const cooltime = skill[_suffix+"cooltime"];
      const preemptive = skill[_suffix+"preemptive"];
      const text = skill[_suffix+"text"];
      _skill = {...skill, "cooltime" : cooltime, "preemptive" : preemptive, "text": text};
    }else if(brth_count >= skill["brth_skill_1_br"]){
      const _suffix = suffix + "brth_skill_1_"
      const cooltime = skill[_suffix+"cooltime"];
      const preemptive = skill[_suffix+"preemptive"];
      const text = skill[_suffix+"text"];
      _skill = {...skill, "cooltime" : cooltime, "preemptive" : preemptive, "text": text};      
    }else if(suffix != "asc0_"){
      const _suffix = suffix + "brth_skill_0_";
      const cooltime = skill[_suffix+"cooltime"];
      const preemptive = skill[_suffix+"preemptive"];
      const text = skill[_suffix+"text"];
      _skill = {...skill, "cooltime" : cooltime, "preemptive" : preemptive, "text": text};
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