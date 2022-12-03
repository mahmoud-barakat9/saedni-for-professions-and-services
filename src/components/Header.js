import react, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaCartPlus,
  FaRegBell,
  FaUser,
  FaWrench,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  SplitButton,
  ToggleButton,
} from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";
const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "Arabic" },
};
const Header = () => {
  const [selected, setSelected] = useState(false);

  const { interestedItems } = useSelector((state) => state.interestedReducer);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  const { t, i18n } = useTranslation();

  function clickLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {t("description.part1")}
            {/* sadni */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <FaBars size={25} color="white" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {/* <button onClick={() => clickLanguage("en")}>en</button>
                <button onClick={() => clickLanguage("ar")}>ar</button> */}
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                  className="ButtonGroup1"
                >
                  <Button onClick={() => clickLanguage("en")}>en</Button>
                  <Button onClick={() => clickLanguage("ar")}>ar</Button>
                </ButtonGroup>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#/">
                  <FaUser /> {user.email.substring(0, user.email.length - 10)}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  {t("description.part2")}
                  {/* orders */}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  {t("description.part3")}
                  {/* logout */}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <FaRegBell />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaWrench /> {interestedItems.length}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
