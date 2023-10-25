import React from 'react';
import { useMatchesState } from '../../context/matches/context';

export default function MatchListItems() {
  let state: any = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
console.log(matches)
  return (
    <>
      <div className="flex gap-4 w-full border-b-2 pt-6 pb-6">
        {matches.map(
          (match: any) =>
            match.isRunning === true && (
              <div
                key={match.id}
                className="ml-2 flex-shrink-0 h-40 w-80 p-2 border-2 border-black rounded-lg bg-white text-black"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{match.sportName}</h2>
                </div>
                <div key={match.endsAt}>
                  <h1 className="font-bold pt-1 flex justify-left">
                   {match.name.split('at')[0]}
                  </h1>
                            <p className="text-gray-600 text-sm dark:text-gray-400"> 
             venue:{match.location} 
           </p> 
           <p className="text-gray-600 text-sm dark:text-gray-400"></p> 
           <p className="text-gray-600 text-sm dark:text-gray-400"> 
             Ends at: {new Date(match.endsAt).toLocaleString()} 
           </p><br></br>
                  <button>refresh</button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
