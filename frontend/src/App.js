import React, {useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import * as CryptoJS from 'crypto-js';

function App() {
  const [title, setTitle] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [records, setRecords] = React.useState('');


  useEffect(()=>{
    
  },[]);

  const handleChange = (e) => {
    if(e.target.name==='title'){
      setTitle(e.target.value);
    }else{
      setPassword(e.target.value);
    }
  }
  const handleSubmit = () => {
    const requestPayload = {password: CryptoJS.AES.encrypt(password,'thisissecretpassword').toString(), title:title};
    Axios.post('http://localhost:3001/addPassword',requestPayload);
    setPassword('');
    setTitle('');
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
  const decryptPassword = (password)=>{
    const decrypted = CryptoJS.AES.decrypt(password, 'thisissecretpassword');
    if (decrypted) {
      try {
        const str = decrypted.toString(CryptoJS.enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return 'error 1';
        } 
      } catch (e) {
        return 'error 2';
      }
    }
    return 'error 3';
  }
  return (
    <>
    <div className='App'>
      <input name={'title'} onChange={handleChange} type={'text'} value={title} placeholder="Title" />
      <input name={'password'} onChange={handleChange} type={'password'} value={password} placeholder="Password" />
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </div>
    <div className='App'>
      <button type='submit' onClick={getData}>Get all records</button>
      <div className='recordContainer'>
      {records && records.length>0 && records.map((record)=>(
        <div key={record.id} className={'record'}>
          <p>Title: {record.title}</p>
          <p>Password: {decryptPassword(record.password)}</p>
        </div>
      ))}
      </div>
    </div>
    </>
  );
}

export default App;
