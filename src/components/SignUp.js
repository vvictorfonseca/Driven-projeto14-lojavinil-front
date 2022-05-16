import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import styled from "styled-components"

import UserContext from '../context/UserContext.js';
import axios from 'axios';

import AuthHeader from "./AuthHeader.js";

function SignUp() {

    const { userData, setUserData } = useContext(UserContext)

    const navigate = useNavigate();

    const ObjRegister = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
    }

    const URL = "https://projeto-loja-vinil.herokuapp.com/signup"

    function handleRegister(e) {
        e.preventDefault();
        const promise = axios.post(URL, ObjRegister)

        promise.then(response => {
            const { data } = response
            setUserData({...userData, email: ""});
            setUserData({...userData, password: ""});
            setUserData({...userData, confirmPassword: ""});
            navigate("/signin");
        })
    }

    const loadInputs = inputs()

    function inputs() {
        return (
            <form onSubmit={ handleRegister } >
                <input type="text" placeholder='Nome' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} ></input>
                <input type="email" placeholder='E-mail' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} ></input>
                <input type="password" placeholder='Senha' value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} ></input>
                <input type="password" placeholder='Confirme a Senha' value={userData.confirmPassword} onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} ></input>
                <button type='submit'>Cadastrar</button>
            </form>
        )
    }

    return (
        <>
            <AuthHeader />
            <ContainerSignUp>
                {loadInputs}
                <Link to='/signin' style={{ textDecoration: 'none' }}> <p>Já tem uma conta? Entre agora!</p> </Link>
            </ContainerSignUp>
        </>
    )
}

const ContainerSignUp = styled.div`
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

export default SignUp