import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VocHeader from './VocHeader'; 
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';

function GetData() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('http://3.38.225.120:8080/api/posts').then((response)=> {
      setData(response.data.response);
    })
  }, []);

  const item = (Object.values(data)).map((voc) => (
    <CommonTableRow key={voc.id}>
      <CommonTableColumn>{voc.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/voc/${voc.id}`}>
          {voc.title}
        </Link>
      </CommonTableColumn>
      <CommonTableColumn>{voc.createAt}</CommonTableColumn>
      <CommonTableColumn>{voc.username}</CommonTableColumn>
    </CommonTableRow>
  ));

  return item;
}

function Voc() {
    const item = GetData();
  
    return (<>
      <VocHeader></VocHeader>
      <CommonTable headersName={['글번호', '제목', '등록일', '작성자']}>
        {item}
      </CommonTable>
    </>);
  }
  
export default Voc;