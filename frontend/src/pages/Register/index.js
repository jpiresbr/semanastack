import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import Api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

export default function Register(){

    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf
        }
        //console.log(data);
        try{
            const resp = await Api.post('ongs', data);
            alert(`Id de acesso ${resp.data.id}`);
            history.push('/');
        }
        catch(err){
            alert(err);
        }
    }

    function msgTxt(txt){
        return txt;
    }

    return(
        <div className="register-container">
            <div className="content">
               <section>
                    <img src={logo}></img>
                    <h1>Faça o seu cadastro</h1>
                    <p>Faça o seu cadastro para utilizar a plataforma e ajude pessoas a encontrar e ajudar a sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />    
                        Já tenho cadastro
                    </Link>

               </section>

               <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input type="email" placeholder="E-mail para contato"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                            required
                        />
                        <select onChange={e => setUf(e.target.value)}
                            required >
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espirito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div>
                    </div>
                    <button className='button' type="submit">Cadastrar</button>
               </form>
            </div>
        </div>
    );   
}
