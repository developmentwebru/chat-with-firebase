import './App.css';
import { BrowserRouter as Router, } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from 'react'
import { Context } from './index'

function App() {
  const { auth } = useContext(Context)
  const [user, loading] = useAuthState(auth) //хук из модуля react-firebase-hooks 

  if (loading) { // показываем лоадер 
    return <Loader />
  }

  return (
    <div className="App">
      <Router>  
        <Navbar />
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
