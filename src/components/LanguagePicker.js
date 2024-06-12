import React from 'react';
import Button from './Button';

const LanguagePicker = ({ languages, handler }) => {
  console.log(languages,'languages')
  const languageMap = {
    en: 'English',
    es: 'Spanish',
  };
  return (
    <>
      <div className="language-picker-wrapper">
        {languages.map((lang, idx) => {
          return (
            <Button
              key={`button-${lang}-${idx}`}
              text={languageMap[lang]}
              content={lang}
              handler={handler}
            />
          );
        })}
      </div>
    </>
  );
};

export default LanguagePicker;
