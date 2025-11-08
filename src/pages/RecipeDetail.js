import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../api";

const Wrap = styled.div`max-width:820px;margin:28px auto;`;
const Card = styled.div`background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.06);overflow:hidden;`;
const Img = styled.img`width:100%;height:360px;object-fit:cover;`;
const Body = styled.div`padding:16px 18px;`;
const H3 = styled.h3`margin:10px 0 6px;`;
const Small = styled.small`color:#666;`;

export default function RecipeDetail() {
  const { id } = useParams();
  const [r, setR] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    (async()=> {
      try {
        const { data } = await api.get(`/api/recipes/${id}`);
        setR(data);
      } catch {
        toast.error("Impossible de charger la recette");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p style={{textAlign:"center"}}>Chargement…</p>;
  if (!r) return <p style={{textAlign:"center"}}>Recette introuvable</p>;

  return (
    <Wrap>
      <Card>
        <Img src={r.imageUrl || "https://via.placeholder.com/1200x600"} alt={r.name}/>
        <Body>
          <H3>{r.name}</H3>
          <Small>Catégorie: {r.category || "—"}</Small>

          <h4 style={{marginTop:16}}>Ingrédients</h4>
          <p style={{whiteSpace:"pre-line"}}>{r.ingredients}</p>

          <h4>Instructions</h4>
          <p style={{whiteSpace:"pre-line"}}>{r.instructions}</p>

          <div style={{marginTop:12}}>
            <Link to={`/recipes/${r.id}/edit`}><button>Modifier</button></Link>
            <Link to="/recipes" style={{marginLeft:10}}><button>Retour</button></Link>
          </div>
        </Body>
      </Card>
    </Wrap>
  );
}