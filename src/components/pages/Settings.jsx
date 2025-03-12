import { useTranslation } from "react-i18next";
import { US } from 'country-flag-icons/react/3x2';

const Settings = () => {
  const [t, i18n] = useTranslation("global");

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage)
  };

  console.log(US)

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{t("settings.heading")}</h1>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex-1">
          <label htmlFor="language" className="block font-bold mb-1">
            {t("settings.language")}
          </label>
          <select
            name="language"
            id="language"
            className="w-1/4 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
            onChange={handleChangeLanguage}
            value={i18n.language}
          >
            <option value="en">{t("settings.languageOptions.en")}</option>
            <option value="jp">{t("settings.languageOptions.jp")}</option>
            <option value="tc">{t("settings.languageOptions.tc")}</option>
            <option value="sc">{t("settings.languageOptions.sc")}</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Settings;
