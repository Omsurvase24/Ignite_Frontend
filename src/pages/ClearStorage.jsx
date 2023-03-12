import React, { useEffect } from 'react';

const ClearStorage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <div>ClearStorage</div>;
};

export default ClearStorage;
