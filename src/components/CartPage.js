import { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import styled from "styled-components";

import axios from 'axios';
import UserContext from '../context/UserContext.js';

import Header from "./Header";

function CartPage() {

    const { _id } = useParams;

    const navigate = useNavigate();

    const { idUser, allCarts, setallCarts, token } = useContext(UserContext)
    console.log("sou o usuário", idUser)

    const [idAlbum, setIdAlbum] = useState("")

    console.log("idddd", idAlbum)

    const cartFiltered = allCarts.filter(product => product.userId == idUser)
    console.log("carrinho do user", cartFiltered)

    useEffect(() => {

        const URL = "https://projeto-loja-vinil.herokuapp.com/carrinho";

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.get(URL, config);

        promise.then((response) => {
            const { data } = response
            setallCarts(data)
        })

        promise.catch((error) => {
            console.log(error);
        })
    }, [])

    function calculateTotal() {
        let total = 0;
        cartFiltered.forEach(value => {
            total += parseInt(value.preco)
        });

        return (
            <span>Total: R$ {total.toFixed(2)}</span>
        )
    }
    if (cartFiltered.length == 0){
        return (
            <>
            <Header />
            <ContainerCartsVazio>
            <ConatainerVazio>
                <p>Seu Carrinho está vazio</p>
            </ConatainerVazio>
            <Link to={"/"} >
                    <button>Continuar Comprando</button>
                    </Link>
            </ContainerCartsVazio>
            </>
        )
    
    } else {
        
        return (
            <>
                <Header />
                <ContainerCarts>
    
                    {cartFiltered.map(cart => <BoxCarts info={cart} />)}
    
                    <ContainerTotal>
                    {calculateTotal()};
                    </ContainerTotal>

                    <ContainerButtons>
    
                    <Link to={"/"} >
                    <button>Continuar Comprando</button>
                    </Link>

                    <button onClick={() => deleteCart()}>Apagar carrinho</button>
    
                    <button onClick={() => {
                        const URL = "https://projeto-loja-vinil.herokuapp.com/finalizar";
    
                        const config = {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        }
    
                        const obj = cartFiltered
                
                        console.log("buy", cartFiltered);
                
                        const promise = axios.post(URL, obj, config)
                
                        promise.then(() =>{
                            alert("Compra realizada com sucesso!");
                            deleteCart();
                            navigate("/");
                        })
                
                        promise.catch((error) => {
                            console.log(error);
                        })
                    }}>Finalizar compra</button>

                </ContainerButtons>
    
                </ContainerCarts>
            </>
        )
    }
    

    function deleteCart(){
        const url = "https://projeto-loja-vinil.herokuapp.com/carrinho";

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.delete(url, config)

        promise.then(response =>{
            console.log("o carrinho do usuário foi apagado")
        })

        promise.catch((error) => {
            console.log(error);
        })
    }

    function BoxCarts(props) {
        const { info } = props

        return (
            <ContainerCart>
                <ContainerCapa>
                <img src={info.url}></img>
                </ContainerCapa> 
                <ContainerDescricao>
                <p>{info.album}</p>
                <p>{info.banda}</p>
                <p>R$ {info.preco}</p>
                </ContainerDescricao>

                
            </ContainerCart>
        )
    }
}

const ContainerCarts = styled.div`
    width: 375px;
    background-color: #F5DEB3;
    margin: auto auto;
    margin-top:25px;
    margin-bottom: 25px;
    border-radius: 5px;
    display:flex;
    flex-direction: column;

    button:nth-child(6){
        margin-bottom: 25px;
    }

    button {
        width:326px;
        height:46px;
        background-color:#F4A460;
        border-radius: 5px;
        border:none;
        margin-left:25px;
        margin-top: 25px;
        color:white;
        font-size:20px;
        font-weight: 700;
        cursor:pointer;
    }
`
const ContainerCart = styled.div`
    width:350px;
    height:60px;
    background-color:#F4A460;
    margin: auto auto;
    display: flex;
    border-radius: 5px;
    margin-top: 10px;
    position: relative;

    p{
        margin-bottom:4px;
        word-spacing: -5px;
    }

    ion-icon{
        display: flex;
        position: absolute;
        font-size: 20px;
        right:0;
        margin-right: 5px;
        margin-top: 17px;
        cursor: pointer;
    }
`
const ContainerCapa = styled.div `
    img{
        width: 60px;
        border-radius: 5px;
    }
`
const ContainerDescricao = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5px;
`
const ContainerTotal = styled.div`

    width: 350px;
    margin: auto auto;
    margin-top:20px;
    span{
        font-weight:500
    }
`
const ConatainerVazio = styled.div`
    width: 300px;
    margin: auto auto;

    p{
        margin: auto auto;
        margin-top:25px;
        text-align: center;
        font-weight: 500;
    }
`

const ContainerCartsVazio = styled.div`
    width: 375px;
    background-color: #F5DEB3;
    margin: auto auto;
    margin-top:25px;
    border-radius: 5px;
    display:flex;
    flex-direction: column;

    button{
        width:326px;
        height:46px;
        background-color:#F4A460;
        border-radius: 5px;
        border:none;
        margin-left:25px;
        margin-top: 25px;
        margin-bottom: 25px;
        color:white;
        font-size:20px;
        font-weight: 700;
        cursor:pointer;
    }
`

const ContainerButtons = styled.div`
    margin-bottom:15px;
`

export default CartPage