import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../view/home/index.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Register from "../view/auth/register";
import Login from "../view/auth/login";
import Detail from "../view/home/detail";
import Dashboard from "../view/admin/dashboard";
import MakananIndex from "../view/admin/makanan";
import MakananCreate from "../view/admin/makanan/create";
import MakananEdit from "../view/admin/makanan/edit";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/dashboard" element={
        isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
      } />
       <Route path="/makanan" element={
        isAuthenticated ? <MakananIndex /> : <Navigate to="/login" replace />
      } />

      <Route path="/makanan/create" element={
        isAuthenticated ? <MakananCreate /> : <Navigate to="/login" replace />
      } />

      <Route path="/makanan/edit/:id" element={
        isAuthenticated ? <MakananEdit /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}
