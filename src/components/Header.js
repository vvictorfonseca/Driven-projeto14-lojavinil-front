import styled from "styled-components"

function Header() {
    return (
        <ContainerHeader>
            <p>Entrar</p>
            <div className="separador-vertical"></div>
            <p>Cadastrar</p>
            <h1>Vinil</h1>
            <ion-icon name="cart-outline"></ion-icon>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    display:flex;
    align-items:center;
    height: 80px;
    background-color: #F5DEB3;
    position:relative;

    h1{
        background-color: #F5DEB3;
        font-family: 'Yesteryear', cursive;
        font-size: 45px;
        margin-left: 452px;
    }

    p:first-child{
        margin-left: 25px;
    }

    div { 
        width: 1px;
        height: 22px;
        background-color: #2F4F4F;
        margin-left: 10px;
        margin-right: 10px;
    }

    ion-icon{
        position:absolute;
        right:0;
        margin-right: 25px;
        font-size:32px
    }
`
export default Header