import { Typography, Card, Button } from "@mui/material"
import { useEffect, useState } from "react"

function Courses(){
  const [courses,setCourses] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/admin/courses",{
      method: "GET",
      headers:{
        "authorization" : "bearer " + localStorage.getItem("token")
      }
    }).then((res)=>res.json()).then((data)=>{
      setCourses(data.courses)
      data.courses.forEach(course => {
        console.log(course)
      });
      
    })
  },[])
  return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
    {courses.map(course=> <CourseDisplay course={course} />)}
  </div>
}

function CourseDisplay(props){
  return <Card style={{
    border: "2px solid black ",
    margin: 10,
    width: 300, 
    minHeight: 200, 
  }}>
      <Typography variant="h5" textAlign={"center"}>{props.course.title}</Typography>
      <Typography variant="subtitle1" textAlign={"center"}>{props.course.description}</Typography>
      <img src={props.course.imageLink} style={{
        width: 300
      }}></img>
  </Card>
}


export default Courses