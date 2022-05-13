import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import GlobalStyle from "./css/GlobalStyle.js";

import UserContext from "../context/UserContext.js";

import HomePage from "./HomePage.js"
import AlbunsPage from "./AlbunsPage.js";

function App() {

    const [categoria, setCategoria] = useState("")

    const contextValue = {categoria, setCategoria}

    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <UserContext.Provider value={contextValue}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/albuns/:idgenero" element={<AlbunsPage />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;