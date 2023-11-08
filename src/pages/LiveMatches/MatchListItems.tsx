import { useMatchesState } from '../../context/matches/context';
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from 'react';
export default function MatchListItems() {
  let state: any = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  
   const [preferences, setPreferences] = useState<PreferencesState>({
    sports: [],
    teams: [],
  });
  
  useEffect(() => {
    const fetchPreferences = async () => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setPreferences(data.preferences);
      }
    };
    fetchPreferences();
  }, []);
  const user = localStorage.getItem("authToken");
  console.log(matches)
console.log("test=",preferences.sports.includes("Basketball"))
  return (
    <>
    {user &&
      Object.keys(preferences) &&
      (Object.keys(preferences).length > 0 ||
        Object.keys(preferences).length === 2) ? (
          <div className="flex gap-4 w-full border-b-2 pt-8 pb-8">
        {matches.map(
          (match: any) =>
            match.isRunning === true && (
              <div
                key={match.id}
                className="ml-2 flex-shrink-0 h-50 w-80 p-2 border-2 border-black rounded-lg bg-white text-black"
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
           </p><br />
                  <Button variant="outlined" className="flex items-center gap-3">
        Refresh
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </Button>
                </div>
              </div>
            )
        )}
      </div>
          ):(
            <div className="flex gap-4 w-full border-b-2 pt-8 pb-8">
        {matches.map(
          (match: any) =>
            match.isRunning === true && (
              <div
                key={match.id}
                className="ml-2 flex-shrink-0 h-50 w-80 p-2 border-2 border-black rounded-lg bg-white text-black"
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
           </p><br />
                  <Button variant="outlined" className="flex items-center gap-3">
        Refresh
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </Button>
                </div>
              </div>
            )
        )}
      </div>
          )}
    </>
  );
}
