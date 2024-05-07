import { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Home() {
  const [posts, setPosts] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const getBlogs = async () => {
    setLoading(true);
    try{
      const { data } = await axios.get("https://blog-api-backend-1tt8.onrender.com/api", {headers: { "Content-Type": "application/json" }})
        setPosts(data);
      setLoading(false);
    } catch(err){
      toast.error(err.message);
      setLoading(false);
    };
  };
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    
    <section>
      <h1 className='home-title'>Welcome to my blog site</h1>
      {
        loading && <p>Fetching blogs...</p>
      }
      
      {!loading && posts.length === 0 ? <p>There are no posts</p> :
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
