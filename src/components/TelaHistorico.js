import Topo from "./Topo";
import Base from "./Base";
import styled from 'styled-components';

export default function TelaHistorico(){
    return(
        <>
        <Topo/>
        <Container>
            <Titulo>
                <h1>Histórico</h1>
                <p>Em breve você vai poder ver o histórico de hábitos aqui</p>
            </Titulo>
        </Container>
        <Base/>

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
const Titulo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: initial;
width: 90%;
margin-top: 100px;
margin-bottom: 28px;
h1{
    width: 200px;
    height: 29px;
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;
    color: #126ba5;
}
p{
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    margin-top: 17px;
}
`