const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')

app.use(express.json());

function authenticateUser(req,res,next){
  const {username, password} = req.headers
  fs.readFile('userProfile.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const userList = JSON.parse(data);
    const user = userList.find(a => a.username == username && a.password == password)
    if(user){
      req.user = user //updating req attribute 
      next()
    } else{
      res.status(403).json({'message' : 'User authentication failed'})
    }
  })
}

function authenticateAdmin(req,res,next){
  const {username, password} = req.headers
  fs.readFile('adminProfile.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const adminList = JSON.parse(data);
    const admin = adminList.find(a => a.username == username && a.password == password)
    if(admin){
      next()
    } else{
      res.status(403).json({'message' : 'Admin authentication failed'})
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
    const existingAdmin = adminProfile.find(a => a.username == req.body.username)
    if(existingAdmin){
      res.status(403).send("admin already exists")
    } else{
      adminProfile.push(newAdmin)
      fs.writeFile('adminProfile.json',JSON.stringify(adminProfile),(err)=>{
        if (err) throw err
        res.status(201).send("new admin added succesfully")
    })
    }
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
  const courseID = parseInt(req.params.courseId);
  fs.readFile('courses.json', 'utf-8', (err, data) => {
    if (err) throw err;
    var courseList = JSON.parse(data);
    const course = courseList.find(a => a.courseID === courseID);
    if (course) {
      Object.assign(course, req.body); //Object.assign copies values from req.body and updates them in course
      fs.writeFile('courses.json', JSON.stringify(courseList), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to update course' });
        } else {
          res.json({ message: 'Course updated successfully' });
        }
      });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
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
  const newUser ={...req.body, id: Math.floor(Math.random()*1000000), courses : []}
  //The spread syntax ... is used to copy all enumerable properties from the req.body object into the new user object
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

app.post('/users/login', authenticateUser, (req, res) => {
  res.send("logged in succesfully")
});

app.get('/users/courses', authenticateUser, (req, res) => {
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const courseList = JSON.parse(data)
    res.json({courses: courseList.filter(c => c.published)})
  })
});

app.post('/users/courses/:courseId',authenticateUser, (req, res) => {
  const courseID = parseInt(req.params.courseId)
  fs.readFile('userProfile.json', 'utf-8', (err,data)=>{
    if (err) throw err
    var userList = JSON.parse(data)
    fs.readFile('courses.json','utf-8', (err,data)=>{
      if (err) throw err
      const courseList = JSON.parse(data)
      const course = courseList.find(c => c.courseID == courseID && c.published)
      if(course){
        var user = userList.find(a => a.username == req.user.username)
        if(user){
          user.courses.push(course.courseID)
        } else {
          res.status(404).send("user not found")
        }
      } else{
        res.status(404).send("course not found")
      }
      fs.writeFile('userProfile.json',JSON.stringify(userList), (err)=>{
        if (err) throw err
        res.send("course purchased successfully")
      })
    })
  })
});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
  var username = req.headers.username
  fs.readFile('userProfile.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const userList = JSON.parse(data)
    fs.readFile('courses.json','utf-8',(err,data)=>{
      if (err) throw err
      const courseList = JSON.parse(data)
      var purchasedCourses = courseList.filter(c => req.user.courses.includes(c.courseID))
      console.log(purchasedCourses)
      res.json(purchasedCourses)
    })
  })
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});