import React from 'react';

export const GenericHeader = ({ title }) => {
  return (
    <div className="p-8 pt-0 pb-5">
      <div className="grid lg:grid-cols-5 md:grid-cols-5">
        <div className="col-span-3 lg:mr-5 md:mr-5 h-full notched  notched--bg notched--bg--img" style={{ backgroundImage: 'url(https://placehold.jp/800x500.png)' }}></div>
        <div className="col-span-2 h-full notched notched--border">
          <h1>{title}</h1>
          <p>
            Ad ea duis aliquip do irure. Reprehenderit sit qui culpa laboris
            tempor sit mollit sint exercitation proident culpa minim Lorem id.
            Dolore velit sit sunt deserunt duis. Laboris eu irure cupidatat
            minim eu anim. Tempor excepteur sit nulla quis commodo do anim non
            aliquip ea in magna reprehenderit consectetur. Magna est officia
            duis consequat esse tempor velit aute ad laborum consectetur eu
            mollit occaecat. Excepteur ipsum ut ea ipsum excepteur cupidatat
            ea nisi occaecat Lorem eu. Qui occaecat qui do incididunt non amet
            do deserunt reprehenderit. Aute minim elit elit veniam anim elit
            do enim anim consectetur labore eiusmod.
          </p>
        </div>
      </div>
    </div>
  );
};