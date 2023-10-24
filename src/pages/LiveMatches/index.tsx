import React from 'react';
import MatchList from './MatchList';

const Matches = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold dark:text-white mb-4">Live Games</h2>
      <MatchList />
    </div>
  );
};

export default Matches;
