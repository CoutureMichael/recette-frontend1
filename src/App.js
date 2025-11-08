import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RecipeList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetail from "./pages/RecipeDetail";

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <div style={{padding:"10px 20px"}}>
          <Routes>
            <Route path="/" element={<Navigate to="/recipes" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/recipes" element={<PrivateRoute><RecipeList/></PrivateRoute>} />
            <Route path="/recipes/new" element={<PrivateRoute><AddRecipe/></PrivateRoute>} />
            <Route path="/recipes/:id" element={<PrivateRoute><RecipeDetail/></PrivateRoute>} />
            <Route path="/recipes/:id/edit" element={<PrivateRoute><EditRecipe/></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>

      {/* toasts verts/rouges comme sur tes images */}
      <ToastContainer position="top-right" autoClose={2200}/>
    </AuthProvider>
  );
}