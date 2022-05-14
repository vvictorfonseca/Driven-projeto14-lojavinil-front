import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

import UserContext from '../context/UserContext.js';
import axios from 'axios';

import Header from "./Header";

function AlbunsPage() {

    const { categoria } = useContext(UserContext)
    console.log(categoria)

    return (
        <>
            <Header />
        </>
    )
}

export default AlbunsPage