import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Icon from "../components/Icon/Icon.tsx";

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
              <Icon src="../../public/img/settings/sett_1.svg" />
              <span>Настройка 1</span>
            </a>
          </li>
          <li className="main__list-item">
            <a href="#">
              <Icon src="../../public/img/settings/sett_2.svg" />
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
