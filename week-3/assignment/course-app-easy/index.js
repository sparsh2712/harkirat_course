const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')

app.use(express.json());

function authenticateUser(username, password, adminList) {
  for (const user of adminList) {
    if (user.username === username && user.password === password) {
      return true; // User is authenticated
    }
  }
  return false; // User is not authenticated
}

function authenticateAdmin(req,res,next){
  var username = req.headers.username
  var password = req.headers.password
  fs.readFile('adminProfile.json', 'utf-8', (err, data) => {
    if (err) throw err;

    const adminList = JSON.parse(data);
    const authenticated = authenticateUser(username, password, adminList);

    if(authenticated){
      next()
    } else{
      res.status(404).send("invalid user")
    }
  })
}


app.post('/admin/signup', (req, res) => {
  const newAdmin = {
    id : Math.floor(Math.random()*1000000),
    username : req.body.username,
    password : req.body.password
  }
  fs.readFile('adminProfile.json','utf-8', (err,data)=>{
    if (err) throw err
    const adminProfile = JSON.parse(data)
    adminProfile.push(newAdmin)
    fs.writeFile('adminProfile.json',JSON.stringify(adminProfile),(err)=>{
      if (err) throw err
      res.status(201).send("new admin added succesfully")
    })
  })
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
  res.send("logged in succesfully")
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
  const newCourse = {
    title : req.body.title,
    description : req.body.description,
    price : req.body.price,
    imageLink : req.body.imageLink,
    published: false,
    courseID : Math.floor(Math.random()*100000)
  }
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const coursesList = JSON.parse(data)
    coursesList.push(newCourse)
    fs.writeFile('courses.json', JSON.stringify(coursesList),(err)=>{
      if (err) throw err
      res.status(201).send("course created successfully")
    })
  })
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  const userID = req.params.courseId
  console.log(userID)
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    var courseList = JSON.parse(data)
    var counter = 0
    for (course of courseList){
      if(userID == course.courseID){
        const updatedCourse = {
          title : req.body.title,
          description : req.body.description,
          price : req.body.price,
          imageLink : req.body.imageLink,
          published: false,
          courseID : userID
        }
        courseList[counter] = updatedCourse
        break
      }
      counter ++
    }
    fs.writeFile('courses.json', JSON.stringify(courseList),(err)=>{
      if (err) throw err
      res.status(201).send("updated successfully")
    })
    
  })
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const courseList = JSON.parse(data)
    res.json(courseList)
  })
});

// User routes
app.post('/users/signup', (req, res) => {
  const newUser = {
    id : Math.floor(Math.random()*1000000),
    username : req.body.username,
    password : req.body.password,
    courses : []
  }
  fs.readFile('userProfile.json','utf-8', (err,data)=>{
    if (err) throw err
    const userProfile = JSON.parse(data)
    userProfile.push(newUser)
    fs.writeFile('userProfile.json',JSON.stringify(userProfile),(err)=>{
      if (err) throw err
      res.status(201).send("new user added succesfully")
    })
  })
});

app.post('/users/login', (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  fs.readFile('userProfile.json', 'utf-8', (err, data) => {
    if (err) throw err;

    const adminList = JSON.parse(data);
    const authenticated = authenticateUser(username, password, adminList);

    if (authenticated) {
      res.status(200).send("Logged in successfully");
    } else {
      res.status(401).send("User not found or invalid credentials");
    }
  })
});

app.get('/users/courses', (req, res) => {
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const courseList = JSON.parse(data)
    res.json(courseList)
  })
});

app.post('/users/courses/:courseId', (req, res) => {
  const courseID = req.params.courseId
  const username = req.headers.username
  var purchasedCourse
  fs.readFile('userProfile.json', 'utf-8', (err,data)=>{
    if (err) throw err
    var userList = JSON.parse(data)
    fs.readFile('courses.json','utf-8', (err,data)=>{
      if (err) throw err
      const courseList = JSON.parse(data)
      for (course of courseList){
        if(course.courseID == courseID){
          purchasedCourse = course
        }
      }
      var counter = 0
      for (user of userList){
        if(username == user.username){
          userList[counter].courses.push(purchasedCourse)
          break
        }
      counter ++
      }
      fs.writeFile('userProfile.json',JSON.stringify(userList), (err)=>{
        if (err) throw err
        res.send("course purchased successfully")
      })
    })
  })
});

app.get('/users/purchasedCourses', (req, res) => {
  var username = req.headers.username
  fs.readFile('userProfile.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const userProfile = JSON.parse(data)
    let counter = 0
    for(user of userProfile){
      if (username == user.username){
        var purchasedCourses = userProfile[counter].courses
        res.json(purchasedCourses)
      }
      counter ++
    } 
  })
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});