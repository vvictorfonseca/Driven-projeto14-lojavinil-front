import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import GlobalStyle from "./css/GlobalStyle.js";

import UserContext from "../context/UserContext.js";

import HomePage from "./HomePage.js"
import AlbunsPage from "./AlbunsPage.js";
import SignUp from "./SignUp.js"
import SignIn from "./SignIn.js";

function App() {

    const tokenStorage = JSON.parse(localStorage.getItem('token'));

    const [userData, setUserData] = useState({})
    const [token, setToken] = useState("")
    const [categoria, setCategoria] = useState("")
    const [nameUser, setNameUser] = useState("");

    const contextValue = {categoria, setCategoria, userData, setUserData, token, setToken, nameUser, setNameUser}

    useEffect(() => {
        if(tokenStorage){
            setToken(tokenStorage)
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
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;