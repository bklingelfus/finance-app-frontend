import { useState, useEffect } from 'react'
import axios from 'axios';

const Register =(props)=> {
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

    const loginSubmit = (event)=> {
        event.preventDefault();
        console.log(user)
        console.log(props.baseURL)
        registerUser(user);
        
        props.setPage(5)
    };

    // Connection Functions 
    const registerUser = (newUser) => {
        axios.post(props.baseURL + 'user/register', newUser)
        .then((res) => {
    
            console.log(res)
    
        }, (err) => console.log(err))
        .catch((error) => console.log(error))  
    }

    // HTML Functions

    // Render
    return (
    <section id='login'>
        <h1>Register</h1>
            <form onSubmit={loginSubmit}>
                <label htmlFor="name">Name:</label>
                <br/>
                <input className='login-field' type='text' name="name" onChange={handleChange}/>
                <br/>
                <br/>
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
            <button className='create-log' onClick={()=>{props.setPage(5)}}>Already have an Account?</button>
    </section>
    );
}

export default Register;