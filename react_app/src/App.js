import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getCommentsThunk, deleteCommentThunk} from './store/comments.js'

import './App.css';

function App() {
  const dispatch = useDispatch()
  const comments = useSelector(store => store?.comments)
  const handleDelete = (id) => {
    dispatch(deleteCommentThunk(id))
  }
  useEffect(() => {
    dispatch(getCommentsThunk())
  },[dispatch])



  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column'
    }}>
      <h1 style={{
        position:'sticky',
        color:'rgb(255, 0, 179)',
        textShadow:'10px 10px 1px rgb(0, 255, 34),-10px -12px 1px rgb(0, 255, 34),-20px -22px 1px black, -30px -30px 1px rgb(255, 238, 0, 0.3)',
        
      }}>TOMMENTS</h1>
    <div className="App">
      
      {Object.keys(comments)?.map(id => {
        let comment = comments[id]
        return(
          
          <div key={comment.id} className='single-comment'>
              <div>{comment.user_name}</div>
              <div>{comment.id}</div>
              <button
                className='delete-Button'
                onClick={() => handleDelete(comment.id)}
              >
              Delete Me
              </button>
              <div>{comment.body}</div>
          </div>
          
        )
      })}
    </div>
    </div>
  );
}

export default App;
