import React, { useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import UserContext from '../UserContext';
import axios from 'axios';

function Comments(props) {
  const { user } = useContext(UserContext);
  let userDecoded = user === false ? false : jwtDecode(user.accessToken);

  const deleteComments = (id) => {
    try{
      axios.delete(`/api/${id}/deletecomment`, {
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + user.accessToken
        },
    });
    }catch(err){
      console.log(err);
    };
  };

  return (
      <div className="blog">
        {props.comments.map((comment) => {
          return(
            <div className='comment-section' key={comment._id}>
              <div className="comment2">
                <h3>{comment.content}</h3>
                <span>{new Date(comment.date).toLocaleString()}</span>
                <p>{comment.user.name}</p> 
              </div>
              {
                 userDecoded === false ?(
                  ""
                ) : userDecoded.user._id === comment.user._id ? (
                  <form method="DELETE" onSubmit={e =>  {e.preventDefault(); deleteComments(comment._id)}} className='delete-form'><button className='delete-btn'><i className='bx bx-trash'></i></button> </form>
                ) : ""
              }                        
            </div>
          )
        })}
      </div>
  )
}

export default Comments