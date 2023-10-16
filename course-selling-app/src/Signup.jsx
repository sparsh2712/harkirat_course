import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';

function Signup (){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return <div>
      <div style={{paddingTop:150,marginBottom:10, display:'flex', justifyContent:'center'}}>
        <Typography variant={'h6'}> Welcome to coursera. Signup below</Typography>
      </div>
    <div style={{display:"flex", justifyContent:'center'}}>
      <Card variant="outlined" sx={{width:'400px', padding:'20px'}}>
        <TextField 
          label="Username" 
          variant="outlined" 
          fullWidth={true} 
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />
        <br /> <br/ >
        <TextField 
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          label="Password" 
          variant="outlined" 
          type='password'
          fullWidth={true}
        />
        <br /> <br />
        <Button 
          variant="contained" 
          size='large'
          onClick={()=>{
            fetch('http://localhost:4000/admin/signup',{
              method: "POST",
              body: JSON.stringify({
                username: email,
                password: password,
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then((res)=>{return res.json()}).then((data)=>{
              console.log(data)
              localStorage.setItem("token", data.token)
              window.location="/"
            })
          }}
        >Signup</Button>
      </Card>
    </div>
  </div>
}

export default Signup