import {useEffect, useState} from 'react'
import VznItem from "./VznItem.tsx";
import axios from "axios";
import * as React from "react";
import Header from './Header.tsx';

interface List {
  id: number;
  vzn_number: string;
  sender: string;
  recipient: string;
  date_issue: string;
}

const ModalVznList: React.FC<{ handleOpenModalFilter: () => void }> = ({handleOpenModalFilter}) => {
  const [vznList, setVznList] = useState<List[]>([])

  useEffect(() => {
    const apiUrl = 'api/list.json';
    axios.get(apiUrl).then((response) => {
      setVznList(response.data.list)
      console.log(response.data.list)
    });
  }, []);

  const filterButton = <button type="button" className="header header-btn" id="filter-btn" onClick={handleOpenModalFilter}>
      <img src="./img/list/search.svg" alt="search"/>
      <span>Поиск</span>
    </button>;

  const createButton = <button type="submit" className="header header-btn">
      <img src="./img/list/create.svg" alt="create"/>
      <span>Создать</span>
    </button>;
  
  return (
    <>
      <div className="modal" id="consumption">
        <Header
          headline="ВЗН УП (Расход)"
          showCloseButton={false}
          hasBorder={false}
          isBlueBackground={false}
          centralButton={filterButton}
          rightButton = {createButton}     
        />  
        <main className="list-vzn content">
          <div className="container">
            <ul className="list-vzn__block" id="list">
              {/*api*/}
              {vznList.map((item) => (
                <VznItem key={item?.id} item={item}/>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}

export default ModalVznList
