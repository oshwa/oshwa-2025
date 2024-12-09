import React from 'react';


export const PersonContainer = ({ name, title, affiliation,  profileImageUrl }) => {

  return (
    <div className="person-container">
      <div
        className="person-container__image"
        style={{ backgroundImage: `url(${profileImageUrl})` }}
      ></div>
      <p className="person-container__name">{name}</p>
      <p className="person-container__title">{title}</p>
      <p className="person-container__affiliation">{affiliation}</p>
    </div>
  );
};
