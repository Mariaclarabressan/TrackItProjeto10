import { useState, useEffect, useContext } from "react";
import UsuarioContext from "../context/UsuarioContext";
import ProgressoContext from '../context/ProgressoContext';
import axios from "axios";
import dayjs from "dayjs";
import Topo from "./Topo";
import Base from "./Base";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function TelaHoje() {

    const { progresso, setProgresso } = useContext(ProgressoContext);

    const navigate = useNavigate();

    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const dia = dias.find((_, i) => i === dayjs().day())

    const { token } = useContext(UsuarioContext);

    const [habitoHoje, setHabitoHoje] = useState([]);

    let porcentagem = 0;

    useEffect(() => {
        mostraHabitoHoje();
    }, []);

    function mostraHabitoHoje() {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );

        promise.then((reponse) => {
            setHabitoHoje(reponse.data);
            concluidas();
        });

        promise.catch((error) => {
            alert("Erro ao cadastro tarefa")

        })
        console.log('registrou o habito')
        console.log(habitoHoje);
    }

    function concluidas() {
        if (habitoHoje.length === 0) return;

        let concluido = 0;

        for (let i = 0; i < habitoHoje.length; i++) {
            if (habitoHoje[i].done) concluido++;
        }
        porcentagem = concluido / habitoHoje.length;

        setProgresso((porcentagem * 100).toFixed(0));
    }

    function ckeck(id, feito) {

        const terminado = feito ? 'uncheck' : 'check'

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${terminado}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        promise.catch(error =>  { 
            console.log(error)
            alert("Erro ao marcar tarefa") })
        
    }

    return (
        <>
            <Topo />
            <Dia>
                <p>
                    {dia}, {dayjs().format('DD/MM')}
                </p>
                {progresso === '0' || habitoHoje.length === 0 ? <PorcentagemFeita>Nenhum hábito foi concluído ainda</PorcentagemFeita> : <PorcentagemFeita>{progresso}% dos hábitos concluídos</PorcentagemFeita>}


            </Dia>

            <Container>
                {habitoHoje.length ? (
                    <HabitoBody>
                        {habitoHoje.map((habito, index) => {
                            return (
                                <Habito key={index}>
                                    <Titulo>
                                        <p>{habito.name}</p>
                                        <Sequence valeu={habito.feito}>Sequencia atual: <span>{habito.currentSequence}</span></Sequence>
                                        <Sequence valeu={habito.feito}>Sequencia atual: <span>{habito.highestSequence}</span></Sequence>
                                    </Titulo>
                                    <Check onClick={() => { ckeck(habito.id, habito.feito) }} value={habito.feito}>
                                        <ion-icon name="checkbox-outline"></ion-icon>
                                    </Check>
                                </Habito>
                            )
                        })}
                    </HabitoBody>
                ) : (
                    <SemHabito>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SemHabito>
                )}
            </Container>
            <Base />
        </>
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
const Dia = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: initial;
width: 90%;
margin-top: 98px;
margin-bottom: 28px;
p{
    width: 200px;
    height: 29px;
    font-style: normal;
    font-size: 23px;
    line-height: 29px;
    color: #126ba5;
}
`
const Habito = styled.div`
width: 340px;
min-height: 91px;
background-color: white;
border-radius: 5px;
box-sizing: border-box;
margin-bottom: 10px;
padding-bottom: 10px;
display: flex;
`
const Titulo = styled.p`
width: 208px;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 25px;
margin: 13px 19px 8px 19px;
color: #666666;
word-wrap: break-word;
`

const Check = styled.div`
top: 10px;
position: relative;
font-size: 69px;
color: ${props => props.value ? '#8fc549' : '#e7e7e7'};
border-radius: 5px;
`

const Sequence = styled.div`
width: 170px;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
color: #666666;
margin-left: 19px;

span{
    color: ${({ value }) => value ? '#8fc549' : '#666666'}
}
`
const SemHabito = styled.div`
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
const HabitoBody = styled.div`
margin-bottom: 125px;
`
const PorcentagemFeita = styled.div`
width: 278px;
height: 22px;
font-style: normal;
font-size: 18px;
line-height: 22px;

`