import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

const Settings =(props)=> {
    // Variables

    // States
    const [display, setDisplay] = useState(0);
    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        password: "",
        profileImage:"",
        notifications: false,
        darkMode: true,
        balance: 0,
    });
    const [ops, setOps] = useState(1)
    const [error, setError] = useState(false)

    // On Load
    useEffect(()=>{
        setUser(props.user)
    },[])
    useEffect(()=>{
        props.setUser(user);
    },[user])

    // Page Functions
    const changeOps =(num)=> {
        setOps(num)
    }
    const changeDisplay =(num)=> {
        setDisplay(num)
        setUser(props.user)
    };
    const logout =()=> {
        logoutUser();
        Cookies.remove('jwt', {path: ''});
        props.setUser({id:0,balance:0});
        props.setPage(0);
    };
    const deleteButton =()=> {
        deleteUser();
        Cookies.remove('jwt', {path: ''});
        props.setUser({id:0,balance:0});
        props.setPage(0);
    };
    const editSubmit =(event)=> {
        event.preventDefault();
        let editedUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            profileImage: user.profileImage,
            notifications: user.notifications,
            darkMode: user.darkMode,
            balance: user.balance,
        }
        let quantity = 0
        for (let i=0;i<event.target.length;i++){
            let change = event.target[i].value
            if (event.target[i].value === "") {
                change = event.target[i].placeholder
            }
            if (event.target[i].name === "balance") {                  
                quantity = (event.target[i].value)*ops
                change = user.balance + (event.target[i].value)*ops
            }
            editedUser = {...editedUser, [event.target[i].name]:change}
        }
        let order = {
            type: (ops===1?"Deposit":"Withdraw"),
            quantity:quantity,
            price: 1,
            user: props.user.id,
            asset: 4
        }
        if(quantity*(-1)>props.user.balance){
            setError(true)
        } else {
            createOrder(order);
            setUser(editedUser)
            setDisplay(1)
        }
    };
    const toggleNotifications =(event)=> {        
        let change = false;
        if(user.notifications){
            change = false
        } else {
            change = true
        }
        setUser({...user, [event.target.name]:change});
    }
    const toggleDarkMode =(event)=> {     
        let change = false;
        if(user.darkMode){
            change = false
        } else {
            change = true
        }
        setUser({...user, [event.target.name]:change});  
    }

    // Connection Functions 
    const logoutUser = () => {
        axios.post(props.baseURL + 'user/logout', { withCredentials: true })
        .then((res) => {
            
            console.log(res)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))  
    };
    const deleteUser = () => {
        axios.post(props.baseURL + 'user/delete', { withCredentials: true })
        .then((res) => {
            
            console.log(res)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))  
    };
    const createOrder =  (order) => {
        axios.post(props.baseURL + 'order/insert', order, { withCredentials: true })
        .then((res) => {

            console.log(res)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))     
    }

    // HTML Functions
    const HtmlDelete =()=> {
        return (<button onClick={deleteButton}>Delete</button>)
    };
    const HtmlSettings =()=> {
        return (
        <>
            <h1>Settings</h1>
            <p>Dark Mode:</p>
            <label className="switch">
                <input onChange={toggleDarkMode} name='darkMode' type="checkbox" checked={user.darkMode===true}/>
                <span className='slider' id='dark-toggle'></span>
            </label>
            <p>Notifications:</p>
            <label className="switch">
                <input onChange={toggleNotifications} name='notifications' type="checkbox" checked={user.notifications===true}/>
                <span className='slider'></span>
            </label>
        </>
        )
    };
    const HtmlDeposit =()=> {
        return (
        <>
            <h1>Manage Finances</h1>
            <div>
            <label htmlFor="html">Deposit:</label>
            <input onChange={()=>{changeOps(1)}} type="radio" name="ops" value="Deposit"/>
            <label htmlFor="html">Withdraw:</label>
            <input onChange={()=>{changeOps(-1)}} type="radio" name="ops" value="Deposit"/>
            </div>
            {error?
            <>
            <p>You cannot withdraw more then the available in your current balance.</p>
            <p>Right now your limit is ${props.user.balance}.</p>
            </>
            :null}
            <form onSubmit={editSubmit}>
                <label htmlFor="name">{(ops===1)?"Deposit":"Withdraw"} Amount:</label>
                <br/>
                <input type='number' name="balance"/>
                <br/>
                <br/>
                <input className='form-button' type='submit'/>
            </form>
        </>
        )
    };
    const HtmlProfile =()=> {
        return (
        <>
            <h1>Profile</h1>
            <button onClick={()=>{changeDisplay(8)}}>Edit Profile</button>
            <h3>ID:</h3>
            <p>{props.user.id}</p>
            <h3>Name:</h3>
            <p>{props.user.name}</p>
            <h3>Email:</h3>
            <p>{props.user.email}</p>
            <h3>Profile Image:</h3>
            <p>{props.user.profileImage}</p>
            <h3>Balance:</h3>
            <p>{(Math.round(props.user.balance * 100) / 100).toFixed(2)}</p>
            <h3>Notifications:</h3>
            <p>{(props.user.notifications===true)?"True":"False"}</p>
            <h3>Dark Mode:</h3>
            <p>{(props.user.darkMode===true)?"True":"False"}</p>
        </>
        )
    };
    const HtmlEditProfile =()=> {
        return (
        <>
            <h1>EditProfile</h1>
            <form onSubmit={editSubmit}>
                <label htmlFor="name">Name:</label>
                <br/>
                <input className='login-field' type='text' name="name" placeholder={user.name}/>
                <br/>
                <br/>
                <label htmlFor="name">Email:</label>
                <br/>
                <input className='login-field' type='text' name="email" placeholder={user.email}/>
                <br/>
                <br/>
                <label htmlFor="name">Profile Image:</label>
                <br/>
                <input className='login-field' type='text' name="profileImage" placeholder={user.profileImage}/>
                <br/>
                <br/>
                <input className='form-button' type='submit'/>
            </form>
        </>
        )
    };

    // Render
    return (
    <section id='settings'>
        <h1>Settings</h1>
        <div id='settings-mobile'>
            {display>0?
            <button onClick={()=>{changeDisplay(0)}}>
                <i className="fa-sharp fa-solid fa-arrow-left"></i>
            </button>
            :null}
            {(display===0)?
            <div id='settings-options'>
                <ul>
                    <li onClick={()=>{changeDisplay(1)}}>Profile</li>
                    <li onClick={()=>{changeDisplay(3)}}>Settings</li>
                    <li onClick={()=>{changeDisplay(4)}}>Finances</li>
                    <li onClick={()=>{changeDisplay(5)}}>Delete Account</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            </div>            
            :null}
            {(display===1)?HtmlProfile():null}
            {(display===8)?HtmlEditProfile():null}
            {(display===3)?HtmlSettings():null}
            {(display===4)?HtmlDeposit():null}
            {(display===5)?HtmlDelete():null}
        </div>
        <div id='settings-browser'>
            <div id='settings-options'>
                <ul>
                    <li onClick={()=>{changeDisplay(0)}}>Profile</li>
                    <li onClick={()=>{changeDisplay(3)}}>Settings</li>
                    <li onClick={()=>{changeDisplay(4)}}>Finances</li>
                    <li onClick={()=>{changeDisplay(5)}}>Delete Account</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            </div>
            <div id='separation'></div>
            <div id='settings-display'>
                {(display===0 || display===1)?HtmlProfile():null}
                {(display===8)?HtmlEditProfile():null}
                {(display===3)?HtmlSettings():null}
                {(display===4)?HtmlDeposit():null}
                {(display===5)?HtmlDelete():null}
            </div>
        </div>
    </section>
    );
}

export default Settings;