import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { useState } from 'react';

function Addcourse(){
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageLink, setImageLink] = useState("")
  return <div>
    <div style={{display:"flex", justifyContent:'center'}}>
      <Card variant="outlined" sx={{width:'400px', padding:'20px'}}>
        <TextField 
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
              label="Title" 
              variant="outlined" 
              fullWidth={true}
        />
        <br /> <br/>
        <TextField 
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
              label="Description" 
              variant="outlined" 
              fullWidth={true}
        />
        <br /><br />
        <TextField 
              onChange={(e)=>{
                setPrice(e.target.value)
              }}
              label="Price" 
              variant="outlined" 
              fullWidth={true}
        />
        <br /><br />
        <TextField 
              onChange={(e)=>{
                setImageLink(e.target.value)
              }}
              label="ImageLink" 
              variant="outlined" 
              fullWidth={true}
        />
        <br /><br />
        <Button 
              variant="contained" 
              size='large'
              onClick={()=>{
                fetch('http://localhost:4000/admin/courses',{
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                published: true,
                imageLink: imageLink,
              }),
              headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + localStorage.getItem('token')
              }
            }).then((res)=>{return res.json()}).then((data)=>{
              console.log(data)
              
            })
              }}
            >Addcourse</Button>
      </Card>
    </div>
  </div>
}

export default Addcourse