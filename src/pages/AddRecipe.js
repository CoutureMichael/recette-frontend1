import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Card = styled.div`
  max-width: 520px; margin: 40px auto; padding: 22px;
  border-radius: 12px; background: #fff; box-shadow: 0 8px 24px rgba(0,0,0,.06);
`;
const Title = styled.h2`text-align:center;margin-bottom:14px;`;
const Label = styled.label`display:block;margin-top:10px;margin-bottom:6px;font-weight:600;`;
const Input = styled.input`
  width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;
`;
const Textarea = styled.textarea`
  width:100%; min-height:90px; padding:10px; border:1px solid #ddd; border-radius:8px; resize:vertical;
`;
const Select = styled.select`
  width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;
`;
const Btn = styled.button`
  width:100%; margin-top:16px; padding:12px 10px; border:none; border-radius:8px;
  background:#1677ff; color:#fff; font-weight:600; cursor:pointer;
`;

export default function AddRecipe() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", ingredients: "", instructions: "", category: "", imageUrl: ""
  });
  const [touched, setTouched] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setTouched(true);
    const { name, ingredients, instructions, category } = form;
    if (!name || !ingredients || !instructions || !category) return;
    try {
      await api.post("/api/recipes", form);
      toast.success("Recette ajoutée avec succès !");
      navigate("/recipes");
    } catch (err) {
      const msg = err?.response?.data?.message || "Erreur lors de l’ajout";
      toast.error(msg);
    }
  };

  return (
    <Card>
      <Title>Ajouter une recette</Title>
      <form onSubmit={onSubmit}>
        <Label>Nom recette</Label>
        <Input name="name" value={form.name} onChange={onChange}/>
        {touched && !form.name && <small style={{color:"#d93025"}}>Nom requis</small>}

        <Label>Ingrédients</Label>
        <Textarea name="ingredients" value={form.ingredients} onChange={onChange}/>
        {touched && !form.ingredients && <small style={{color:"#d93025"}}>Ingrédients requis</small>}

        <Label>Instructions</Label>
        <Textarea name="instructions" value={form.instructions} onChange={onChange}/>
        {touched && !form.instructions && <small style={{color:"#d93025"}}>Instructions requises</small>}

        <Label>Catégorie</Label>
        <Select name="category" value={form.category} onChange={onChange}>
          <option value="">Choisir catégorie</option>
          <option>Entrée</option>
          <option>Plat</option>
          <option>Dessert</option>
          <option>Autre</option>
        </Select>
        {touched && !form.category && <small style={{color:"#d93025"}}>Catégorie requise</small>}

        <Label>Image URL</Label>
        <Input name="imageUrl" value={form.imageUrl} onChange={onChange} placeholder="https://..." />

        <Btn type="submit">Ajouter recette</Btn>
      </form>
    </Card>
  );
}