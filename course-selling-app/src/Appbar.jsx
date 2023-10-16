import { Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"

function Appbar(){
  const [userEmail, setUserEmail] = useState(null);
  useEffect(()=>{
    fetch("http://localhost:4000/admin/me",{
      method: "GET",
      headers: {
        "authorization": "Bearer " + localStorage.getItem('token')
      }
    }).then((res)=>{return res.json()}).then((data)=>{
      console.log(data)
      if(data.username){
        setUserEmail(data.username)
      }
    })
  },[])

  if(userEmail){
    return <div style={{display:"flex", justifyContent:"space-between", padding:'10px'}}>
    <div>
      <Typography>Coursera</Typography>
    </div>
    <div>
      <span>{userEmail}</span>
      <Button onClick={()=>{
        localStorage.setItem("token", null)
        window.location='/'
      }}>Logout</Button>
    </div> 
  </div>
  }

  return <div style={{display:"flex", justifyContent:"space-between", padding:'10px'}}>
    <div>
      <Typography>Coursera</Typography>
    </div>
    <div>
      <Button onClick={()=>{
        window.location='/signup'
      }}>Signup</Button>
      <Button onClick={()=>{
        window.location='/signin'
      }}>Signin</Button>
    </div> 
  </div>
}

export default Appbar
