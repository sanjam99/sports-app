import React from "react"; 
 import Articles from "./articles"; 
 import Matches from "./LiveMatches"; 
// import Favorites from "./Favorites"
 import { Outlet } from "react-router-dom"; 
  
 const Dashboard = () => { 
  
     return ( 
         <> 
             <h1 className="text-2xl font-medium">Treading News</h1> 
             <div className="flex"> 
                 <div className="w-10/12 p-4"> 
                     <Articles /> 
                     <Outlet /> 
                 </div> 
                 <div className="w-2/12 p-4"> 
                     this is test  
                 </div> 
             </div> 
         </> 
     ); 
 } 
  
 export default Dashboard;