import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Register() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = name.replace(/\s/g, "");
    const newSurname = surname.replace(/\s/g, "");
    const newUsername = username.replace(/\s/g, "");

    const register = {name: newName, surname: newSurname, username: newUsername, email, password, confirmedPassword};

    try{
          axios.post(`${import.meta.env.VITE_URI}/api/register`, register, {headers: { "Content-Type": "application/json" }})
           .then(res => res.data)
           .then(status => {
            if(status === "failed"){
              setError("This username already exists.");
              toast.error("There was an error");
            } else if(status === "match"){
              setError("your passwords do not match.");
              toast.error("There was an error");
            } else if(status === "ok"){
              navigate("/login");
              toast.success("You have registered successfully");
            };
            console.log(status)
          })
           .catch(err => console.log(err))
    }catch(err){
      console.log(err);
    };
      
  };

  return (
    <section>
      <h1>register</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="text" required name='name' id='name' className='name' onChange={(e) => setName(e.target.value)} placeholder='Name'/>
        <input type="text" required name='surname' id='surname' className='surname' onChange={(e) => setSurname(e.target.value)} placeholder='Surname'/>
        <input type="text" required name='username' id='username' className='username' onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
        <input type="email" required name='email' id='email' className='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        <input type="password" required name='password' id='password' className='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' minLength={6}/>
        <input type="password" required name='confirmedPassword' id='confirmedPassword' className='confirmedPassword' placeholder='Confirm password' onChange={(e) => setConfirmedPassword(e.target.value)} minLength={6}/>
        <button>Register</button>
        
      </form>
      <p className="error">{error}</p>
      <Link to={"/login"} className="link">Login</Link>
      </section>
  )
}

export default Register