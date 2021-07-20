const CharacterState =
{
  id: "3333",
  name: "",
  icon: "",
  rarity: "",
  main_attribute: "",
  sub_attribute: "",
  class: "",
  chain_skill: {
    name: "",
    first: {
      tiles : "",
      damage : "",
      area : "",
      area_type : "",
      text : "",
    },
    second: {
      tiles : "",
      damage : "",
      area : "",
      area_type : "",
      text : "",
    },
    third: {
      tiles : "",
      damage : "",
      area : "",
      area_type : "",
      text : "",
    },
  },
  active_skill: {
    name: "",
    text: "",
    type: {},
  },
  equip_skill: {
    name: "",
    text: "",
    type: {},
  },
  breakthrough: {
    first:{},
    second:{},
    third:{},
    fourth:{},
    fifth:{},
    sixth:{},
  },
  faction: "",
  porsonality: "",    
  voice: {
    japan : ""
  },
  birthday: "",
  sex: "",
  height:"",
}

export default CharacterState;