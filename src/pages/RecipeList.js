import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const Grid = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px;`;
const Card = styled.div`border:1px solid #eee;border-radius:10px;overflow:hidden;background:#fff;`;
const Img  = styled.img`width:100%;height:150px;object-fit:cover;`;
const Body = styled.div`padding:10px;`;
const Row  = styled.div`display:flex;gap:8px;margin-top:8px;`;
const Search = styled.input`width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;margin:12px 0;`;

export default function RecipeList(){
  const [recipes,setRecipes]=useState([]);
  const [q,setQ]=useState("");

  const load = async()=>{
    try{ const {data}=await api.get("/api/recipes"); setRecipes(data); }
    catch{ toast.error("Chargement impossible"); }
  };
  useEffect(()=>{ load(); },[]);

  const filtered = useMemo(
    ()=>recipes.filter(r=>r.name.toLowerCase().includes(q.toLowerCase())), [recipes,q]
  );

  const remove = async(id)=>{
    if(!window.confirm("Supprimer cette recette ?")) return;
    try{ await api.delete(`/api/recipes/${id}`); toast.success("Supprimée"); load(); }
    catch{ toast.error("Suppression échouée"); }
  };

  return (
    <div>
      <Search placeholder="Rechercher des recettes..." value={q} onChange={e=>setQ(e.target.value)} />
      <Grid>
        {filtered.map(r=>(
          <Card key={r.id}>
            <Img src={r.imageUrl || "https://via.placeholder.com/600x400"} alt="img"/>
            <Body>
              <h4>{r.name}</h4>
              <small>{r.category}</small>
              <Row>
                <Link to={`/recipes/${r.id}/edit`}><button>Modifier</button></Link>
                <button onClick={()=>remove(r.id)} style={{background:"#ff4d4f",color:"#fff"}}>Supprimer</button>
              </Row>
              <div style={{marginTop:8}}>
                <Link to={`/recipes/${r.id}`}>Détails</Link>
              </div>
            </Body>
          </Card>
        ))}
      </Grid>
    </div>
  );
}