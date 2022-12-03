import { t } from "i18next";
import react from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  function clickLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <footer className="footer">
      <p>
        {/* Developed by mahmoud barakat */}
        {t("description.part6")}
      </p>
    </footer>
  );
};
export default Footer;
