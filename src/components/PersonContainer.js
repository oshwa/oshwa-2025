import React from 'react';

export const PersonContainer = ({ name, title }) => {
  return (
    <div className="person-container">
      <div className="person-container__image" style={{ backgroundImage: "url(https://placehold.jp/500x500.png)" }}></div>
      <p className="person-container__name">{name}</p>
      <p className="person-container__title">{title}</p>
    </div>
  );
};