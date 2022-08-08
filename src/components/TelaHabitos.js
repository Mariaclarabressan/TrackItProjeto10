import axios from "axios";
import React from "react"
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import Topo from '../components/Topo';
import Base from '../components/Base';
import UsuarioContext from "../context/UsuarioContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


export default function TelaHabitos(){

    const navigate = useNavigate();

    const {token} = useContext(UsuarioContext);

    const [adicionaHabito, setAdicionaHabito] = useState(false)

    const [carregando, setCarregando] = useState(false);

    const [ selecionado, setSelecionado] = useState([false, false, false, false, false, false, false]);

    const [habito, setHabito] = useState([]);

    const [name, setName] = useState("")

    
    const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"];
    
    useEffect(() => {
        mostraHabito();
    },[])

    function mostraHabito(){
        const promise = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );

        promise.then((response) => {
            setHabito(response.data)
        });
        promise.catch((error) =>{
            alert('Erro ao carregar hábitos')
            
        })
    }

    function selecionaDia(index){
        setSelecionado(selecionado.map((s,i) =>(
            i === index ? !selecionado[i] : selecionado[i]
        )));
    }

    function criaHabito(){
        setCarregando(true);
        const days = [];

        for (let i = 0; i<selecionado.length; i++){
            if(selecionado[i]) days.push(i);
        }

        if(days.length ===0){
            alert("Selecione pelo menos um dia da semana para praticar esse hábito")
            setCarregando(false);
            return;
        }

        const novoHabito = {
            name: name,
            days: days
        }

        const promise = axios.post(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
            novoHabito,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        promise.then((response) => {
            setName('');
            setSelecionado([false, false, false, false, false, false, false]);
            setAdicionaHabito(!adicionaHabito);
            setCarregando(false);
        })

        promise.catch(error => {
            alert("Não foi possível criar esse hábito, ");
            setCarregando(false);
        })
        mostraHabito();
    }

    function tarefaDoDia(dias, index){
        if(dias.includes(index)) return true;
        return false;
    }

    function deletaHabito(id){
        if(window.confirm('Deseja deletar esse hábito? ')){
            axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        mostraHabito();
    }

    return(
        <Container>
            <Topo/>

                <HabitoDoUsuario>

                    <p>Meus Hábitos</p>
                    <p onClick={() => setAdicionaHabito(!adicionaHabito)}>+</p>
                
                </HabitoDoUsuario>
                
                {adicionaHabito ? (
                    
                    <NovoHabitodoUsuario>
                        
                        <input type = 'text' placeholder="nome do habito" value = {name} onChange = {(e) => setName(e.target.value)} disabled = {carregando}/>

                        <DiasdaSemanaHabito>
                            {diasDaSemana.map((day, index) =>{
                                return(
                                    <Dia key = {index} onClick = { () => selecionaDia(index)} value = {selecionado[index]} > {day}</Dia>
                                )
                            })}
                        </DiasdaSemanaHabito>
                        <Botoes>
                            <BotaoCancelar>
                            <button onClick={() => setAdicionaHabito(!adicionaHabito)} disabled = {carregando} >Cancelar</button>
                            </BotaoCancelar>
                            <BotaoSalvar>
                            <button onClick={criaHabito}>
                                {carregando ? <ThreeDots/> : 'Salvar'}
                            </button>
                            </BotaoSalvar>
                        </Botoes>

                    </NovoHabitodoUsuario>

                ) : ""}

                {habito.length === 0 ? (
                    <SemHabito>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SemHabito>
                ) : (
                    
                    <HabitoBody>
                        {habito.map((habitoLista, index) => {
                            
                            return(
                                <HabitoUnidade key = {index}>
                                    <TitulosHabito>
                                    <p>{habitoLista.name}</p>
                                    <span onClick={() => deletaHabito(habitoLista.id)}><ion-icon name="trash-outline"></ion-icon></span>
                                    </TitulosHabito>
                                    <DiaDoHabito>
                                        {diasDaSemana.map((day, indexSemana) => {
                                            const posição = tarefaDoDia(habitoLista.days, indexSemana);
                                            return(
                                                <Dia key = {indexSemana} value = {posição}>{day}</Dia> 
                                            )
                                        })}
                                    </DiaDoHabito>
                                </HabitoUnidade>
                            ) 

                        })}
                    </HabitoBody>

                )}
            <Base/>
        </Container>
    )    
}

const Container = styled.div`
width: 100%;
height: 100%;
min-height: 100vh;
background-color: #e5e5e5;
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Lexed-Deca';
`
const HabitoDoUsuario = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 90%;
margin-top: 98px;
margin-bottom: 20px;
 p {
    height: 29px;
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
 }
`
const Botoes = styled.div`
margin-top: 25px;
margin-left: 148px;
font-size: 16px;
line-height: 20px;
font-weight: 400;
font-style: normal;
box-sizing: border-box;
display: flex;
align-items: center;
justify-content: center;
`

const BotaoCancelar = styled.button`
width: 69px;
height: 20px;
color: #52b6ff;
margin-right: 23px;
border: 0;
background-color: #FFFFFF;
`
const BotaoSalvar = styled.button`
width: 84px;
height: 35px;
background-color: #52b6ff;
border-radius: 4.6px;
color: #FFFFFF;
border: 0;
display: flex;
justify-content: center;
align-items: center;
`

const NovoHabitodoUsuario = styled.div`
width: 340px;
height: 180px;
background-color: #FFFFFF;
border-radius: 5px;
margin-top: 20px;
margin-bottom: 20px;
display: flex;
flex-direction: column;
justify-content: center;
padding: 10px 19px;

input{
    box-sizing: border-box;
    padding-left: 11px;
    width: 363px;
    height: 45px;
    background-color: ${({disabled}) => disabled ? '#8fc549': '#FFFFFF'};
    border: 1px solid #d5d5d5;
    border-radius:5px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    margin-bottom: 8px; 
}
`
const TitulosHabito = styled.div`
padding-top: 5px;
padding-bottom: -10px;
display: flex;
align-items: center;
justify-content: space-between;
padding-right: 10px;
margin-bottom: 5px;

p{
    max-width: 260px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color : #666666;
    word-wrap: break-word;
}
span{
    position: relative;
    font-size: 20px;
}
`
const SemHabito = styled.div `
width: 338px;
height: 74px;
left: 17px;
margin-top: 28px;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 22px;
color: #666666;
`
const Dia = styled.div`
width: 30px;
height: 30px;
background-color: ${props => props.value ? '#CFCFCF': 'white'};
border: 1px solid #d5d5d5;
margin-right: 4px;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 25px;
color: ${props => props.value ? 'white': 'CFCFCF'};
`

const DiasdaSemanaHabito = styled.div`
display: flex;
text-align: center;
`
const HabitoBody = styled.div`
margin-bottom: 125px;
`
const HabitoUnidade = styled.div`
width: 340px;
min-height: 91px;
background-color: white;
border-radius: 5px;
box-sizing: border-box;
margin-bottom: 10px;
padding: 10px;
display: flex;
flex-direction: column;
justify-content: center;
`
const DiaDoHabito = styled.div`
display: flex;
text-align: center;
`