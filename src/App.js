import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import User from './Pages/User';
import Stocks from './Pages/Stocks';
import News from './Pages/News';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import Register from './Pages/Register';

const App =()=> {
  // Variables
  const baseURL = "https://finance-app-be.herokuapp.com/api/"
  // const baseURL = "http://localhost:5000/api/"
  var loremIpsum = require('lorem-ipsum-react-native')
  , output     = loremIpsum();

  // States
  const [page, setPage] = useState(0);
  const [user, setUser] = useState({
    id: 0,
    balance: 0,
  });
  const [userDisplay, setUserDisplay] = useState(0);
  const [stockDisplay, setStockDisplay] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('XXXX')
  const [searchPage, setSearchPage] = useState(false)

  // On Load
  useEffect(()=>{
    getUser()
  }, [])
  useEffect(()=>{
    editUser(user)
  }, [user])

  // Page Functions

  // Connection Functions 
  const getUser =  () => {
    axios.get(baseURL + 'user/info', { withCredentials: true })
    .then((res) => {

      setUser(res.data)

    }, (err) => console.log(err))
    .catch((error) => console.log(error))     
  }
  const editUser = (editedUser) => {
    axios.post(baseURL + 'user/edit', editedUser,{ withCredentials: true })
    .then((res) => {
        
        console.log(res)

    }, (err) => console.log(err))
    .catch((error) => console.log(error))  
  };

  // HTML Functions

  // Render
  return (
    <main onClick={()=>{setSearchPage(false)}}>
    <Navbar setPage={setPage} page={page} user={user} setUserDisplay={setUserDisplay}/>
    {(page === 0?<Home user={user}/>:null)}
    {(page === 1?<User
      setUserDisplay={setUserDisplay}
      userDisplay={userDisplay}
      user={user}
      setUser={setUser}
      baseURL={baseURL}
      currentAsset={currentAsset}
      setCurrentAsset={setCurrentAsset}
      setSearchPage={setSearchPage}
      setPage={setPage} 
      setStockDisplay={setStockDisplay}
    />:null)}
    {(page === 2?<Stocks
      searchPage={searchPage}
      setSearchPage={setSearchPage}
      stockDisplay={stockDisplay}
      setStockDisplay={setStockDisplay}
      user={user}
      baseURL={baseURL}    
      currentAsset={currentAsset}
      setCurrentAsset={setCurrentAsset}
      setUserDisplay={setUserDisplay}
      setPage={setPage} 
    />:null)}
    {(page === 3?<News/>:null)}
    {(page === 4?<Settings 
          user={user} 
          setUser={setUser}
          setPage={setPage}
          baseURL={baseURL}
    />:null)}
    {(page === 5?<Login 
          setPage={setPage} 
          baseURL={baseURL}
          setUser={setUser}
    />:null)}
    {(page === 6?<Register 
          setPage={setPage} 
          baseURL={baseURL}
    />:null)}
    <Footer/>
    </main>
  );
}

export default App;
