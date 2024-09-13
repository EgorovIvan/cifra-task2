import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {Link} from "react-router-dom";

const Tasks: React.FC = () => {


  return (
    <>
      <Header/>
      <main className="main">
        <ul className="main__list">
          <li className="main__list-item">

            <a href="#" id="link-task">
              <img src="./img/settings/sett_1.svg" alt="setting 1"/>
                <span>Складской учёт</span>
            </a>

          </li>
          <li className="main__list-item">
            <Link to="/accounting">
              <img src="./img/settings/sett_2.svg" alt="setting 2"/>
                <span>Учёт в производстве</span>
            </Link>
          </li>
        </ul>
      </main>
      <Footer/>
    </>
  )
}

export default Tasks
