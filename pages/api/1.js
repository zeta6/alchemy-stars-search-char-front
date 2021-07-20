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
    name: "스파인 소울",
    text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다.",
    type: {
      damage : "true",
      heal : "false",
      tile_change: "false",
      teleport: "true",
    },
  },
  equip_skill: {
    name: "뼈 관통",
    lv1_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 60%에 해당하는 피해를 추가로 1회 입힌다.",
    lv3_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다.",
    lv6_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 25% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다.",
    lv10_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 30% 미만일 시 대상에게 공격력의 100%에 해당하는 피해를 추가로 1회 입힌다.",
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
  )
}