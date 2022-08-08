import styled from 'styled-components'
import { useEffect,useContext } from 'react';
import '../context/UsuarioContext';
import UsuarioContext from '../context/UsuarioContext';


export default function Topo(){ 
    
    const {imagem} = useContext(UsuarioContext)

    useEffect (() => {
        console.log(imagem)
    }, [])

    return (
        <Header>
            <Logo>TrackIt</Logo>
            <FotoUsuário src = {imagem} alt = "fotousuário"/>
        </Header>

    )
}

const Header = styled.div`
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 70px;
background-color: #126Ba5;
position: fixed;
display: flex;
align-items: center;
justify-content: space-between;
box-shadow: 0px 4px 4px rgba(0,0,0,0.15);
`
const Logo = styled.div`
width: 97px;
height: 49px;
margin-top: 10px;
margin-left: 18px;
font-family: 'Playball';
font-size: 39px;
color: #FFFFFF;
`

const FotoUsuário = styled.img`
width: 51px;
height: 51px;
border-radius: 50%;
margin-right: 10px;
z-index: 2;
`