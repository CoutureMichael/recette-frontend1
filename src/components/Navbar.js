import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./AuthContext";

const Bar = styled.nav`display:flex;justify-content:space-between;padding:12px 20px;background:#f7f7f7;border-bottom:1px solid #eee;`;
export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <Bar>
      <Link to="/">Recette App</Link>
      <div>
        {user ? <>
          <Link to="/recipes" style={{marginRight:12}}>Recettes</Link>
          <Link to="/recipes/new" style={{marginRight:12}}>Ajouter Recette</Link>
          <button onClick={logout}>Se déconnecter</button>
        </> : <>
          <Link to="/login" style={{marginRight:12}}>Connexion</Link>
          <Link to="/signup">Inscription</Link>
        </>}
      </div>
    </Bar>
  );
}