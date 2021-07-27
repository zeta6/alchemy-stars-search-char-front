import React, {useEffect, useState} from 'react';
import { Table, ButtonGroup, Button, Row, ButtonToolbar, DropdownButton, Dropdown} from 'react-bootstrap';
import CharacterInList from './CharacterInList';
import axios from 'axios';

const PageButton = ({page, setSliceStart, currentPage, charPerPage}) => {
  if(page == currentPage){ 
  return(
    <Button variant="dark" onClick={() => setSliceStart((page-1) * charPerPage)}>{page}</Button>  
  )} else{
    return(
    <Button variant="secondary" onClick={() => setSliceStart((page-1) * charPerPage)}>{page}</Button>
  )}
};

const CharacterList = ({options, setOptions}) => {
  const [characterList, setCharacterList] = useState([]);  
	const [loading, setLoading] = useState(true);
  const [sliceStart, setSliceStart] = useState(0);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState(null);
  const [charPerPage, setCharPerPage] = useState(20);

  useEffect(() => {
    const setData = (data) => {
      setPages(Array((parseInt(data.length / 20) + 1))
      .fill(1).map((x,y) => x + y ));
      setLoading(false);
    }
    axios.get("/api/characters/")
      .then(response => setData(response.data)) 
      .catch(error => console.log(error));
},[]
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
      setPages(Array((parseInt(data.filter(filter).length / charPerPage) + 1))
    .fill(1).map((x,y) => x + y ));
      setSliceStart(0);
      setSort(null);
    }
    axios.get("/api/characters/")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
},[options, charPerPage]
  );


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
      console.log("@?????")
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
              <th className="character-list-open-td">-</th>
              <th className="character-table-td-millde-index">아이콘</th>
              <th className="character-table-td-millde-index"><Name sort={sort} setSort={setSort}></Name></th>
              <th className="character-table-td-millde-index"><Rarity sort={sort} setSort={setSort}></Rarity></th>
              <th className="character-table-td-millde-index"><Mattr sort={sort} setSort={setSort}></Mattr></th>
              <th className="character-table-td-millde-index"><Sattr sort={sort} setSort={setSort}></Sattr></th>
              <th className="character-table-td-millde-index"><Class sort={sort} setSort={setSort}></Class></th>
              <th className="character-table-td-millde-index">세력</th>
              <th className="character-table-td-millde-index"><DropdownButton id="dropdown-basic-button" title="페이지당 캐릭터">
                    <Dropdown.Item onClick={() => setCharPerPage(10)}>10</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCharPerPage(20)}>20</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCharPerPage(30)}>30</Dropdown.Item>
                    <Dropdown.Item onClick={() => setCharPerPage(50)}>50</Dropdown.Item>
                  </DropdownButton>
              </th>
            </tr>
          </thead>
        {characterList.slice(sliceStart, sliceStart+charPerPage).map((cha)=> ( 
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
            <PageButton page={page} charPerPage={charPerPage} setSliceStart={setSliceStart} currentPage={(parseInt(sliceStart/charPerPage))+1}></PageButton>
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

