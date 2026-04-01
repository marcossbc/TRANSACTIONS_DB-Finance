
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
