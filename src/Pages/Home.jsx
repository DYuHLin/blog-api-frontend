import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios({method:'GET', url:`${import.meta.env.VITE_URI}/api`}, {headers: { "Content-Type": "application/json" }})
        .then(res => {
          setPosts(res.data);
        })
        .catch(err => console.log(err));  
    
  }, []);

  return (
    
    <section>
      <h1 className='home-title'>Welcome to my blog site</h1>
      {posts.length === 0 ? <p>There are no posts</p> :
      posts.map((blog) => {
        return(
          <Link key={blog._id} to={`${blog._id}`} className="blog blog-title-home">
              
            <h3 className="blog-title-home">{blog.title}</h3>
            <br/>
            <span className="blog-title-home">{new Date(blog.date).toLocaleString()}</span>
            <p>{blog.user.username}</p>   
            
          </Link>
        )
      })}
    </section>
  )
}

export default Home
