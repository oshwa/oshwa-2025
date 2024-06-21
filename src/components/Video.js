import React from 'react';

export const Video = ({ title, resourceTitle, videoId, size }) => {
  return (
    <div className={`video-container video-container--${size}`}>
      <h4 className='video-container__title'>{title}</h4>
      <div className="video-container__video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          // frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
        />
      </div>
      <h4 className='video-container__title'>{resourceTitle}</h4>
    </div>
  );
};

export default Video;