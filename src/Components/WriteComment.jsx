import React, { useContext, useState } from 'react'
import UserContext from '../UserContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function WriteComment(props) {
    const { user } = useContext(UserContext);
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => { 
        e.preventDefault();
        const decoded = jwtDecode(user.accessToken);
    
        const comments = {user: decoded.user._id, post: props.post._id, content: comment};

        try{
          axios.post(`${import.meta.env.VITE_URI}/api/${props.paramId}/create`, comments, {
          headers: {
            "Content-Type": "application/json",
            "authorization": "Bearer " + user.accessToken
            },
        });
        }catch(err){
          console.log(err);
        };
        setComment("");
      };

  return (
    <>
    <form method="POST" onSubmit={handleSubmit}>
        <textarea name="comment" className='comment' id="" cols="30" rows="6" placeholder='Write a comment' onChange={(e) => setComment(e.target.value)} required value={comment}></textarea>
        <button>Comment</button>
    </form>
    </>
  )
}

export default WriteComment