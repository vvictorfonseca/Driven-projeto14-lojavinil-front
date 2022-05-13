import { Link } from 'react-router-dom';
import styled from "styled-components"

function AuthHeader() {
    return (
        <ContainerHeader>
            <Link to={"/"} style={{ textDecoration: 'none'}}>
            <h1>Vinil</h1>
            </Link>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    height: 80px;
    background-color: #F5DEB3;
    position:relative;

    h1{
        background-color: #F5DEB3;
        font-family: 'Yesteryear', cursive;
        font-size: 45px;
        color: #000000;
    }
`
export default AuthHeader