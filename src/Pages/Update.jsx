import React, { useContext, useEffect, useRef, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext';
import {useNavigate, useParams, Navigate} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill';

function Update() {
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState('');
  const [post, setPost] = useState(false);

  const {user} = useContext(UserContext);
  const getUserDecoded = () => {
    return user === false ? false : jwtDecode(user.accessToken);
  };

  const [decodedUser, setDecodedUser] = useState(getUserDecoded);
  let { id } = useParams();
  const navigate = useNavigate();

  const toolbarOptions = [['bold', 'italic', 'underline', 'strike'],  
  ['blockquote', 'code-block'], ['link', 'image', 'video', 'formula'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      
  [{ 'indent': '-1'}, { 'indent': '+1' }],         
  [{ 'direction': 'rtl' }], [{ 'size': ['small', false, 'large', 'huge'] }],  
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'color': [] }, { 'background': [] }],          
  [{ 'font': [] }], [{ 'align': [] }], ['clean']];

  const module = {
    toolbar: toolbarOptions
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    const checkBox = document.getElementById('publish');
    const decoded = jwtDecode(user.accessToken);
    let publishVal = false;
    if(checkBox.checked){
      publishVal = true;
    } else{
      publishVal = false;
    };

    const post = {user: decoded.user._id, title: title, content: blog, published: publishVal};

    try{
      axios.put(`${import.meta.env.VITE_URI}/api/${id}/update`, post, {
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + user.accessToken
        },
    });
    }catch(err){
      console.log(err);
    };
    
    navigate('/');
    toast.success("You have updated this blog successfully");
  };

  useEffect(() => {
    axios({method:'GET', url:`${import.meta.env.VITE_URI}/api/${id}`}, {headers: { "Content-Type": "application/json", "authorization": "Bearer " + user.accessToken }})
        .then(res => {
          setPost(res.data);
          setTitle(res.data.title)
          setBlog(res.data.content);
        })
        .catch(err => console.log(err));   
}, []);

  return (
    !post ? (""): 
    post.user._id !== decodedUser.user._id ? (<Navigate to="/posts" />) :
    post.user._id === decodedUser.user._id ? (
      <section>
      <form method="POST" onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
        <input type="text" required name='title' id='title' className='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="body">Body: </label>
        <div className="ql-editor">
          <ReactQuill modules={module} theme="snow" value={blog} onChange={setBlog} />
          </div> 
          <div className="check-group">
            <label htmlFor="publish">Publish: </label>
            <input type="checkbox" id='publish' name='publish' className='publish'/>
          </div>
        <button>Post Blog</button>
      </form>
    </section>
    ): ""
      
  ) 
}

export default Update