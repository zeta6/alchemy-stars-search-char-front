import React, {useEffect, useState} from 'react';
import ActiveSkillView from "./ActiveSkillView";

const InfoActiveSkillView = ({skill, ascension, breakthrough}) => {
  if((!skill) || (!ascension) || (!breakthrough)){
    return null;
  }
  if((skill) && (ascension) && (breakthrough)){
    
    const asc_count = parseInt(ascension[4]);
    const brth_count = parseInt(breakthrough[3]);

    console.log('count', asc_count, brth_count)

    let _ascension = null;
    let _skill = null;

    for(let i = asc_count; i > -1; i--) {
      const asc = "asc_" + i;
      if(skill[asc]){
        console.log(asc);
        _ascension = skill[asc]; 
        break
      }
    }

    if (_ascension){
      for(let i = brth_count; i > -1; i--){
        const brth = "br_" + i;
        if(_ascension[brth]){
          console.log(brth)
          _skill = _ascension[brth]
          break
        }
      }
    }

    // console.log('assss', _ascension);
    // console.log('skill', _skill);

    return(
      <ActiveSkillView skill={_skill}></ActiveSkillView>
    )

  } 
}
export default InfoActiveSkillView;