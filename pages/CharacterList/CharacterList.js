import React, {useEffect, useState, useRef, useReducer} from 'react';
import { Table, ButtonGroup, Button, Row, Col, ButtonToolbar} from 'react-bootstrap';
import CharacterInList from './CharacterInList';
import axios from 'axios';

const PageButton = ({page, handlePage, currentPage}) => {
  if(page == currentPage){ 
  return(
    <Button variant="dark" onClick={() => handlePage(page)}>{page}</Button>  
  )} else{
    return(
    <Button variant="secondary" onClick={() => handlePage(page)}>{page}</Button>
  )}
};

const CharacterList = ({options}) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [characterList, setCharacterList] = useState([{
    id: "9999",
    name: "loading",
    rarity: "1",
    main_attribute: "loading",
    sub_attribute: "loading",
    char_class: "loading",
  },]);  
	const [loading, setLoading] = useState(true);
  const [currentList, setCurrentList] = useState([{
    id: "9998",
    name: "loading",
    rarity: "1",
    main_attribute: "loading",
    sub_attribute: "loading",
    char_class: "loading",
  }]);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState(null);
  const characterPerPage = 10;

  useEffect( () => {
    const setData = (data) => {
      setCharacterList(data);
      setCurrentList(data.slice(0,10));
      setPages(Array((parseInt(data.length / characterPerPage) + 1))
      .fill(1).map((x,y) => x + y ));
      setLoading(false);
    }
    axios.get("/api/characters/")
      .then(response => setData(response.data)) 
      .catch(error => console.log(error));
},[loading]
  );

  useEffect(() => {
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
    const setData = (data) => {
      const filter = characterFilter;
      setCharacterList(data.filter(filter));
      setCurrentList(data.filter(filter).slice(0,10));
      setPages(Array((parseInt(data.filter(filter).length / characterPerPage) + 1))
    .fill(1).map((x,y) => x + y ));
      setCurrentPage(1);
      setSort(null);
    }
    axios.get("api/characters")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
},[options]
  );

  const handlePage = (page) => {
    const sliceStart = (page-1) * 10;
    const sliceEnd = (page-1) * 10 + 10;
    setCurrentList(characterList.slice(sliceStart,sliceEnd))
    setCurrentPage(page)
  }

  //useEffect line end


  // getSortOrder

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
      setCurrentList((characterList.sort(getSortOrder("name"))).slice(0,10));
      setCurrentPage(1)
      setSort("sort_by_name")
    }
    const sortByNameReverse = () => {
      setCharacterList(characterList.sort(getSortOrderReverse("name")));
      setCurrentList((characterList.sort(getSortOrderReverse("name"))).slice(0,10));
      setCurrentPage(1)
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
      setCurrentList((characterList.sort(getSortOrder("rarity"))).slice(0,10));
      setCurrentPage(1)
      setSort("sort_by_rarity_reverse")
    }
    const sortByRarity = () => {
      setCharacterList(characterList.sort(getSortOrderReverse("rarity")));
      setCurrentList((characterList.sort(getSortOrderReverse("rarity"))).slice(0,10));
      setCurrentPage(1)
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
      setCurrentList((characterList.sort(getSortOrderProp("main_attribute", "name"))).slice(0,10));
      setCurrentPage(1)
      setSort("sort_by_main_attribute")
    }
    const sortByMattrReverse = () => {
      setCharacterList(characterList.sort(getSortOrderPropReverse("main_attribute", "name")));
      setCurrentList((characterList.sort(getSortOrderPropReverse("main_attribute", "name"))).slice(0,10));
      setCurrentPage(1)
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
      setCurrentList((characterList.sort(getSortOrderProp("sub_attribute", "name"))).slice(0,10));
      setCurrentPage(1)
      setSort("sort_by_sub_attribute")
    }
    const sortBySattrReverse = () => {
      setCharacterList(characterList.sort(getSortOrderPropReverse("sub_attribute", "name")));
      setCurrentList((characterList.sort(getSortOrderPropReverse("sub_attribute", "name"))).slice(0,10));
      setCurrentPage(1)
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
      setCurrentList((characterList.sort(getSortOrderProp("char_class", "name"))).slice(0,10));
      setCurrentPage(1)
      setSort("sort_by_class")
    }
    const sortByClassReverse = () => {
      setCharacterList(characterList.sort(getSortOrderPropReverse("char_class", "name")));
      setCurrentList((characterList.sort(getSortOrderPropReverse("char_class", "name"))).slice(0,10));
      setCurrentPage(1)
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
 
  if (loading) {
    return "loading"
  }
  else{
    return(
      <div>
        <Row className="character-list">
          <Table striped bordered hover variant="dark">
           <thead>
            <tr className="character-table-td-index">
              <th>-</th>
              <th>아이콘</th>
              <th><Name sort={sort} setSort={setSort}></Name></th>
              <th><Rarity sort={sort} setSort={setSort}></Rarity></th>
              <th><Mattr sort={sort} setSort={setSort}></Mattr></th>
              <th><Sattr sort={sort} setSort={setSort}></Sattr></th>
              <th><Class sort={sort} setSort={setSort}></Class></th>
              <th>세력</th>
              <th>캐릭터페이지</th>
            </tr>
          </thead>
        {currentList.map((cha)=> ( 
          <React.Fragment key={cha.id}>
            <CharacterInList cha={cha} key={cha.id}>
            </CharacterInList>
          </React.Fragment>
        ))}
      </Table>
    </Row>
    <Row className="page-button-tool-bar-row">
    <ButtonToolbar>
      <ButtonGroup className="page-button-group">
        {pages.map((page) => (
          <React.Fragment key={page}>
            <PageButton page={page} handlePage={handlePage} currentPage={currentPage}></PageButton>
          </React.Fragment>
       ))}
      </ButtonGroup>
    </ButtonToolbar>
    </Row>
    </div>
  )
        }
}

export default CharacterList;

