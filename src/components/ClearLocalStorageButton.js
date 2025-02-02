import React from 'react';
import { RiDeleteBin2Fill } from "react-icons/ri";

const ClearLocalStorageButton = () => {
  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <>
      <RiDeleteBin2Fill className="delLocalStorageIcon" title="Clear all data from browser (local storage)!" onClick={handleClearStorage}/>
    </>
  );
};

export default ClearLocalStorageButton;
