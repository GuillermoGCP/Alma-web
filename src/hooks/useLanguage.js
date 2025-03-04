import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
  };
};

export default useLanguage;
