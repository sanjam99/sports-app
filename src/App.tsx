 import { ArticlesProvider } from "./context/articles/context"; 
 import { MatchesProvider } from "./context/matches/context"; 
 import { SportsProvider } from "./context/sports/context"; 
 import router from "./routes" 
 import { RouterProvider } from "react-router-dom"; 
 import './App.css' 
  
 const App = () => { 
  
   return ( 
     <ArticlesProvider> 
       <MatchesProvider> 
         <SportsProvider> 
           <RouterProvider router={router} /> 
         </SportsProvider> 
       </MatchesProvider> 
     </ArticlesProvider> 
   ) 
 } 
  
 export default App