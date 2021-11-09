import React, {useState} from 'react';
import { Table, Row } from "react-bootstrap";

const CharFileView = ({char_file, rarity}) => {
  if(!char_file){
    return null
  }

  // Story_0 copoment start
  const Story_0 = ({char_file}) => {
    let gender = "";
    if(char_file.gender == "여"){
      gender = "그녀";
    }else if(char_file.gender == "남"){
      gender = "그";
    }else{
      gender = "그들";
    }
    return(
      <tr>
        <td className="character-info-story-table-name">{gender}의 경력</td>
        <td className="character-info-preferred-talbe-text">{char_file.story_0}</td>
      </tr>
    )
  }
  // Story_0 copoment end
  
  // Stories copoment start
  const Stories = ({char_file, storyNum}) => {    
    const [ open, setOpen ] = useState(false);
    let gender = "";
    if(char_file.gender == "여"){
      gender = "그녀";
    }else if(char_file.gender == "남"){
      gender = "그";
    }else{
      gender = "그들";
    }
    const Collapse = ({open}) => {
      const key = "story_" +storyNum;
      if(!open) {
        return null
      }else{
        return(
        <div>
          {char_file[key]}
        </div>
        )
      }
    }
    return(
      <tr>
        <td className="character-info-file-table-name">{gender}의 이야기({storyNum})</td>
        <td onClick={() => setOpen(!open)} className="character-info-file-stories-text">
        <li className="character-info-story-table-li"> [ 호감도 {storyNum * 2} 달성 시 잠금 해제 ] </li>
        <Collapse open={open}></Collapse>
        </td>
      </tr>
    )
  }
  // Stories copoment end

  const getStoriesArray = () => {
    if(rarity == 3){
      return Array(3).fill(1).map((x,y) => x + y);
    }else{
      return Array(4).fill(1).map((x,y) => x + y);
    } 
  }

  const storiesNumArray = getStoriesArray();

    return (
    <div>
    <Row className="character-info-breakthrough-row">
      <a name="characterFile"></a>
      <span className="character-info-equip-name-span">캐릭터 파일</span>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td className="character-info-file-table-name">이름</td>
            <td className="character-info-preferred-talbe-text">{char_file.name}</td>
          </tr> 
          <tr>
            <td className="character-info-file-table-name">별명</td>
            <td className="character-info-preferred-talbe-text">{char_file.nickname}</td>
          </tr> 
          <tr>
            <td className="character-info-file-table-name">성별</td>
            <td className="character-info-preferred-talbe-text">{char_file.gender}</td>
          </tr>
          <tr>
            <td className="character-info-file-table-name">키</td>
            <td className="character-info-preferred-talbe-text">{char_file.height}</td>
          </tr>
          <tr>
            <td className="character-info-file-table-name">생일</td>
            <td className="character-info-preferred-talbe-text">{char_file.birthday}</td>
          </tr> 
          <tr>
            <td className="character-info-file-table-name">출생지</td>
            <td className="character-info-preferred-talbe-text">{char_file.birthplace}</td>
          </tr> 
          <tr>
            <td className="character-info-file-table-name">속성</td>
            <td className="character-info-preferred-talbe-text">{char_file.element}</td>
          </tr>
          <tr>
            <td className="character-info-file-table-name">소속 조직</td>
            <td className="character-info-preferred-talbe-text">{char_file.affilition}</td>
          </tr>
          <tr>
            <td className="character-info-file-table-name">전투 방식</td>
            <td className="character-info-preferred-talbe-text">{char_file.fighting_style}</td>
          </tr>
        </tbody>
      </Table>
    </Row>
    <Row>
      <Table striped bordered hover variant="dark">
        <tbody>
          <Story_0 char_file={char_file}></Story_0>
          {storiesNumArray.map((num) => 
            <Stories key={num} storyNum={num} char_file={char_file}></Stories>
          )}
        </tbody>
      </Table>
    </Row>
    </div>
    )
}
export default CharFileView;