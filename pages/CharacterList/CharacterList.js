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
    class: "loading",
  },]);  
	const [loading, setLoading] = useState(true);
	// const [currentPage, setCurrentPage] = useState(1); 
  const [currentList, setCurrentList] = useState([{
    id: "9998",
    name: "loading",
    rarity: "1",
    main_attribute: "loading",
    sub_attribute: "loading",
    class: "loading",
  }]);

  const [pages, setPages] = useState(1);
  // const [pageButtonVariant, setPageButtonVariant ] = useState("secondary")
  const characterPerPage = 5;

  const characterFilter = (character) => {
    if(character.name.indexOf(options.name) !== -1 || options.name.length == 0){
      if(options.rarity.includes(character.rarity) || options.rarity.length == 0){
        if(options.main_attribute.includes(character.main_attribute) || options.main_attribute.length == 0){
          if(options.sub_attribute.includes(character.sub_attribute) || options.sub_attribute.length == 0){
            if(options.class.includes(character.class) || options.class.length == 0){
              return character;
            }
          }
        }
      }
    }
  }

  useEffect( () => {
    const setData = (data) => {
      setCharacterList(data);
      setCurrentList(data.slice(0,5));
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
          if(options.main_attribute.includes(character.main_attribute) || options.main_attribute.length == 0){
            if(options.sub_attribute.includes(character.sub_attribute) || options.sub_attribute.length == 0){
              if(options.class.includes(character.class) || options.class.length == 0){
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
      setCurrentList(data.filter(filter).slice(0,5));
      setPages(Array((parseInt(data.filter(filter).length / characterPerPage) + 1))
    .fill(1).map((x,y) => x + y ));
      setCurrentPage(1)
    }
    axios.get("api/characters")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
},[options]
  );


  const handlePage = (page) => {
    const sliceStart = (page-1) * 5;
    const sliceEnd = (page-1) * 5 + 5;
    console.log(sliceStart);
    console.log(sliceEnd);
    setCurrentList(characterList.filter(characterFilter).slice(sliceStart,sliceEnd))
    setCurrentPage(page)
  }
 

  // const a_test = () => {
  //   data = axios.get("api/characters")
  //   .then(res => { return(res.data)})
  //   console.log(data);
  // }
  if (loading) {
    return "loading"
  }
  else{
  return(
    <div>
    <Row className="character-list">
      {/* <button onClick={() => a_test()}>test!</button> */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="character-table-td-index">
            <th>-</th>
            <th>아이콘</th>
            <th>이름</th>
            <th>레어도</th>
            <th>주속성</th>
            <th>부속성</th>
            <th>클래스</th>
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
