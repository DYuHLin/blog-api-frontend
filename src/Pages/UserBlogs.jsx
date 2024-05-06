import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function UserBlogs() {
    const [posts, setPosts] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [visibility, setVisibility] = useState("hidden");

    const getUserDecoded = () => {
      return user === false ? false : jwtDecode(user.accessToken);
    };
  
    const [decodedUser, setDecodedUser] = useState(getUserDecoded);
    const navigate = useNavigate();

    const logout = async () => {
      const token = { token: user.refreshToken };
      axios.post("/api/logout", token, {
          headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer " + user.accessToken
              }
      });
      setUser(false);
    };

    const deleteUser = () => {
      try{
      const userId = {id: decodedUser.user._id};
      axios.delete(`/api/logout/${decodedUser.user._id}/delete`, {
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + user.accessToken
        }
      });
      setUser(false);
      navigate('/posts');
      }catch(err){
        console.log(err);
      };
    };

    useEffect(() => {
        const decoded = jwtDecode(user.accessToken);
        axios({method: "GET", url: `/api/user/${decoded.user._id}`}, {headers: {"Content-Type": "application/json"}})
        .then(res => setPosts(res.data)
        ).catch(err => console.log(err));   
      }, []);

  return (
    <section>
      <h1>{decodedUser.user.username}</h1>
      <div className='detail-link'>
            <a onClick={logout} className='head-link2'>Logout</a>
            <a onClick={() => setVisibility("")} className='head-link2'>Delete account</a>
      </div>
      <button className={visibility} onClick={deleteUser}>Are you sure?</button>
      {posts === false ? <p>There are no posts</p> :
      posts.map((blog) => {
        return(
          <Link to={`/posts/${blog._id}`} className="blog blog-title-home" key={blog._id}>    
            <h3 className="blog-title-home">{blog.title}</h3>
            <br/>
            <span className="blog-title-home">{new Date(blog.date).toLocaleString()}</span>
            <p className="blog-title-home">{blog.published === false ? 'Unpublished' : 'Published'}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default UserBlogs