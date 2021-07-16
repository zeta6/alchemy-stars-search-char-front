import React, {useEffect, useState} from 'react';
import { Table } from 'react-bootstrap';

const CharacterList = ({filteredCharacter}) => {

  const [charactersTotal, setCharactersTotal] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1); 
	const [postsPerPage] = useState(10); 

  const a_test = () => {
    console.log(filteredCharacter);
  }
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
        {filteredCharacter.map((cha, index)=> ( 
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
    </div>
  )

}

export default CharacterList 