import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { decryptPassword } from './Constants';
import '../App.css';
import Axios from 'axios';
import * as CryptoJS from 'crypto-js';

export default function AlertDialog({record}) {
    const {id, username, title, password} = record;
    const [open, setOpen] = React.useState(false);

    const [newUsername, setNewUsername] = React.useState(username);
    const [newTitle, setNewTitle] = React.useState(title);
    const [newPassword, setNewPassword] = React.useState(decryptPassword(password));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () =>{
        const reqPayload = {id: id, password: CryptoJS.AES.encrypt(newPassword,'thisissecretpassword').toString(), title: newTitle, username: newUsername};
        Axios.put('http://localhost:3001/updatePassword', reqPayload).catch((err)=>{
            console.log('Error Updating',err);
        });
        handleClose();
    }

    const handleChange = (e) =>{
        if(e.target.name==='title'){
            setNewTitle(e.target.value);
        }else if(e.target.name==='password'){
            setNewPassword(e.target.password);
        }else{
            setNewUsername(e.target.username);
        }
    }

    return (
        <div>
            <button className='updateBtn' onClick={handleClickOpen}>Update</button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className='center' id="alert-dialog-title">
                    {"Edit username or password"}
                </DialogTitle>
                <DialogContent>
                    <div style={{margin: '8px', padding: '8px'}}>
                        <TextField name={'title'} onChange={(e)=>setNewTitle(e.target.value)}  fullWidth sx={{
                            marginBottom: '16px'
                        }} id="outlined-basic" label="Title" value={newTitle}  variant="outlined" />
                        <TextField name={'username'} onChange={(e)=>setNewUsername(e.target.value)}  fullWidth sx={{
                            marginBottom: '16px'
                        }} id="outlined-basic" label="Username" value={newUsername} variant="outlined" />
                        <TextField name={'password'}  onChange={(e)=>setNewPassword(e.target.value)} fullWidth sx={{
                            marginBottom: '16px'
                        }} id="outlined-basic" label="Password" value={newPassword} variant="outlined" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}