import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UsuarioConxtex from "../context/UsuarioContext";
import ProgressoContex from "../context/ProgressoContext";
import { CircularProgressbar } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

export default function Base(){
    const navigate = useNavigate();

    const {progresso, setProgresso} = useContext(ProgressoContex);

    const {token} = useContext(UsuarioConxtex);

    const [habitoDia , setHabitoDia] = useState([]);

    let porcentagem = 0;

    useEffect(() => {
        habitoDeHoje();
    }, []);

    function habitoDeHoje(){
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        promise.then((response) => {
            setHabitoDia(response.data);
            concluido()
        });
        promise.catch((error) => {
            alert('Erro ao cadastrar');
            navigate('/');
        });
    }

    function concluido(){
        if(habitoDia.length ===0) return;
        let concluidos = 0;
        for (let i = 0; i <habitoDia.length; i++){
            if(habitoDia[i].done) concluido++;
        }

        porcentagem = concluidos/habitoDia.length;

        setProgresso((porcentagem*100).toFixed(0));
    }

    return(
        <BaseDiv>
            <Link to= '/habito' style = {{textDecoretion: 'none'}}>
            <p>Hábitos</p>
            </Link>

            <Link to = '/hoje' style = {{textDecoration: 'none'}}>
                <ProgressBar>
                    <CircularProgressbar backgroundPadding={6} strokeWidth ={9} text = 'Hoje' />
                    {/* <CircularProgressbar backgroundPadding={6} strokeWidth ={9} value = {progresso} text = 'Hoje' /> */}
                </ProgressBar>
            </Link>
            <Link to = '/historico' style = {{textDecoration: 'none'}}>
                <p>Históricos</p>
            </Link>
        </BaseDiv>
    )

}

const BaseDiv = styled.div`
position: fixed;
bottom: 0;
left: 0;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 70px;
background-color: white;
box-sizing: border-box;
padding: 0 33px;
font-size: 18px;
p{
    color: #52b6ff;

}
`
const ProgressBar = styled.div`
background-color: #52b6ff;
height: 91px;
width: 91px;
margin-bottom: 60px;
text-anchor: middle;

.CircularProgressbar-path{
    stroke: #fff;
    transition: 1s;
}
.CircularProgressbar-trail{
    stroke: #52b6ff;

}
.CircularProgressbar-text{
    fill: #fff;
}
.CircularProgressbar-background{
    fill: #52b6ff;
}
`
