import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import Api from '../../services/api';

import './styles.css';
import heroes from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon(){
    
    const [id, setId] = useState();
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const resp = await Api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', resp.data.nome);
            history.push('/profile');
        }
        catch(error){
            alert("ID não encontrado!");
        }
    }
    
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo}></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça o seu login</h1>

                    <input
                        placeholder='Seu ID'
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />    
                        Não tenho cadastro
                    </Link>

                </form>
            </section>
            <img src={heroes}></img>
        </div>
    );   
}
