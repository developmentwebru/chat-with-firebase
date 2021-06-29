import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import { createContext } from 'react';


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDc61mg9t1VJ-FQakgGP0YgObkTislxGVM",
  authDomain: "chat-react-7afa5.firebaseapp.com",
  projectId: "chat-react-7afa5",
  storageBucket: "chat-react-7afa5.appspot.com",
  messagingSenderId: "97579506131",
  appId: "1:97579506131:web:dc2061c19821af5a7db726",
  measurementId: "G-VQF5WTD8QT"
});

//чтобы не перекидывать через пропсы создадим контекст
export const Context = createContext(null)

const auth = firebase.auth() //объект с помощью которого мы авторизуемся
const firestore = firebase.firestore()

ReactDOM.render(
  // обернем все наше приложение в контекст провайдер, для того чтобы прокинуть  все внутрь и затем чтобы этим пользоваться внутри.
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);


