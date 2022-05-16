import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalStyle from "./css/GlobalStyle";

import UserContext from "../context/UserContext";

import HomePage from "./HomePage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DescriptionPage from "./DescriptionPage";
import AlbunsPage from "./AlbunsPage";
import CartPage from "./CartPage"

function App() {

    const tokenStorage = JSON.parse(localStorage.getItem('token'));
    const nameStorage = JSON.parse(localStorage.getItem('name'));

    const [userData, setUserData] = useState({})
    const [token, setToken] = useState("")
    const [categoria, setCategoria] = useState("")
    const [nameUser, setNameUser] = useState("");
    const [allAlbuns, setAllAlbuns] = useState([]);
    const [idAlbum, setIdAlbum] = useState("");
    const [idUser, setIdUser] = useState("");
    const [allCarts, setallCarts] = useState([]);

    const contextValue = {categoria, setCategoria, userData, setUserData, token, setToken, nameUser, setNameUser, idAlbum, setIdAlbum, allAlbuns, setAllAlbuns, idUser, setIdUser, allCarts, setallCarts }

    useEffect(() => {
        if(tokenStorage){
            setToken(tokenStorage)
        }

        if(nameStorage){
            setNameUser(nameStorage)
        }
    }, []);

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={contextValue}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/albuns/:idgenero" element={<AlbunsPage />} />
                        <Route path="/descricao" element={<DescriptionPage />} />
                        <Route path="/carrinho" element={<CartPage />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;