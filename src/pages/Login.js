import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useAuth } from "../components/AuthContext";

const Card = styled.div`max-width:420px;margin:50px auto;padding:24px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.06);`;
const Title = styled.h2`text-align:center;margin-bottom:16px;`;
const Input = styled.input`width:100%;padding:10px;margin:6px 0;border:1px solid #ddd;border-radius:6px;`;
const Btn   = styled.button`width:100%;padding:10px;margin-top:10px;border:none;border-radius:6px;background:#1677ff;color:#fff;`;
const Error = styled.div`color:#d93025;font-size:12px;margin-top:-2px;`;

export default function Login(){
  const { login } = useAuth();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [touched,setTouched]=useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setTouched(true);
    if(!username || !password) return;        // déclenche les erreurs rouges
    try{
      await login(username,password);
      toast.success("Connecté avec succès !");
    }catch{
      toast.error("Échec de la connexion");
    }
  };

  return (
    <Card>
      <Title>Connexion</Title>
      <form onSubmit={onSubmit}>
        <label>Nom d'utilisateur</label>
        <Input value={username} onChange={e=>setUsername(e.target.value)}/>
        {touched && !username && <Error>Nom d'utilisateur requis</Error>}

        <label>Mot de passe</label>
        <Input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        {touched && !password && <Error>Mot de passe requis</Error>}

        <Btn type="submit">Se connecter</Btn>
      </form>
    </Card>
  );
}