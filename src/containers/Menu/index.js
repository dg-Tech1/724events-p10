/* eslint-disable no-return-assign */
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const Menu = () => {
  // Fonction pour définir l'ancre
  const setHash = (hash) => {
    window.document.location.hash = hash;
  };

  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <a href="#nos-services" onClick={() => setHash("#nos-services")}>
            Nos services
          </a>
        </li>
        <li>
          <a href="#nos-realisations" onClick={() => setHash("#nos-realisations")}>
            Nos réalisations
          </a>
        </li>
        <li>
          <a href="#notre-equipe" onClick={() => setHash("#notre-equipe")}>
            Notre équipe
          </a>
        </li>
      </ul>
      <Button title="contact" onClick={() => setHash("#contact")}>
        Contact
      </Button>
    </nav>
  );
};

export default Menu;
