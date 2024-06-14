import React from 'react';
import Button from './Button';

const LanguagePicker = ({ languages, handler, currentLanguage }) => {
  return (
    <>
      <div className="language-picker-wrapper">
        {languages.map((language, idx) => {
          return (
            <Button
              additionalClass={`language-selector ${
                currentLanguage === language.language ? 'selected' : ''
              }`}
              key={`button-${language}-${idx}`}
              text={language.languageDisplay}
              content={language.language}
              handler={handler}
            />
          );
        })}
      </div>
    </>
  );
};

export default LanguagePicker;
