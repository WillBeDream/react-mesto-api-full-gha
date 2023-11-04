import { useState, useEffect} from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { register, authorize, getToken } from "../utils/Auth.js";
import './Header.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import React from 'react';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddCardPopup from './AddCardPopup.jsx';
import AvatarPopup from './AvatarPopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from "../utils/Api.js";
import currentContext from '../contexts/CurrentUserContext.js';
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.js";
import {InfoTooltipFalse, InfoTooltipTrue} from "./InfoTolltip.jsx";

function App() {

  const [isOpenEditPopup, setIsOpenEditPopup] = useState(false);
  const [isOpenAddPopup, setIsOpenAddPopup] = useState(false);
  const [isOpenAvatarPopup, setIsOpenAvatarPopup] = useState(false);
  const [isOpenimagePopup, setIsOpenImagePopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailDisplay, setEmailDisplay] = useState('');
  const [isSucceful, setIsSuccesful] = useState(false);
  const [isError, setIsError] = useState(false);
 
  const navigate = useNavigate();
  
  useEffect(()=>{
    checkToken();
    Promise.all([api.getInfo(localStorage.getItem('token')), api.getInitialCards(localStorage.getItem('token'))])
    .then(([userInfo, dataCards])=>{
      setCurrentUser(userInfo);
      setCards(dataCards);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  function allClosePopups() {
    setIsOpenAvatarPopup(false);
    setIsOpenEditPopup(false);
    setIsOpenAddPopup(false);
    setIsOpenImagePopup(false);
    setSelectedCard({});
    setIsError(false);
    setIsSuccesful(false);
  };

  function handleEditAvatarClick() {
    setIsOpenAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setIsOpenEditPopup(true);
  }

  function handleAddPlaceClick() {
    setIsOpenAddPopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsOpenImagePopup(true);
    console.log(card);
  }

  async function handleDeleteCard(card) {
    try {
      const result = await api.deleteCard(card._id, localStorage.getItem('token'));
      setCards(cards.filter(item=>item._id!==card._id));
    }
    catch(err) {
      console.log(err);
    }
    
  }

  async function handleUpdateUser(data) {
    try{
      const result = await api.setInfo(data, localStorage.getItem('token'));
      setCurrentUser(result);
      allClosePopups();
    }
    catch(err) {
      console.log(err);
    }
    
  }

  async function handleUpdateAvatar(data) {
    try {
      const result = await api.setAvatar(data, localStorage.getItem('token'));
      setCurrentUser(result);
      allClosePopups();
    }
    catch(err) {
      console.log(err);
    }
  }

  async function handleAddCard(data) {
    try {
      const result = await api.addCard(data, localStorage.getItem('token'));
      setCards((items)=>[result, ...items]);
      allClosePopups();
    }
    catch(err) {
      console.log(err);
    }
  }

  async function registerUser(email, password) {
    try{
      const result = await register(email, password)
      .then(()=>{
        setIsSuccesful(true);
        navigate('/', {replace:true});
      })
    }
    catch (err) {
      setIsError(true);
      console.log(err);  
    }    
  }

  function authorizeUser(email, password) {
    authorize(email, password)
    .then((res)=>{
      if(res.token) {
        console.log(res);
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setEmailDisplay(email);
        navigate("/", {replace:true});
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  async function checkToken() {
    const token = localStorage.getItem("token");
    if(token) {
      await getToken(token)
      .then((res)=>{
        setLoggedIn(true);
        setEmailDisplay(res.email);
        navigate('/', {replace:true});
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  return (

    <currentContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} emailDisplay={emailDisplay} handleLogOut ={handleLogOut} />

        <Routes>
          <Route path="/sign-in" element={<Login handleAuthorize = {authorizeUser} /*handleLogin ={handleLogin}*/ />}></Route>
          <Route path="/sign-up" element={<Register  handleRegister={registerUser} />}></Route>
          <Route path="/" element = {
            <ProtectedRoute 
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onDeleteCard ={handleDeleteCard}
              cards = {cards}
              isLogged={loggedIn}
            />
          }></Route>
          
        </Routes>

        <Footer />

        <EditProfilePopup
          onClose={allClosePopups}
          isOpen={isOpenEditPopup}
          onUpdateUser ={handleUpdateUser}
        ></EditProfilePopup>

        <AddCardPopup
          onClose={allClosePopups}
          isOpen={isOpenAddPopup}
          onAddPlace ={handleAddCard}
        ></AddCardPopup>

        <AvatarPopup
          onClose={allClosePopups}
          isOpen={isOpenAvatarPopup}
          onUpdateAvatar ={handleUpdateAvatar}
        ></AvatarPopup>

        <ImagePopup card={selectedCard} onClose={allClosePopups} isOpen={isOpenimagePopup}></ImagePopup>

        <InfoTooltipTrue isOpen={isSucceful} closePopup={allClosePopups} ></InfoTooltipTrue>
        <InfoTooltipFalse isOpen={isError} closePopup={allClosePopups} ></InfoTooltipFalse>  
  
      </div>
    </currentContext.Provider>
  );
}

export default App;
