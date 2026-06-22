import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Landing from "./pages/Landing"
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/landing" element={
          <ProtectedRoute>
          <Landing/>
        </ProtectedRoute>
      }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;