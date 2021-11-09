import React from 'react';
import ActiveSkillView from "./ActiveSkillView";

const InfoActiveSkillView = ({skill, ascension, breakthrough, char_brth, char_asc, rarity}) => {
  if((!skill) || (!ascension) || (!breakthrough)){
    return null;
  }
  if((skill) && (ascension) && (breakthrough)){
    const asc_count = parseInt(ascension[4]);
    const brth_count = parseInt(breakthrough[3]);

    let _text = "";
    // 스킬강화한돌단계 brth=breakingthrough
    let upg_sklv_brth_1;
    let upg_sklv_brth_2;

    if (rarity == '6'){
      upg_sklv_brth_1 = '3'; 
      upg_sklv_brth_2 = '6';
    }else if (rarity == '5'){
      upg_sklv_brth_1 = '2';
      upg_sklv_brth_2 = '5';
    }else if (rarity == '4'){
      upg_sklv_brth_1 = '4';
    }else if (rarity == '3'){
      upg_sklv_brth_1 = '3';
    }     

    if(brth_count >= upg_sklv_brth_1){
      if(skill.br1_up == true){
        _text += " / " + char_brth["count_"+upg_sklv_brth_1];
      }
    } 
    if(brth_count >= upg_sklv_brth_2){
      if(skill.br2_up == true){
        _text += " / " + char_brth["count_"+upg_sklv_brth_2];
      }
    }
    if(asc_count >= 2){
      if(skill.asc2_up == true){
        _text += " / " + char_asc.lv2;
      }
    }      
    if(asc_count == 3){
      if(skill.asc3_up == true){
        _text += " / " + char_asc.lv3;
      }
    }
    _text = skill.text + _text;
    const _skill = {...skill,"text": _text};

    return(
      <ActiveSkillView skill={_skill} rarity={rarity}></ActiveSkillView>
    )
  }
} 
export default InfoActiveSkillView;