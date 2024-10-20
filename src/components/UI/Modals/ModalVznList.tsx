import {useEffect, useState} from 'react'
import VznItem from "@/components/VznItem/VznItem.tsx";
import axios from "axios";
import * as React from "react";
import './list_vzn.scss'
import MainLayout from "@/layouts/MainLayout.tsx";

interface List {
  id: number;
  vzn_number: string;
  sender: string;
  recipient: string;
  date_issue: string;
}

const ModalVznList: React.FC = () => {
  const [vznList, setVznList] = useState<List[]>([])

  useEffect(() => {
    const apiUrl = 'api/list.json';
    axios.get(apiUrl).then((response) => {
      setVznList(response.data.list)
      console.log(response.data.list)
    });
  }, []);

  const filterButton = <button type="button" className="header header_btn" id="filter-btn">
      <img src="./img/list/search.svg" alt="search"/>
      <span>Поиск</span>
    </button>;

  const createButton = <button type="submit" className="header header_btn">
      <img src="./img/list/create.svg" alt="create"/>
      <span>Создать</span>
    </button>;

  return (
    <>
      <div className="modal" id="consumption">
        <MainLayout
          headline="ВЗН УП (Расход)"
          showCloseButton={false}
          hasBorder={false}
          isBlueBackground={false}
          centralButton={filterButton}
          rightButton = {createButton}
        >
          <ul className="list_vzn" id="list">
            {/*api*/}
            {vznList.map((item) => (
              <VznItem key={item?.id} item={item}/>
            ))}
          </ul>
        </MainLayout>
      </div>
    </>
  )
}

export default ModalVznList
