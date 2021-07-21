import React, {useEffect, useState, useRef, useReducer} from 'react';
import { Table, ButtonGroup, Button} from 'react-bootstrap';
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



  useEffect( () => {
    async function fetchData(){
      try {
      const response = await axios.get("/api/characters/");
      setCharacterList(response.data);
      setCurrentList(response.data.slice(0,5));

      setPages(Array((parseInt(response.data.length / characterPerPage) + 1))
      .fill(1).map((x,y) => x + y ));

      setLoading(false);
    } catch (error){
      console.error(error);
    }
  }fetchData();
},[loading]
  );

  useEffect(() => {
    async function fetchData(){
    const response = await axios.get("api/characters");
    setCharacterList(response.data.filter(characterFilter));
    setCurrentList(response.data.filter(characterFilter).slice(0,5))
    setPages(Array((parseInt(response.data.filter(characterFilter).length / characterPerPage) + 1))
    .fill(1).map((x,y) => x + y ));
    setCurrentPage(1)
    
    console.log('pages',pages)
  }
  fetchData();
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
      {/* <button onClick={() => a_test()}>test!</button> */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>open</th>
            <th>Name</th>
            <th>Rarity</th>
            <th>M_Attr</th>
            <th>S_Attr</th>
            <th>Class</th>
            <th>detail</th>
          </tr>
        </thead>
        {currentList.map((cha)=> ( 
          <React.Fragment key={cha.id}>
            <CharacterInList cha={cha} key={cha.id}>
            </CharacterInList>
          </React.Fragment>
        ))}
      </Table>
      <div>
        <ButtonGroup>
        pages : {pages.map((page) => (
          <React.Fragment key={page}>
            <PageButton page={page} handlePage={handlePage} currentPage={currentPage}></PageButton>
          </React.Fragment>
        ))}
        </ButtonGroup>
      </div>
    </div>
  )
        }
}

export default CharacterList;
