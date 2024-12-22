import React from 'react';

const FullscreenButton = () => {

  const handleFullscreen = () => {
    const element = document.documentElement; // Target the entire page (html element)

    if (!document.fullscreenElement) {
      // Enter fullscreen mode for the entire page
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
  };

  return (
    <>
      <img onClick={handleFullscreen} alt="fullScreenBtn" id="fullScreenBtn" src="/images/fullScreenBtn.png" title="Fullscreen"></img>
    </>
  );
};

export default FullscreenButton;
