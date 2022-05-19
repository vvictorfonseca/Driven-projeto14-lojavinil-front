import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import styled from "styled-components";

import axios from 'axios';
import UserContext from '../context/UserContext.js';

import Header from "./Header";

function ApagarPage() {

    const navigate = useNavigate();

    const { id } = useParams();
    console.log("id", id)
    

    const { token, albumInfo, idProduto } = useContext(UserContext)
    console.log("aqui o id", idProduto);
    console.log("aqui o objeto do produto", albumInfo);

    function deleteProduct(){
        
        const URL = `https://projeto-loja-vinil.herokuapp.com/carrinho/${id}`;

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.delete(URL, config);

        promise.then(() => {
            navigate("/carrinho");
        })

        promise.catch((e) => {
            console.log(e)
        })
    }

    return (
        <>
            <Header />
            <ContainerBody>

                <ContainerH1>
                <h1>Você deseja apagar este produto do carrinho?</h1>
                </ContainerH1>

                <ContainerDescription>
                    <img src={albumInfo.url} />
                    <p>{albumInfo.name}</p>
                    <p>{albumInfo.banda}</p>
                    <p>R${albumInfo.preco}</p>
                </ContainerDescription>

                <ContainerButton>
                    <button onClick={() => deleteProduct() } >Sim</button>
                    <button onClick={() => navigate("/carrinho")} >Não</button>
                </ContainerButton>
            </ContainerBody>
        </>
    )
}

const ContainerBody = styled.div`
    width:375px;
    background-color: #F5DEB3;
    margin: auto auto;
    margin-top: 35px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
`
const ContainerH1 = styled.div`
    margin: auto auto;
    margin-top: 15px;
    width: 350px;
    font-weight:500;
    text-align: center;
    word-spacing: -4px;
`

const ContainerDescription = styled.div`
    width: 300px;
    margin: auto auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p{
        margin: auto auto;
        margin-top:5px;
        word-spacing: -4px;
    }

    P:last-of-type{
        font-weight:500
    }

    img{
        width:120px;
        margin: auto auto;
        margin-top: 15px;
        border-radius: 5px;
    }
`

const ContainerButton = styled.div`

    display:flex;
    justify-content: space-evenly;
    margin-top: 25px;
    margin-bottom: 15px;

    button{
        width: 80px;
        height: 40px;
        border-radius: 5px;
        border:none;
        background-color:#F4A460;
        color:white;
        font-size:20px;
        font-weight: 700;
        cursor:pointer;
    }
`


export default ApagarPage