import { FilterCenterFocus } from '@material-ui/icons';
import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';

const CharacterList = ({filteredCharacter}) => {

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1); 
  const [currentList, setCurrentList] = useState([]);

  const charactersTotal = filteredCharacter.length;
  const characterPerPage = 10;
  const endPage = parseInt(charactersTotal / characterPerPage) +1;
  

  const pages = Array(endPage).fill(1).map((x,y) => x + y)

  const handlePage = (page) => {
    console.log(page);
    const sliceStart = (page-1) * 10;
    const sliceEnd = (page-1) * 10 + 10;
    console.log(sliceStart);
    console.log(sliceEnd);
    setCurrentList(filteredCharacter.slice(sliceStart,sliceEnd))
    setCurrentPage(page);
  }
 
  useEffect(() => {
    setCurrentList(filteredCharacter.slice(0,10))
    setLoading(false);
  },[loading]
);



  
  const a_test = () => {
    console.log('endpage', endPage);
    console.log('pages',pages);
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
            <th>#</th>
            <th>Name</th>
            <th>Rarity</th>
            <th>M_Attr</th>
            <th>S_Attr</th>
            <th>Class</th>
          </tr>
        </thead>
        {currentList.map((cha, index)=> ( 
          <React.Fragment key={cha.id}>
            <tbody>
              <tr>
                <td>{index}</td>
                <td>{cha.name}</td>
                <td>{cha.rarity}</td>
                <td>{cha.main_attribute}</td>
                <td>{cha.sub_attribute}</td>
                <td>{cha.class}</td>
              </tr> 
            </tbody>
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

export default CharacterList 