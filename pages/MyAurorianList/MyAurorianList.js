import React, {useEffect, useState} from 'react';
import { Table, ButtonGroup, Button, Row, ButtonToolbar, DropdownButton, Dropdown, Container, Col} from 'react-bootstrap';
import axios from 'axios';
import { BackendUrl } from '../../components/BackendUrl'
import Image from "next/image";

const PageButton = ({page, setSliceStart, currentPage, charPerPage}) => {
  if(page == currentPage){ 
  return(
    <Button size="lg" variant="dark" onClick={() => setSliceStart((page-1) * charPerPage)}>{page}</Button>  
  )} else{
    return(
    <Button size="lg" variant="secondary" onClick={() => setSliceStart((page-1) * charPerPage)}>{page}</Button>
  )}
};

const MyAurorianList = ({options, user, setUser}) => {
  const [characterList, setCharacterList] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [sliceStart, setSliceStart] = useState(0);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState(null);
  const [charPerPage, setCharPerPage] = useState(20);
  const [filterByFav, setFilterByFav] = useState(false);
  const [selectedAurorian, setSelectedAurorian] = useState(null)
  let s_aurorian;

// useEffect start
  useEffect(() => {
    const setData = (data) => {
      setPages(Array((parseInt(data.length / 20) + 1))
      .fill(1).map((x,y) => x + y ));
      setLoading(false);
    }
    axios.get(BackendUrl+"/api/characters/")
      .then(response => setData(response.data)) 
      .catch(error => console.log(error));
},[]
  );

  useEffect(() => { 
    // filter start
    const characterFilter = (character) => {
      if(character.name.indexOf(options.name) !== -1 || options.name.length == 0){
        if(options.rarity.includes(character.rarity) || options.rarity.length == 0){
          if(options.main_attribute.includes(character.main_attribute.name) || options.main_attribute.length == 0){
            if(options.sub_attribute.includes(character.sub_attribute.name) || options.sub_attribute.length == 0){
              if(options.class.includes(character.char_class.name) || options.class.length == 0){
                return character;
              }
            }
          }
        }
      }
    }

    const specialRoleFilter = (characterList) => {
      let _characterList = characterList;
      const teleportFilter = (character) => {
        if(character.special_role.teleport == true){
          return character;
        }
      }
      const healFilter = (character) => {
        if(character.special_role.heal == true){
          return character;
        }
      }
      const tileChangeFilter = (character) => {
        if(character.special_role.tile_change == true){
          return character;
        }
      }
      const tileResetFilter = (character) => {
        if(character.special_role.tile_reset == true){
          return character;
        }
      }
      if(options.special_role.includes('teleport')){
        _characterList = _characterList.filter(teleportFilter);
      }      
      if(options.special_role.includes('heal')){
        _characterList = _characterList.filter(healFilter);  
      }
      if(options.special_role.includes('tile_change')){
        _characterList = _characterList.filter(tileChangeFilter);
      }
      if(options.special_role.includes('tile_reset')){
        _characterList = _characterList.filter(tileResetFilter);
      }
      return _characterList
    }

    const favFilter = (character) => {
      if(user.fav_char.includes(character.id)){
        return character
      }
    }    

    const mixFilter = (list) => {
      if (options.special_role.length == 0){
        if(filterByFav){
          return list.filter(characterFilter).filter(favFilter)
        }else{
          return list.filter(characterFilter)
        }
      }else{
        if(filterByFav){
          return specialRoleFilter(list).filter(characterFilter).filter(favFilter)
        }else{
          return specialRoleFilter(list).filter(characterFilter)
        }
      }
    }

    // filter end
    
    const setData = (data) => {
      setCharacterList(mixFilter(data));
      setPages(Array((Math.ceil(mixFilter(data).length / charPerPage)))
    .fill(1).map((x,y) => x + y ));
      setSliceStart(0);
      setSort(null);
    }

    axios.get(BackendUrl+"/api/characters/")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
    },[options, charPerPage, filterByFav]
  );

  // useEffect end


  //sort start
  const getSortOrder = (prop) => {
    return function(a, b) {    
      if (a[prop] > b[prop]) {    
          return 1;    
      } else if (a[prop] < b[prop]) {    
          return -1;    
      }    
      return 0;    
    }
  }
  const getSortOrderReverse = (prop) => {
    return function(a, b) {    
      if (a[prop] < b[prop]) {    
          return 1;    
      } else if (a[prop] > b[prop]) {    
          return -1;    
      }    
      return 0;    
    }
  }

  const getSortOrderProp = (prop, inprop) => {
    return function(a, b) {    
      if (a[prop][inprop] > b[prop][inprop]) {    
          return 1;    
      } else if (a[prop][inprop] < b[prop][inprop]) {    
          return -1;    
      }    
      return 0;    
    }
  }

  const getSortOrderPropReverse = (prop, inprop) => {
    return function(a, b) {    
      if (a[prop][inprop] < b[prop][inprop]) {    
          return 1;    
      } else if (a[prop][inprop] > b[prop][inprop]) {    
          return -1;    
      }    
      return 0;    
    }
  }
  
  const Name = ({sort, setSort}) => {
    const sortByName = () => {
      setCharacterList(characterList.sort(getSortOrder("name")));
      setSliceStart(0)
      setSort("sort_by_name")
    }
    const sortByNameReverse = () => {
      setCharacterList(characterList.sort(getSortOrderReverse("name")));
      setSliceStart(0)
      setSort("sort_by_name_reverse")
    }
    if(sort == "sort_by_name"){
      return <span className="curser_to_point" onClick={()=>sortByNameReverse()}>이름▼</span>
    }else if(sort == "sort_by_name_reverse"){
      return <span className="curser_to_point" onClick={()=>sortByName()}>이름▲</span>
    }else{
      return <span className="curser_to_point" onClick={()=>sortByName()}>이름</span>
    }
  }

  const Rarity = ({sort, setSort}) => {
    const sortByRarityReverse = () => {
      setCharacterList(characterList.sort(getSortOrder("rarity")));
      setSliceStart(0)
      setSort("sort_by_rarity_reverse")
    }
    const sortByRarity = () => {
      setCharacterList(characterList.sort(getSortOrderReverse("rarity")));
      setSliceStart(0)
      setSort("sort_by_rarity")
    }
    if(sort == "sort_by_rarity"){
      return <span className="curser_to_point" onClick={()=>sortByRarityReverse()}>레어도▼</span>
    }else if(sort == "sort_by_rarity_reverse"){
      return <span className="curser_to_point" onClick={()=>sortByRarity()}>레어도▲</span>
    }else{
      return <span className="curser_to_point" onClick={()=>sortByRarity()}>레어도</span>
    }
  } 

  const Mattr = ({sort, setSort}) => {
    const sortByMattr = () => {
      setCharacterList(characterList.sort(getSortOrderProp("main_attribute", "name")));
      setSliceStart(0)
      setSort("sort_by_main_attribute")
    }
    const sortByMattrReverse = () => {
      setCharacterList(characterList.sort(getSortOrderPropReverse("main_attribute", "name")))
      setSliceStart(0)
      setSort("sort_by_main_attribute_reverse")
    }
    if(sort == "sort_by_main_attribute"){
      return <span className="curser_to_point" onClick={()=>sortByMattrReverse()}>주속성▼</span>
    }else if(sort == "sort_by_main_attribute_reverse"){
      return <span className="curser_to_point" onClick={()=>sortByMattr()}>주속성▲</span>
    }else{
      return <span className="curser_to_point" onClick={()=>sortByMattr()}>주속성</span>
    }
  }

  const Sattr = ({sort, setSort}) => {
    const sortBySattr = () => {
      setCharacterList(characterList.sort(getSortOrderProp("sub_attribute", "name")));
      setSliceStart(0)
      setSort("sort_by_sub_attribute")
    }
    const sortBySattrReverse = () => {
      setCharacterList(characterList.sort(getSortOrderPropReverse("sub_attribute", "name")));
      setSliceStart(0)
      setSort("sort_by_sub_attribute_reverse")
    }
    if(sort == "sort_by_sub_attribute"){
      return <span className="curser_to_point" onClick={()=>sortBySattrReverse()}>부속성▼</span>
    }else if(sort == "sort_by_sub_attribute_reverse"){
      return <span className="curser_to_point" onClick={()=>sortBySattr()}>부속성▲</span>
    }else{
      return <span className="curser_to_point" onClick={()=>sortBySattr()}>부속성</span>
    }
  }

  const Class = ({sort, setSort}) => {
    const sortByClass = () => {
      setCharacterList(characterList.sort(getSortOrderProp("char_class", "name")));
      setSliceStart(0)
      setSort("sort_by_class")
    }
    const sortByClassReverse = () => {
      setCharacterList(characterList.sort(getSortOrderPropReverse("char_class", "name")));
      setSliceStart(0)
      setSort("sort_by_class_reverse")

    }
    if(sort == "sort_by_class"){
      return <span className="curser_to_point" onClick={()=>sortByClassReverse()}>클래스▼</span>
    }else if(sort == "sort_by_class_reverse"){
      return <span className="curser_to_point" onClick={()=>sortByClass()}>클래스▲</span>
    }else{
      return <span className="curser_to_point" onClick={()=>sortByClass()}>클래스</span>
    }
  } 
  //sort end

  const CharTableHead = () => {
    const FavBtn = () => {
      if(filterByFav){
        return(
          <Button onClick={()=>setFilterByFav(!filterByFav)} size="sm" variant="dark">★</Button>
        )
      }else{
        return(
          <Button onClick={()=>setFilterByFav(!filterByFav)} size="sm" variant="dark">☆</Button>
        )
      }
    }
    if(!user || user.email == ""){
      return(
        <thead>
          <tr className="character-table-td-index">
            <th className="character-list-open-td">
              <Button size="sm" variant="dark">ㅡ</Button></th>
            <th className="character-table-td-millde-index">아이콘</th>
            <th className="character-table-td-millde-index-name"><Name sort={sort} setSort={setSort}></Name></th>
            <th className="character-table-td-millde-index"><Rarity sort={sort} setSort={setSort}></Rarity></th>
            <th className="character-table-td-millde-index"><Mattr sort={sort} setSort={setSort}></Mattr></th>
            <th className="character-table-td-millde-index"><Sattr sort={sort} setSort={setSort}></Sattr></th>
            <th className="character-table-td-millde-index"><Class sort={sort} setSort={setSort}></Class></th>
            <th className="character-table-td-millde-index">세력</th>
            <th className="character-table-td-millde-index"><DropdownButton className="char-list-dropdown" variant="secondary" drop="left" title="PagePer">
                  <Dropdown.Item onClick={() => setCharPerPage(10)}>10</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCharPerPage(20)}>20</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCharPerPage(30)}>30</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCharPerPage(50)}>50</Dropdown.Item>
                </DropdownButton>
            </th>
          </tr>
        </thead>
      )
    }else{
      return(
        <thead>
          <tr className="character-table-td-index">
            <th className="character-list-open-td"><FavBtn></FavBtn></th> 
            <th className="character-list-open-td">
              <Button size="sm" variant="dark">ㅡ</Button></th>
            <th className="character-table-td-millde-index">아이콘</th>
            <th className="character-table-td-millde-index-name"><Name sort={sort} setSort={setSort}></Name></th>
            <th className="character-table-td-millde-index"><Rarity sort={sort} setSort={setSort}></Rarity></th>
            <th className="character-table-td-millde-index"><Mattr sort={sort} setSort={setSort}></Mattr></th>
            <th className="character-table-td-millde-index"><Sattr sort={sort} setSort={setSort}></Sattr></th>
            <th className="character-table-td-millde-index"><Class sort={sort} setSort={setSort}></Class></th>
            <th className="character-table-td-millde-index">세력</th>
            <th className="character-table-td-millde-index"><DropdownButton className="char-list-dropdown" variant="secondary" drop="left" title="PagePer">
                  <Dropdown.Item onClick={() => setCharPerPage(10)}>10</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCharPerPage(20)}>20</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCharPerPage(30)}>30</Dropdown.Item>
                  <Dropdown.Item onClick={() => setCharPerPage(50)}>50</Dropdown.Item>
                </DropdownButton>
            </th>
          </tr>
        </thead>
      )
    }
  }

  // const setSelect = () =>{
  //   setSelectedAurorian(s_aurorian)
  // }

  const handleSelectChange = (aurorian) => {
    setSelectedAurorian(aurorian.id)
  }


  const rarity_6_Filter = (aurorian) => {
    if(aurorian.rarity == 6){
      return aurorian
    }}

  const rarity_5_Filter = (aurorian) => {
    if(aurorian.rarity == 5){
      return aurorian
    }}

  const rarity_4_Filter = (aurorian) => {
    if(aurorian.rarity == 4){
      return aurorian
    }}

  const rarity_3_Filter = (aurorian) => {
    if(aurorian.rarity == 3){
      return aurorian
    }}
      

  const AurorianInfo = ({aurorian}) => {
    if(!aurorian){
      return null
    }else{
      return(
        <Image width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
      )
    }
  }

  const MyAurorianIcon = ({aurorian}) => {
    if(!aurorian){
      console.log("null?")
      return "agwegwgg"
    }else if([1,3].includes(aurorian.id)){
      return(
        <Image width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
      )
    }else{
      return(
      <Image onClick={()=>handleSelectChange(aurorian)} className="myaurorian-icon" width="80" height="80" unoptimized="true" src={aurorian.icon}></Image>
      )
    }
  }

  const AurorianList = () => {
    return(
      <Col sm={6} lg={6}>
        <div className="font-white">
          <Button onClick={()=>console.log(s_aurorian)}>s_aurorian</Button>
          <Button onClick={()=>console.log(selectedAurorian)}>sel_aurorian</Button>
          <Button onClick={()=>console.log(characterList)}>characterList</Button>
          <Button onClick={()=>console.log(characterList.filter(rarity_6_Filter)[0]['icon'])}>chListFilter</Button>
          {/* <Image width="60" height="60" unoptimized="true" src={characterList.filter(rarity_6_Filter)[0]['icon']}></Image> */}
          <span className="font-white">6☆</span> <br></br>
            {characterList.filter(rarity_6_Filter).sort(getSortOrderProp("main_attribute", "name")).map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
            )} <br></br>
          <span className="font-white">5☆</span> <br></br>
            {characterList.filter(rarity_5_Filter).sort(getSortOrderProp("main_attribute", "name")).map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
          <span className="font-white">4☆</span> <br></br>
            {characterList.filter(rarity_4_Filter).sort(getSortOrderProp("main_attribute", "name")).map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
          <span className="font-white">3☆</span> <br></br>
            {characterList.filter(rarity_3_Filter).sort(getSortOrderProp("main_attribute", "name")).map(aurorian =>
              <MyAurorianIcon key={aurorian.id} aurorian={aurorian}></MyAurorianIcon>
          )} <br></br>
        </div>
      </Col>
    )
  }

  // if (loading) {
  //   return "loading"
  // }else{
    if(!characterList[0]){
      return null
    }else{
    return(
      <Container>
        <Row><Button>보유 오로리안 편집</Button><Button>팀 편집</Button></Row>
        <Row>
          <AurorianList/>
          <Col sm={6} lg={6}>
            <span className="font-white">팀 1 /</span>
            <span className="font-white">팀 2 /</span> 
            <span className="font-white">팀 3 /</span> 
            <span className="font-white">팀 4 /</span>
            <div className="font-white">
              1번 2번 3번 4번 5번
            </div>
            {/* <AurorianInfo aurorian={selectedAurorian}></AurorianInfo> */}
          </Col>
        </Row>  
      </Container>
    )
  }
}

export default MyAurorianList;

