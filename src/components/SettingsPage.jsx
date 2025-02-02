import React, { useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('user123');
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const handleDarkModeChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // save settings to backend here
    alert('Settings saved!');
  };
 
  return (
    <div className="settings-container">
      <h1>{t('generalSettings')}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="languageSelect" className="form-label">{t('language')}</label>
          <select className="form-select" id="languageSelect" value={i18n.language} onChange={handleLanguageChange}>
            <option value="en">{t('english')}</option>
            <option value="fr">{t('french')}</option>
            <option value="chi">{t('chinese')}</option>
            <option value="ko">{t('korean')}</option>
          </select>
        </div>
   
       
          <div>        
</div>
      </form>
    </div>
  );
};

const SettingsPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SettingsPage />
    </Suspense>
  );
}

export default SettingsPageWithSuspense;
