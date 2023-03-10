import React from 'react';
import { useParams } from 'react-router-dom';

const Submitted = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>Quiz for {category} submitted successfully</h1>
    </div>
  );
};

export default Submitted;
