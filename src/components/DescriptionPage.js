import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext.js';
import axios from 'axios';

import Header from "./Header";

function DescriptionPage() {

    const navigate = useNavigate();

    const { idAlbum, allAlbuns, setAllAlbuns, token, idUser, setIdUser } = useContext(UserContext)
    console.log("to aqui", idAlbum);
    const albumFiltered = allAlbuns.filter(album => album._id == idAlbum);

    useEffect(() => {

        const URL = "https://projeto-loja-vinil.herokuapp.com/descricao"

        const promise = axios.get(URL);

        promise.then((response) => {
            const { data } = response;
            setAllAlbuns(data)
        });

        promise.catch((error) => {
            console.log(error);
            alert("deu ruim na requisição")
        })
    }, []);

    console.log("objetoooo", albumFiltered)

    function addToCart(){

        const URL = "https://projeto-loja-vinil.herokuapp.com/descricao"

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, config, albumFiltered);

        promise.then((response) => {
            const { data } = response;
            setIdUser(data.id)
            navigate("/carrinho");
        })

        promise.catch((e) => {
            console.log(e)
            alert("Você precisa estar logado para adionar produto ao carrinho");
            navigate("/signin");
        })
    }

    return (
        <>
            <Header />
            <ContainerBody>
                {albumFiltered.map(album => <BoxDescription info={album} key={album._id} />)}
            </ContainerBody>
        </>
    )

    function BoxDescription(props) {

        const { info } = props

        return (
            <ContainerDescription>
                <img src={info.url}></img>

                <ContainerInfos>
                    <p>Banda: {info.banda}</p>
                    <p>Álbum: {info.album}</p>
                </ContainerInfos>

                <ContainerPrice>
                    <p>R$ {info.preco}</p>
                </ContainerPrice>

                <button onClick={addToCart} >Add to Cart</button>

            </ContainerDescription>
        )
    }
}

const ContainerBody = styled.div`
    width:375px;
    background-color: #F5DEB3;
    margin: auto auto;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
`

const ContainerDescription = styled.div`
    width: 300px;
    margin: auto auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img{
        width:280px;
        margin: auto auto;
        margin-top: 15px;
        border-radius: 5px;
    }

    button {
        width:325px;
        height:46px;
        background-color:#F4A460;
        border-radius: 5px;
        border:none;
        margin-top: 25px;
        margin-bottom: 20px;
        margin-left: -11px;
        color:white;
        font-size:20px;
        font-weight: 700;
        cursor:pointer;
    }
`
const ContainerInfos = styled.div`
    width: 325px;
    margin-top: 15px;
    background-color: #F4A460;
    margin: auto auto;
    margin-top:20px;
    margin-left: -11px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;

    p:first-child{
        margin-top: 8px;
    }

    p{
        font-size:14px;
        margin-bottom:10px;
        word-spacing: -5px;
        margin-left: 3px;
        font-weight: 400;
        color: #000000;
    }
`

const ContainerPrice = styled.div`
    width:140px;
    height:35px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin: auto auto;
    margin-top:25px;
    font-size:22px;
    background-color: #F4A460;
    border-radius:25px;
    color: #000000;

    p{
        word-spacing: -5px;
        font-weight:500
    }
`

export default DescriptionPage
