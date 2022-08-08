import axios from "axios";
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import logo from '../img/logo.png';



export default function TelaCadastro() {

    const [cadastro, setCadastro] = useState({
        email: '',
        name: '',
        image: '',
        password: '',
    });

    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    function novoUsuario(event) {
        event.preventDefault();
        setCarregando(true);

        const body = cadastro;

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body);

        promise.then((response) => {
            console.log('cadastrei')
            navigate('/');
            setCarregando(false);
            
        });
        promise.catch(() => {
            alert("Não foi possível realizar o seu cadastro, por favor tente mais tarde");
            setCarregando(false);
        });
    }

    return (
        <Container>
            <Logo>
                <img src={logo} alt="TrackIt" />
            </Logo>

            <form >
                <div>
                    <input
                        placeholder='email'
                        type='email'
                        onChange={(event) => setCadastro({ ...cadastro, email: event.target.value })}
                        value={cadastro.email}
                        disabled={carregando}
                        
                    />

                    <input
                        placeholder='nome'
                        type='name'
                        onChange={(event) => setCadastro({ ...cadastro, name: event.target.value })}
                        value={cadastro.name}
                        disabled={carregando}
                        
                    />

                    <input
                        placeholder='senha'
                        type='password'
                        onChange={(event) => setCadastro({ ...cadastro, password: event.target.value })}
                        value={cadastro.password}
                        disabled={carregando}
                    
                    />

                    <input
                        placeholder='imagem'
                        type='url'
                        onChange={(event) => setCadastro({ ...cadastro, image: event.target.value })}
                        value={cadastro.image}
                        disabled={carregando}
                    />

                
                
                    <Button onClick = {novoUsuario} >
                        {carregando ?
                            (<ThreeDots />)
                            :
                            <p>Cadastrar</p>
                        }
                    </Button>
                
                
                    <Cadastro>
                        <Link to='/'> Já tem sua conta? Faça login</Link>
                    </Cadastro>
                </div>

            </form>
        </Container>
    )

}
const Container = styled.div`
   background-color: #FFFFFF;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   div{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
   }   

   input{
      width: 303px;
      height: 45px;
      border-radius: 5px;
      margin-left: 36px;
      background-color: #FFFFFF;
      color: #dadada;
      border: solid 1px;
      margin: 10px 0;
      font-size: 20px;
   }

   form{
      display: flex;
      margin-top: 3%;
      align-items: center;
      justify-content: center;
      flex-direction: center;
   }
`
const Logo = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   img{
      width: 180px;
      height: 178.38px;
      margin-top: 68px;
   }
`

const Button = styled.div`
   background-color: #52b6ff;
   width: 303px;
   height: 45px;
   border-radius: 5px;
   margin-left: 36px;
   color: #FFFFFF;
   border: solid 1px;
   margin: 10px 0;
`

const Cadastro = styled.p`
   color: #52b6ff;
   font-family : 'Lexend Deca' ;
   font-size: 14px;
`
