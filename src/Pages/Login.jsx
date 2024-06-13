import React, { useState, useContext } from 'react'
import axios from 'axios';
import UserContext from '../UserContext';
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`${import.meta.env.VITE_URI}/api/login`, {username, password}, {headers: { "Content-Type": "application/json" }});
      if(res.data === "name"){
        setError("This username does not exist.");
        toast.error("There was an error");
      } else if(res.data === "password"){
        setError("Your password is incorrect");
        toast.error("There was an error");
      } else {
        setUser(res.data);
        navigate('/');
        toast.success("You have logged in successfully");
      };
      
    }catch(err){
      console.log(err);
    };
  };

  const guestSign = async () => {
    await axios.post(`${import.meta.env.VITE_URI}/api/login`, {username: 'guest', password: 'guest123'}, {headers: { "Content-Type": "application/json" }});
  };

  return (
      <section>
        <h1>Login</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
          <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
          <button>Login</button>
        </form>
        <p className="error">{error}</p>
        <Link to={"/register"} className="link">Register</Link>
        <p onClick={() => guestSign}>Sign in as guest</p>
      </section>
  )
}

export default Login