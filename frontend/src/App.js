import React, {useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import * as CryptoJS from 'crypto-js';
import Password from './components/Password';

function App() {
  const [title, setTitle] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [records, setRecords] = React.useState('');

  const handleChange = (e) => {
    if(e.target.name==='title'){
      setTitle(e.target.value);
    }else if(e.target.name==='username'){
      setUserName(e.target.value);
    }else{
      setPassword(e.target.value);
    }
  }
  const handleSubmit = () => {
    if(title.length===0 || userName.length===0 || password.length===0) return;
    const requestPayload = {title:title,username: userName, password: CryptoJS.AES.encrypt(password,'thisissecretpassword').toString()};
    Axios.post('http://localhost:3001/addPassword',requestPayload);
    setPassword('');
    setTitle('');
    setUserName('');
  }

  /**
   * 1) frontend -> react
   * 2) OnSubmit -> Calling addPassword and storing in database
   * 3) GetAllRecords button -> Calling another api (retrieving from database)
   */

  const getData = () => {
    Axios.get('http://localhost:3001/getAllRecords')
    .then((res)=>{
      setRecords(res.data);
      console.log(res);
    })
    .catch((err)=>{
      console.warn(err);
    })
  }
  return (
    <>
    <div className='App'>
      <input name={'title'} onChange={handleChange} type={'text'} value={title} placeholder="Title" />
      <input name={'username'} onChange={handleChange} type={'text'} value={userName} placeholder="User name" />
      <input name={'password'} onChange={handleChange} type={'password'} value={password} placeholder="Password" />
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
    <div className='App'>
      <button type='submit' onClick={getData}>Refresh records</button>
      <div className='recordContainer'>
      {records && records.length>0 && records.map((record)=>(
        <Password key={record.id} record={record}/>
      ))}
      </div>
    </div>
    </>
  );
}

export default App;
