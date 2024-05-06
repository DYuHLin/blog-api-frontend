import React, { useContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext'
import {useNavigate, useParams, Navigate} from 'react-router-dom'
import axios from 'axios'

function Delete() {
  const [post, setPost] = useState(false);

  const {user} = useContext(UserContext);

  const getUserDecoded = () => {
    return user === false ? false : jwtDecode(user.accessToken);
  };

  const [decodedUser, setDecodedUser] = useState(getUserDecoded);

  let { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => { 
    e.preventDefault();
    const decoded = jwtDecode(user.accessToken);

    try{
      axios.delete(`http://localhost:5000/api/${id}/delete`, {
      headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + user.accessToken
                },
    });
    }catch(err){
      console.log(err);
    };
    navigate('/posts');
  };

  useEffect(() => {
    axios({method:'GET', url:`http://localhost:5000/api/${id}`})
        .then(res => {
          setPost(res.data);
        })
        .catch(err => console.log(err));   
}, []);

  return (
    !post ? (""): 
    post.user._id !== decodedUser.user._id ? (<Navigate to="/posts" />) :
    post.user._id === decodedUser.user._id ? (
      <section>
        <h1>Delete</h1>
        <h3>{post.title}</h3>
        <p>{post.published === false ? 'Unpublished' : 'Published'}</p>
        <span>{post.date}</span>
        <form method="POST" onSubmit={handleSubmit}>
          <h3>Are you sure you want to delete this blog?</h3>
          <button>Delete</button>
        </form>
    </section>
    ) : ""
  )
}

export default Delete