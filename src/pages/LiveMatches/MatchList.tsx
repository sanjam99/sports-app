import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/action";
import { useMatchesDispatch } from "../../context/matches/context";
import MatchListItems from "./MatchListItems";

const MatchList: React.FC = () => {
  const dispatchMatches = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);

  return (
    <div className="flex gap-4 overflow-x-auto w-full">
      <MatchListItems />
    </div>
  );
};
export default MatchList;