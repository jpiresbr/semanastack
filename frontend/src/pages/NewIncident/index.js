import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Api from '../../services/api';

import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.svg';

export default function NewIncident(){

    const [titulo, setTitulo] = useState();
    const [desc, setDesc] = useState();
    const [valor, setValor] = useState();
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNew(e){
        e.preventDefault();

        const data = {
            titulo,
            desc,
            valor
        }
        //console.log(data);
        try{
            await Api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        }
        catch(err){
            alert("Erro ao cadastrar!");
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
               <section>
                    <img src={logo} alt="Incidentes"></img>
                    <h1>Cadastrar caso</h1>
                    <p>Cadastrar um novo caso para a ONG</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />    
                        Voltar para a home
                    </Link>

               </section>

               <form onSubmit={handleNew}>
                    <input 
                        placeholder="Título do caso" 
                        value={titulo} 
                        onChange={e=> setTitulo(e.target.value)}
                        />
                    <textarea 
                        placeholder="Descrição" 
                        value={desc} 
                        onChange={e=> setDesc(e.target.value)}
                        />
                    <input 
                        placeholder="Valor em  Reais" 
                        value={valor} 
                        onChange={e=> setValor(e.target.value)}
                        />

                    <button className='button' type="submit">Cadastrar</button>
               </form>
            </div>
        </div>
    );   
}
