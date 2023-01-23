import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

const Login =(props)=> {
    // Variables

    // States
    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        password: "",
        profileImage: "https://media.istockphoto.com/id/1210939712/vector/user-icon-people-icon-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=vKDH9j7PPMN-AiUX8vsKlmOonwx7wjqdKiLge7PX1ZQ=",
        darkMode: false,
        notifications: false,
        balance: 0
    });

    // On Load
    useEffect(()=>{
        if(props.user.id!=0){
            props.setPage(4)
        }
    },[])

    // Page Functions
    const handleChange =(event)=>{
        setUser({...user, [event.target.name]:event.target.value});
    };

    const loginSubmit =(event)=> {
        event.preventDefault();
        loginUser(user);
        
        props.setPage(0)
    };

    // Connection Functions 
    const loginUser = (userLogin) => {
        axios.post(props.baseURL + 'user/login', userLogin, { withCredentials: true })
        .then((res) => {

            Cookies.set('jwt', res.data.token, {secure:true, sameSite:'none', expires:1})
            props.setUser(res.data.user)

        }, (err) => console.log(err))
        .catch((error) => console.log(error))  
    }

    // HTML Functions

    // Render
    return (
    <section id='login'>
        <h1>Login</h1>
            <form onSubmit={loginSubmit}>
                <label htmlFor="name">Email:</label>
                <br/>
                <input className='login-field' type='text' name="email" onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor="name">Password:</label>
                <br/>
                <input className='login-field' type='password' name="password" onChange={handleChange}/>
                <br/>
                <br/>
                <input className='form-button' type='submit'/>
            </form>
            <br/>
            <button className='create-log' onClick={()=>{props.setPage(6)}}>Create an Account!</button>
    </section>
    );
}

export default Login;