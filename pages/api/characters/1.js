export default function handler(req, res) {
  res.status(200).json(
  {
  id: "1",
  name: "미자드",
  icon: "",
  rarity: "6",
  main_attribute: "forest",
  sub_attribute: "forest",
  class: "sniper",
  chain_skill: {
    name: "성큰 스파인",
    first: {
      tiles : "4",
      damage : "165%",
      area : "2 circle",
      area_type : "circle",
      text : "주변 2서클 내의 적 3체에 165 %의 데미지를 준다",
    },
    second: {
      tiles : "8",
      damage : "170%",
      area : "3 circle",
      area_type : "circle",
      text : "주변 3서클 내의 적 3체에 170 %의 데미지를 준다",
    },
    third: {
      tiles : "13",
      damage : "180%",
      area : "3 circle",
      area_type : "circle",
      text : "주변 3서클 내의 적 3체에 180 %의 데미지를 준다",
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
  voice: "우에사카 스미레",
  birthday: "",
  sex: "",
  height:"",
  }
  )
}