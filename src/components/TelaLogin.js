import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../img/logo.png';
import { useContext, useState } from 'react';
import axios from 'axios';
import UsuarioContext from '../context/UsuarioContext'

export default function TelaLogin() {

   const { setToken, setImagem } = useContext(UsuarioContext);
   const [login, setLogin] = useState({ email: '', password: '' });
   const [carregando, setCarregando] = useState(false);
   const navigate = useNavigate();

   function novoLogin(event) {
      event.preventDefault();
      setCarregando(true);
      

      const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", { ...login });

      promise.then((response) => {
         console.log('entrou')
         setImagem(response.data.image);
         setToken(response.data.token);
         navigate('/habito');
         setCarregando(false);

         localStorage.setItem('token', response.data.token);
         localStorage.setItem('image', response.data.image);

         

      });

      promise.catch(() => {
         alert('Login inválido, por favor confira os dados ou cadastre-se')
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
                  onChange={(event) => setLogin({ ...login, email: event.target.value })}
                  value={login.email}
                  required
                  disabled={carregando}
               />

               <input
                  placeholder='senha'
                  type='password'
                  onChange={(event) => setLogin({ ...login, password: event.target.value })}
                  value={login.password}
                  required
                  disabled={carregando}
               />


               <Button onClick = {novoLogin} >
                  {carregando ?
                     (<ThreeDots />)
                     :
                     <p>Entrar</p>
                  }
               </Button>


               <Cadastro>
                  <Link to='/cadastro'> Não tem conta? Cadastre-se</Link>
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