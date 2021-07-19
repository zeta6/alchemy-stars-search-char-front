import { FilterCenterFocus } from '@material-ui/icons';
import React, {useEffect, useState} from 'react';
import { Table, Accordion, Button} from 'react-bootstrap';
import CharacterInList from './CharacterInList';
import TestData from './TestData'

const CharacterList = ({options}) => {

  const [characterList, setCharacterList] = useState(TestData);  
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1); 
  const [currentList, setCurrentList] = useState([{
    id: "11",
    name: "4karen",
    rarity: "4",
    main_attribute: "water",
    sub_attribute: "water",
    class: "changer",
  }]);
  
  useEffect(() => {
    console.log("chL",characterList);
    setCurrentList(characterList.slice(0,5))
    setLoading(false);
  },[loading]
  );

  useEffect(() => {
    console.log(options);
    const data = TestData;
    setCharacterList(data.filter(characterFilter));
    setCurrentList(data.filter(characterFilter).slice(0,5))
  }, [options]
  );

const getList = async() => {
  const list = setCurrentList(characterList.filter(characterFilter));
  return list;
}


  const charactersTotal = characterList.length;
  const characterPerPage = 5;
  const endPage = parseInt(charactersTotal / characterPerPage) +1;
  

  const pages = Array(endPage).fill(1).map((x,y) => x + y)

  const handlePage = (page) => {
    console.log(page);
    const sliceStart = (page-1) * 5;
    const sliceEnd = (page-1) * 5 + 5;
    console.log(sliceStart);
    console.log(sliceEnd);
    setCurrentList(characterList.slice(sliceStart,sliceEnd))
    setCurrentPage(page);
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

  const a_test = () => {
    console.log(getList);
  }
  if (loading) {
    return "loading"
  }
  if (currentPage != 0) {
  return(
    <div>
      <button onClick={() => a_test()}>test!</button>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>open</th>
            <th>#</th>
            <th>Name</th>
            <th>Rarity</th>
            <th>M_Attr</th>
            <th>S_Attr</th>
            <th>Class</th>
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
        pages : {pages.map((page) => (
          <React.Fragment key={page}>
            <button onClick={() => handlePage(page)}>{page}</button>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
        }
}

export default CharacterList;