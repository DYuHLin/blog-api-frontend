import React, {useContext, useState, useRef} from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill';
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function create() {
  const [title, setTitle] = useState('');
  const [blog, setBlog] = useState('');

  const {user} = useContext(UserContext);

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

  const ContentRef = useRef();
  const navigate = useNavigate();

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
      axios.post(`${import.meta.env.VITE_URI}/api/create`, post, {
      headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + user.accessToken
                }
    })
    } catch(err){
      console.log(err);
    }; 
    toast.success("You have posted this blog successfully");
    navigate('/');
  };

  return (
    <section>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="text" required name='title' id='title' className='title' onChange={(e) => setTitle(e.target.value)} placeholder='Title'/> 
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
  )
}

export default create