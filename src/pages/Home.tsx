import {Link} from "react-router-dom";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Home() {


  return (
    <>
      <Header/>
      <main className="main">
        <ul className="main__list">
          <li className="main__list-item">
            <Link to="/tasks">
              <img src="./img/menu/tasks.svg" alt="tasks"/>
                <span>Задачи</span>
            </Link>
          </li>
          <li className="main__list-item">
            <Link to="/settings">
              <img src="./img/menu/sett.svg" alt="settings"/>
                <span>Настройки</span>
            </Link>
          </li>
          <li className="main__list-item">
            <Link to="/">
              <img src="./img/menu/system.svg" alt="info system"/>
                <span>О системе</span>
            </Link>
          </li>
        </ul>
      </main>
      <Footer/>
    </>
  )
}

export default Home
