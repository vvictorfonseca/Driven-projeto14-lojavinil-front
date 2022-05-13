import styled from "styled-components";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext.js';

function Header() {

    const { setToken, nameUser } = useContext(UserContext)

    const navigate = useNavigate();

    function logOut() {
        if (window.confirm("Você deseja se deslogar?")) {
            window.localStorage.removeItem('user');
            window.localStorage.clear('user');
            setToken(null);
            navigate("/");
        }
    }

    return (
        <ContainerHeader>

            <ContainerLogin>
                <Link to={"/signin"} style={{ textDecoration: 'none' }}>
                    <p>Entrar</p>
                </Link>

                <SeparadorVertical></SeparadorVertical>

                <Link to={"/signup"} style={{ textDecoration: 'none' }} >
                    <p className='cadastrar'>Cadastrar</p>
                </Link>
            </ContainerLogin>

            <h1>Vinil</h1>

            <ContainerLogof>
            <ion-icon name="cart-outline"></ion-icon>
            
            <ion-icon name="log-out-outline" onClick={() => { logOut() }} ></ion-icon>
            </ContainerLogof>
        
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
    height: 80px;
    background-color: #F5DEB3;

    h1{
        background-color: #F5DEB3;
        font-family: 'Yesteryear', cursive;
        font-size: 45px;
        margin-right: 85px;
    }

    ion-icon{
        font-size:32px;
        cursor: pointer;
    }
`
const ContainerLogin = styled.div`
    display:flex;
    margin-left: 25px;

    p:first-child{
        color: #000000;
    }
`
const SeparadorVertical = styled.div`
    width: 1px;
    height: 22px;
    background-color: #2F4F4F;
    margin-left: 10px;
    margin-right: 10px
`
const ContainerLogof = styled.div`
    width: 80px;
    display: flex;
    justify-content:space-between;
    margin-right: 25px;
`
export default Header