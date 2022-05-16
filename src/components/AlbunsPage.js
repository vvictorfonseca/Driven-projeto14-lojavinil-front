import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

import UserContext from '../context/UserContext.js';
import axios from 'axios';

import Header from "./Header";

function AlbunsPage() {

    const [albuns, setAlbuns] = useState([]);
    const { categoria, setIdAlbum } = useContext(UserContext);
    const filterCategories = albuns.filter(categorie => categorie.id === categoria);
    console.log(filterCategories);

    useEffect(() => {
        const promise = axios.get("https://projeto-loja-vinil.herokuapp.com/albuns");
        promise.then((response) => {
            const { data } = response;
            setAlbuns(data);
            console.log(data);
        })
        promise.catch(err => console.log(err.response));
    }, []);

    return filterCategories.length > 0 ? (
        <>
            <Header />
            <Main>
                <BodyAlbum>
                    {
                        filterCategories.map(vinil => {
                            const { _id, banda, album, url, preco } = vinil;
                            return (
                                <CapaAlbum imagePath={url}>
                                    <Link to="/descricao" style={{ textDecoration: 'none' }} onClick={() =>{
                                        setIdAlbum(_id)
                                    }}>
                                        <img src={url} key={_id} />
                                        <p>{banda}</p>
                                    </Link>
                                </CapaAlbum>
                            )
                        })
                    }
                </BodyAlbum>
            </Main>
        </>
    ) : (
        <>
        <Header />
        <Main>
            <span>Carregando a página</span>
        </Main>
        </>
    );
}

const BodyAlbum = styled.section`
    width: 375px;;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`

const CapaAlbum = styled.article`
    width: 150px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 10px;
    margin-top:25px;

    p{
        font-size:16px;
        color:#000000;
        font-weight:400;
        word-spacing: -4px;
        margin-top:2px;
    }
    
    img{
        width: 150px;
        border-radius: 5px;
    }
`

const Main = styled.main`
    width: 375px;;
    margin: auto auto;
    background-color: #F5DEB3;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:25px;
    border-radius: 5px;
`


export default AlbunsPage