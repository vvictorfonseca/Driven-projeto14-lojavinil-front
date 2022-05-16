import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import styled from "styled-components"

import UserContext from '../context/UserContext.js';
import axios from 'axios';

import AuthHeader from "./AuthHeader.js";

function SignIn() {

    const { userData, setUserData, token, setToken, setNameUser } = useContext(UserContext)

    const navigate = useNavigate();

    const objSignIn = {
        email: userData.email,
        password: userData.password
    }

    const URL = "https://projeto-loja-vinil.herokuapp.com/signin"

    function handleLogin(e) {
        e.preventDefault();
        const promise = axios.post(URL, objSignIn);

        promise.then((response) => {
            const { data } = response;
            setToken(data.token);
            setNameUser(data.name);
            const user = JSON.stringify(data.token);
            const name = JSON.stringify(data.name);
            localStorage.setItem('token', user)
            localStorage.setItem('name', name)
            navigate("/")
        })

        promise.catch(error => {
            console.log(error);
            alert("Erro ao fazer o Login!")
        })
    }

    const loadInputs = inputs()

    function inputs() {
        return (
            <form onSubmit={handleLogin}  >
                <input type="email" placeholder="E-mail" value={userData.email} disabled={false} onChange={(e) => setUserData({ ...userData, email: e.target.value })} ></input>
                <input type="password" placeholder="Senha" value={userData.password} disabled={false} onChange={(e) => setUserData({ ...userData, password: e.target.value })} ></input>
                <button type='submit'>Entrar</button>
            </form>
        )
    }

    return (
        <>
            <AuthHeader />
            <ContainerLogin>

                {loadInputs}

                <Link to='/signup' style={{ textDecoration: 'none' }}> <p>Primeira vez? Cadastre-se!</p> </Link>
            </ContainerLogin>
        </>
    )
}

const ContainerLogin = styled.div`
    width: 375px;
    margin: auto auto;
    margin-top: 45px;
    display:flex;
    justify-content: center;
    flex-direction: column;
    background-color: #F5DEB3;
    border-radius: 5px;
    
    input{
        width:326px;
        height:56px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-top:13px;
        margin-left:25px;
        padding-left:15px;
        padding-top:5px;
        font-family: 'Roboto Mono', monospace;
        font-weight: 400;
        word-spacing: -4px;
    }

    input:first-child{
        margin-top: 30px;
    }

    input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    }
    input::placeholder {
        word-spacing: -4px;
        font-family: 'Roboto Mono', monospace;
        font-weight: 400;
        font-size: 20px;
        color: #000000;
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

    p{
        font-size:15px;
        font-weight:500;
        color: #000000;
        display:flex;
        justify-content:center;
        margin-top:15px;
        margin-bottom: 30px;
        text-decoration: none;
        word-spacing: -4px;
    }
`
export default SignIn