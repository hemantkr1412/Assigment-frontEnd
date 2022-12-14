import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {useNavigate }from 'react-router-dom';
import { authActions } from '../store';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [inputs, setinput] = useState({
    name: '',
    email: '',
    password: ''
  });



  const handleChange = (e) => {
    setinput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sendRequest = async (type="signup") => {
    const res= await axios.post(`http://localhost:4000/api/user/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).catch((err) => {console.log(err)});

    const data= await res.data;

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      sendRequest()
      .then((data)=>{localStorage.setItem('Name', data.user.name);})
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/dashboard"));
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          display='flex' flexDirection="column" 
          alignItems="center" justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
          >
          <Typography fontFamily={'ui-monospace'} variant='h2' padding={3} textAlign={'center'}>
           Signup  
          </Typography>


       <TextField name='name' onChange={handleChange} value={inputs.name} type='text' placeholder='Name' margin='normal'/>
          <TextField name='email' onChange={handleChange} value={inputs.email} type='email' placeholder='Email' margin='normal'/>
          <TextField name='password' onChange={handleChange} value={inputs.password} type='password' placeholder='Password' margin='normal'/>
          <Button 
            type='submit'
            variant ="contained" 
            sx={{borderRadius:3, marginTop:3}} 
            color='warning' >
            Submit</Button>
          <Button 
            LinkComponent={Link} to='/login'
            sx={{borderRadius:3,marginTop:3}} >
            'Already have an account? Login' 
            </Button>
          
        </Box>
      </form>
    </div>
  )
}
export default Signup;
