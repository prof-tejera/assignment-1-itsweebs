import React from 'react';

const DisplayRounds = ({ currentRound, totalRounds }) => {
  return (
    <div>
      Round: {currentRound}/{totalRounds}
    </div>
  );
};

export default DisplayRounds;