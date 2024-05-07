import React, {useContext, useState, useRef} from 'react'
import { Editor } from '@tinymce/tinymce-react'
import {jwtDecode} from 'jwt-decode'
import UserContext from '../UserContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function create() {
  const [title, setTitle] = useState('');

  const {user} = useContext(UserContext);

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

    const post = {user: decoded.user._id, title: title, content: ContentRef.current.getContent(), published: publishVal};

    try{
      axios.post('/api/create', post, {
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
        <Editor apiKey='7b9bztrodn0kidftvkbg5tuk6lqiwpwtl934lt1s1av1ghzr' name="body" id="body" required className='body' 
          onInit={(evt, editor) => ContentRef.current = editor}/>
        
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