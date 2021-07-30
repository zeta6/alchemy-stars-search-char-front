import React from 'react';
import ChainSkillView from "./ChainSkillView";

const InfoChainSkillView = ({skill, ascension, breakthrough, char_brth, char_asc, rarity}) => {
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
      upg_sklv_brth_1 = '3' 
      upg_sklv_brth_2 = '6'
      console.log('rari',rarity);
    }else if (rarity == '5'){
      upg_sklv_brth_1 = '2' 
      upg_sklv_brth_2 = '5'
      console.log('rari',rarity);
    }else if (rarity == '4'){
      upg_skil_brth1 = '4'
    }else if (rarity == '3'){
      upg_skil_brth1 = '3'
    }     

    console.log("brth", brth_count);
    console.log('upg1',upg_sklv_brth_1);

    if(brth_count >= upg_sklv_brth_1){
      if(skill.br1_up == true){
        _text += " / " + char_brth["count_"+upg_sklv_brth_1];
        console.log('text',_text);
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
    const _skill = {...skill, "lv1_text": skill.lv1_text + _text,
    "lv2_text": skill.lv2_text + _text, "lv3_text": skill.lv3_text + _text
    };

    return(
      <ChainSkillView skill={_skill}></ChainSkillView>
    )
  } 
}
export default InfoChainSkillView;