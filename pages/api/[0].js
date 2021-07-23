const character =
{
  id: "0",
  name: "미자드",
  name_alphabet:"Migard",
  state: {
    atk: 3781,
    def: 1373,
    hp: 11135,
  },
  icon: "/SearchChar/CharacterImages/migard_icon.png",
  rarity: "6",
  main_attribute: {
    name:"forest",
    icon: "/SearchChar/ButtonIcons/forest-sm.png",
  },
  sub_attribute: {
    name: "fire",
    icon: "/SearchChar/ButtonIcons/fire-sm.png",
  },
  class: {
    name: "sniper",
    icon: "/SearchChar/ButtonIcons/sniper-sm.jpg",
  },
  faction: {
    name: "일루미나 연방",
    big_gift: "Mounted Spikepede +50",
    small_gift: "Pictorial Guide to Nature +5",
    icon: "/SearchChar/CharacterImages/migard_faction.png"
  },
  image: {
    ascension_0: "/SearchChar/CharacterImages/migard_asc0.png",
    ascension_3: "/SearchChar/CharacterImages/migard_asc3.png",
  },
  chain_skill: {
    name: "성큰 스파인",
    icon: "/SearchChar/CharacterImages/migard_chain_icon.png",
    first: {
      tiles : "4",
      damage : "165%",
      area : "2 circle",
      area_type : "circle",
      area_image : "/none",
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
    cooltime : "2",
    preemptive : "X",
    icon: "/SearchChar/CharacterImages/migard_active_icon.png",
    text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다.",
    asc_0: {
      br_0: {
        name: "스파인 소울",
        cooltime : "2",
        preemptive : "X",
        icon: "/SearchChar/CharacterImages/migard_active_icon.png",
        text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다.",
      },
      br_3:{
        name: "스파인 소울",
        cooltime : "2",
        preemptive : "O",
        icon: "/SearchChar/CharacterImages/migard_active_icon.png",
        text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다.",
      },
      br_6:{
        name: "스파인 소울",
        cooltime : "2",
        preemptive : "O",
        icon: "/SearchChar/CharacterImages/migard_active_icon.png",
        text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다. 대상 처치 시 액티브스킬을 재사용 할 수 있다(턴당 1회 한정).",
      },
    },
    asc_2:{
      br_0:{
        name: "스파인 소울",
        cooltime : "2",
        preemptive : "X",
        icon: "/SearchChar/CharacterImages/migard_active_icon.png",
        text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다. 적 1명을 처치할때마다 최종 피해가 15% 증가하며, 10회까지 누적 될 수 있다.",
      },
      br_3:{
        name: "스파인 소울",
        cooltime : "2",
        preemptive : "O",
        icon: "/SearchChar/CharacterImages/migard_active_icon.png",
        text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다. 적 1명을 처치할때마다 최종 피해가 15% 증가하며, 10회까지 누적 될 수 있다.",
      },
      br_6:{
        name: "스파인 소울",
        cooltime : "2",
        preemptive : "O",
        icon: "/SearchChar/CharacterImages/migard_active_icon.png",
        text: "주변 3서클 내 임의의 위치로 순간이동해 주변 1서클 내의 적에게 250%의 피해를 입히며, 범위 내에 적이 1명만 있을 경우, 피해가 2배 증가한다. 적 1명을 처치할때마다 최종 피해가 15% 증가하며, 10회까지 누적 될 수 있다. 대상 처치 시 액티브스킬을 재사용 할 수 있다(턴당 1회 한정)."
      },
    },
  },
  equip_skill: {
    name: "뼈 관통",
    icon: "/SearchChar/CharacterImages/migard_equip_icon.png", 
    lv1_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 60%에 해당하는 피해를 추가로 1회 입힌다.",
    lv3_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다.",
    lv6_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 25% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다.",
    lv10_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 30% 미만일 시 대상에게 공격력의 100%에 해당하는 피해를 추가로 1회 입힌다.",
    asc_3: {
      name: "뼈 관통",
      icon: "/SearchChar/CharacterImages/migard_equip_icon.png",
      lv1_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 60%에 해당하는 피해를 추가로 1회 입힌다. 추가 공격 후 대상의 HP가 미자드의 공격보다 낮을 경우 대상을 즉시 처치한다",
      lv3_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다. 추가 공격 후 대상의 HP가 미자드의 공격보다 낮을 경우 대상을 즉시 처치한다",
      lv6_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 25% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다. 추가 공격 후 대상의 HP가 미자드의 공격보다 낮을 경우 대상을 즉시 처치한다",
      lv10_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 30% 미만일 시 대상에게 공격력의 100%에 해당하는 피해를 추가로 1회 입힌다. 추가 공격 후 대상의 HP가 미자드의 공격보다 낮을 경우 대상을 즉시 처치한다",
    },
  },
  equipment:{
    name: "스파인 블레이드",
    image: "/SearchChar/CharacterImages/migard_equip_image.png",
    text: "This command saber is not only used for command and training troops, it is imbued with Migard's own unique Lumina. Thus, it emitted an eerie glow that melts all adversaries who come into contact.",
    lv1_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 60%에 해당하는 피해를 추가로 1회 입힌다.",
    lv3_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다.",
    lv6_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 25% 미만일 시 대상에게 공격력의 80%에 해당하는 피해를 추가로 1회 입힌다.",
    lv10_text: "연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 30% 미만일 시 대상에게 공격력의 100%에 해당하는 피해를 추가로 1회 입힌다.",
    lv1_state_text: "공격력+30, 방어력+10, HP+50, 유리한 속성 데미지 3%",
    lv2_state_text: "공격력+60, 방어력+20, HP+100, 유리한 속성 데미지 7%",
    lv4_state_text: "공격력+90, 방어력+30, HP+200, 유리한 속성 데미지 11%",
    lv5_state_text: "공격력+120, 방어력+40, HP+300, 유리한 속성 데미지 15%",
    lv7_state_text: "공격력+170, 방어력+55, HP+450, 유리한 속성 데미지 20%",
    lv8_state_text: "공격력+220, 방어력+70, HP+600, 유리한 속성 데미지 25%",
    lv9_state_text: "공격력+270, 방어력+85, HP+750, 유리한 속성 데미지 30%",
  },
  breakthrough: {
    count_1: "HP increased by 300.",
    count_2: "DEF increased by 40.",
    count_3: "Active Skill Enhancement: Changes Active Skill to Preemptive Strike. Available upon entering combat.",
    count_4: "Increased by 300+5%Basic max HP.",
    count_5: "Increased by 40+5%Basic DEF.",
    count_6: "Active Skill Enhancement: Removes Active Skill cooldown if the target is killed with the skill (can only be triggered once in each round).",
  },
  
  ascension: {
    lv1: "장비스킬 개방:  연쇄 스킬 또는 액티브 스킬 시전 후 대상의 HP가 20% 미만일 시 대상에게 공격력의 60%에 해당하는 피해를 추가로 1회 입힌다.",
    lv2: "액티브스킬 강화:  적 1명을 처치할때마다 최종 피해가 15% 증가하며, 10회까지 누적 될 수 있다.",
    lv3: "장비스킬 강화:  추가 공격 후 대상의 HP가 미자드의 공격보다 낮을 경우 대상을 즉시 처치한다",
  },
  porsonality: {
    name: "Into Esoterica",
    big_gift: "Crystal Spine +50",
    small_gift: "Guide to Applied Science +5"
  },
  file:{
    name: "미자드",
    nickname: "성큰 스파인",
    gender: "여",
    height: "183cm",
    birthday: "1월 30일",
    birthplace: "자난 성",
    element: "숲",
    affilition: "일루미나 연방",
    fighting_style: "스파인 블레이드, 성큰 스파인"
  },
  voice: "우에사카 스미레",
}
export default function handler(req, res,) {
  res.status(200).json(character)
}