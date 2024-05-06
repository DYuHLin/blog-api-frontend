import React, { useState, useContext } from 'react'
import axios from 'axios';
import UserContext from '../UserContext';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {setUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/login", {username, password}, {headers: { "Content-Type": "application/json" }});
      if(res.data === "name"){
        setError("This username does not exist.");
      } else if(res.data === "password"){
        setError("Your password is incorrect");
      } else {
        setUser(res.data);
        navigate('/posts');
      };
      
    }catch(err){
      console.log(err);
    };
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
        <Link to={"/posts/register"} className="link">Register</Link>
      </section>
  )
}

export default Login