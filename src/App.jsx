import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import ProtectedRoute from "./components/ProtectedRoute";
// import FoodAnalysis from "./pages/FoodAnalysis";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Coach from "./pages/coach";
import Completeprofile from "./pages/Completeprofile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/completeprofile" element={<Completeprofile/>}/>
        
        
        <Route path="/landing" element={
          <ProtectedRoute>
          <Landing/>
        </ProtectedRoute>
      }/>
         {/* <Route path="/food-analysis" element={
          <ProtectedRoute>
          <FoodAnalysis/>
          </ProtectedRoute> 
        }/> */}
        <Route path="/history" element={
          <ProtectedRoute>
          <History/>
          </ProtectedRoute> 
        }/>

          <Route path="/dashboard" element={
          <ProtectedRoute>
          <Dashboard/>
          </ProtectedRoute>
        }/>  
         <Route path ="/coach" element={
          <ProtectedRoute>
            <Coach/>
          </ProtectedRoute>
         }/>
 


      </Routes>
    </BrowserRouter>
  );
}

export default App;