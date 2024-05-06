import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import axios from 'axios';
import WriteComment from '../Components/WriteComment';
import Comments from '../Components/Comments';
import { jwtDecode } from 'jwt-decode';

function Detail() {
    let { id } = useParams();
    const { user } = useContext(UserContext);
    
    const getUserDecoded = () => {
      return user === false ? false : jwtDecode(user.accessToken);
    };

    const [post, setPost] = useState(false);
    const [comments, setComments] = useState([]);
    const [decodedUser, setDecodedUser] = useState(getUserDecoded);

    useEffect(() => {
      axios({method:'GET', url:`/api/${id}`}, {headers: { "Content-Type": "application/json"}})
        .then(res => setPost(res.data))
        .catch(err => console.log(err)); 
    }, []);

    useEffect(() => {     
      axios({method:'GET', url:`/api/${id}/comments`}, {headers: { "Content-Type": "application/json"}})
        .then(res => setComments(res.data))
        .catch(err => console.log(err)); 

        
    }, [comments]);

  return (
    <section>
        <h1>{post.title}</h1>
        <p>{post === false ? "" : post.user.username}</p> 
        {!post ? (""):
        !decodedUser ? (""):
        post.user._id === decodedUser.user._id ? (
          <div className='detail-link'>
            <Link to={"update"} className="link-detail">Update</Link>
            <Link to={"delete"} className="link-detail">Delete</Link>
          </div>
        ) : ""
      }
        <div className='blog2' id='blog' dangerouslySetInnerHTML={ {__html: post.content} } />
        <p className='published'>{post.published === false ? 'Unpublished' : 'Published'}</p>
        {
          !decodedUser ? <p className='sign-in-message'>Sign in to comment</p> : <WriteComment paramId = {id} post = {post}/>
        }
        
        <Comments paramId = {id} post = {post} comments = {comments}/> 
    </section>
  )
}

export default Detail