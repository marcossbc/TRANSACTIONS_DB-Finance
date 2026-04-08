import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Dashboard from "./pages/dashbourd/dashboard";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";


function App() {
 

  return (
    <>
    <ThemeProvider>

  
     
             <Toaster/> 
               

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
  
    </ThemeProvider>
    </>
  );
}

export default App;