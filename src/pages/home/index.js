import { useState } from "react"
import './home.css'

import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'



export default function Home() {
  const [email, setEmail] =  useState('');
  const [password, setPassword ] = useState('');

  const navigate = useNavigate(); 

  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !== ''){
      
      await signInWithEmailAndPassword(auth, email, password)
      .then(() =>{
        //navegar para admin
        navigate('/admin', { replace: true})
      })
      .catch(() =>{
        console.log('ERRO AO FAZER O LOGIN')
      })
    }else{
      alert('Preencha todos os campos!')
    }

  }


    return (
      <div className="container" >
        <h1>Lista de tarefas</h1>
        <span>Gerencie sua agenda de forma fácil.</span>

        <form className="form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Acessar</button>
        </form>

        <Link className="button-link" to="/register">
          Não possui conta? Cadastra-se
        </Link>
      </div>
    );
  }
  
  