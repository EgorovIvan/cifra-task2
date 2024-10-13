import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

const Settings: React.FC = () => {

  return (
    <>
      <Header
        headline="Настройки"
        showCloseButton={true}
        hasBorder={true}
        isBlueBackground={true}
      />
      <main className="main">
        <ul className="main__list">
          <li className="main__list-item">
            <a href="#">
              <img src="./img/settings/sett_1.svg" alt="setting 1"/>
                <span>Настройка 1</span>
            </a>
          </li>
          <li className="main__list-item">
            <a href="#">
              <img src="./img/settings/sett_2.svg" alt="setting 2"/>
                <span>Настройка 2</span>
            </a>
          </li>
        </ul>
      </main>
      <Footer/>
    </>
  )
}

export default Settings
