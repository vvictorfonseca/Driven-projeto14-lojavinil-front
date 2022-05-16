import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import styled from "styled-components";
import UserContext from '../context/UserContext.js';
import axios from "axios";

import Header from "./Header";
import Main from "./stylesAll/Main";
import CapaAlbum from './stylesAll/CapaAlbum';

function AlbunsPage() {

    const [albuns, setAlbuns] = useState([]);
    const { categoria } = useContext(UserContext);
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
                return  (
                   <CapaAlbum imagePath={url}>
                        <Link to="/descricao" style={{ textDecoration: 'none' }} onClick={() => {
                            setIdAlbum(_id)
                        }}>
                            <img src={url} key={_id}/>
                            <p>{`${banda} - ${album}`}</p>
                        </Link>
                        <p>{`por: R$ ${preco}`}</p>
                  </CapaAlbum>
                   )
                })
            }
       </BodyAlbum>
       </Main>
       </>
    ) : (
        <Main>
            <span>Carregando a página</span>
        </Main>
    );
}

const BodyAlbum = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    `

export default AlbunsPage