import React from "react"; 
 import Articles from "./articles"; 
 import Matches from "./LiveMatches"; 
  import Favorites from "./Favorites/Favorites"
  import AccountLayout from "../layouts/accounts"
 import { Outlet } from "react-router-dom"; 
  
     const Dashboard: React.FC = () => {
  return (
    <div className=" static min-h-screen flex-row justify-center bg-gray-100">
      <AccountLayout />
      <Matches />
      <br />
      <div className="flex gap-0.5">
        <div className="w-11/12">
          {" "}
         <Articles /> 
        </div>
        <div className="w-4/12 justify-between">
          {" "}
         <Favorites />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;