import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useContext } from "react";

import UserContext from '../context/UserContext.js';

import Header from "./Header"

import kiss from "../midias/Kiss2.jpg"
import titas from "../midias/titas.jpg"
import bowie from "../midias/bowie.jpg"
import djavan from "../midias/djavan.jpg"
import beastie from "../midias/beastie.jpg"
import cartola from "../midias/cartola.jpg"

function HomePage() {

    const { token, nameUser } = useContext(UserContext)
    console.log("nome usuário", nameUser);
    console.log("tokenUser", token);

    const genders = [
        { id: "1", capa: `${kiss}`, name: "Rock internacional" },
        { id: "2", capa: `${titas}`, name: "Rock Nacional" },
        { id: "3", capa: `${bowie}`, name: "Pop internacional" },
        { id: "4", capa: `${djavan}`, name: "MBP" },
        { id: "5", capa: `${beastie}`, name: "Hip-Hop" },
        { id: "6", capa: `${cartola}`, name: "Samba" },
    ]

    return (
        <>
            <Header />

            <>
                {
                    token ? (
                        <SpanUsuario>
                            <p>Bem-vindo, {nameUser}</p>
                        </SpanUsuario>
                    ) : (
                        <SpanUsuario>
                            <Link to={"/signin"} style={{ textDecoration: 'none' }} >
                                <p>Você não está logado</p>
                            </Link>
                        </SpanUsuario>
                    )
                }
            </>

            <ContainerMenu>

                {genders.map(gender => <BoxGender info={gender} />)}

            </ContainerMenu>
        </>
    )
}

function BoxGender(props) {

    const { info } = props

    const { setCategoria } = useContext(UserContext)

    return (
        <Link to={`/albuns/${props.info.name}`} style={{ textDecoration: 'none' }}>

            <button onClick={() => {
                setCategoria("")
                setCategoria(info.id)
            }}>

                <ContainerGender>

                    <ContainerCovers>
                        <img src={props.info.capa} />
                    </ContainerCovers>

                    <p>{props.info.name}</p>
                
                </ContainerGender>

            </button>
        </Link>
    )
}

const SpanUsuario = styled.div`
    margin:auto auto;
    margin-top: 15px;
    background-color: #F5DEB3;
    width: 300px;
    height:30px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius:15px;

    p{
        text-align:center;
        cursor: pointer;
        color: #000000;
        word-spacing: -5px;
    }
`

const ContainerMenu = styled.div`
    width: 700px;
    height: 500px;
    background-color: #F5DEB3;
    display:flex;
    flex-wrap: wrap;
    margin: auto auto;
    margin-top: 20px;
    border-radius: 5px;

    button{
        width: 213px;
        height: 218px;
        border:none;
        background-color: #F5DEB3;
        border-radius: 5px;
        cursor: pointer;
    }

    @media(max-width: 416px) {
        width: 375px;
        justify-content: center;
        background-color: #F4A460;

        button{
            background-color:#F4A460;
        }
    }
`

const ContainerGender = styled.div`
    width: 213px;
    height:218px;
    background-color: #F5DEB3;
    margin-left: 25px;
    margin-top:15px;
    border-radius:5px;
    display:flex;
    justify-content: center;
    position: relative;
    cursor: pointer;

    p{
        position:absolute;
        bottom: 0;
        margin-bottom: 10px;
        color: #000;
        font-size: 16px;
        font-weight: 500;
    }

    @media(max-width: 416px) {
        width:170px;
        height: 300px;
        background-color:#F4A460;
        margin-top: 20px;
        margin-right: 15px;
        margin-left: 20px;
        p{
            font-size: 20px;
        }
    }
`
const ContainerCovers = styled.div`
    margin-top: 5px;
    margin-bottom: 15px;
    display:flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    img{
        display:flex;
        width: 165px;
        border-radius: 5px;
        position: relative;
        bottom: 0;
        margin-top: 10px;
    }

    @media(max-width: 416px) {

        background-color:#F4A460;
        
        img{
            width: 250px;
            margin: auto auto;
        }
    }
`

export default HomePage