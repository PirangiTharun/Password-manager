import React, { useState } from 'react';
import '../App.css';
import { decryptPassword } from './Constants';
import Axios from 'axios';
import UpdateDialog from './UpdateDialog';

const Password = ({ record }) => {
    const { title, password, username } = record;
    const [open, setOpen] = useState(false);
    const [seePassword, setSeePassword] = useState(false);
    let starPassword = "•••••••••••";
    let srcValue = !seePassword ? "https://cdn-icons-png.flaticon.com/512/2767/2767146.png" : "https://cdn-icons-png.flaticon.com/512/2767/2767194.png"

    

    const deleteRecord = () => {
        const requestPayload = {id: record.id};
        Axios.post('http://localhost:3001/deleteRecord', requestPayload)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.warn(err);
            })
    }


    return (
        <div className='passwordContainer'>
            <div className='titleDiv' onClick={() => setOpen(!open)}>
                <p>{title}</p>
                <img className={open ? 'expanded' : ''}
                    src="https://img.icons8.com/ios-filled/256/expand-arrow.png" alt="expand" />
            </div>
            {open &&
                <div>
                    <div className='inputBox'><pre>{username}</pre></div>
                    <div className='inputBox'>
                        <pre>{seePassword ? decryptPassword(password) : starPassword}</pre>
                        <img onClick={() => setSeePassword(!seePassword)} style={{ cursor: 'pointer', height: '24px', alignItems: 'center' }} src={srcValue} alt="" />
                    </div>
                    <div style={{ width: '60%', float: 'right', marginBottom: '16px' }}>
                        <button className='deleteBtn' onClick={deleteRecord}>Delete</button>
                        <UpdateDialog record={record}/>
                    </div>
                </div>}
        </div>
    )
}

export default Password