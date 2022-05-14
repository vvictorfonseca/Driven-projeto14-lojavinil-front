import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
import Header from "./Header";

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
        <Main>
        <Header />
        <BodyAlbum>
            {
            filterCategories.map(vinil => {
                const {banda, album, url, preco } = vinil;
                return  (
                   <CapaAlbum imagePath={posterURL}>
                        <Link to={`/carrinho/${id}`}>
                            <img src={posterURL} alt={title} key={id}/>
                        </Link>
                  </CapaAlbum>
                   )
                })
            }
        </BodyAlbum>
        </Main>
    ) : (
        <Main>
            <span>Carregando a página</span>
        </Main>
    );
}

export default AlbunsPage